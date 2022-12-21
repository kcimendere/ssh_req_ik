sap.ui.define([
	"crm/ssh_req_abr_ik/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"crm/ssh_req_abr_ik/Util/flitbit"
], function (BaseController, JSONModel, Filter, Operator, Flitbit) {
	"use strict";

	return BaseController.extend("crm.ssh_req_abr_ik.controller.ObjectEdit", {
		onInit: function () {
			this.getRouter().getRoute("objectEdit").attachPatternMatched(this._onRouteHit.bind(this));
			this.getView().setModel(new JSONModel(), "edit");
		},
		_onRouteHit: function (oEvent) {
			// get navigation parameters
			const oArgs = oEvent.getParameter("arguments");
			const oQuery = oArgs["?query"];
			var fromCopy = false;
			this._guid = oArgs.guid;

			if (oQuery && oQuery.copy) {
				fromCopy = oQuery.copy;
			}

			// save header guid to a local variable
			this._guid = oArgs.guid;
			if (oArgs.guid && !fromCopy) {

				this.clearSession(oArgs.guid, "edit", "X").then(function (data) {}, function (response) {
					that.getRouter().navTo("objectDetail", {
						guid: that._guid
					});
				});
				this._getData();
			}
		},
		_getData(){
			this.getModel().metadataLoaded().then(() => {
				const sObjectPath = this.getModel().createKey("HeaderSet", {
					Guid: this._guid
				});
				this.getView().setBusy(true);
				this.getModel().read('/' + sObjectPath, {
					urlParameters: {
						"$expand": "ToItems,ToDates,ToCustomerh,Tostatus,ToDocFlow,ToPartners,ToTexts,ToChangeHistory,ToAttachments,ToAttachments01,ToAttachments02,ToAttachments03,ToAttachments04,ToAttachments05,ToPricing,ToCumulate,ToRefObj,ToAditionalFields,ToServiceItems,ToSpItems,ToTotalValues,ToCategory,ToProductInfo,ToHeaderStatusReason,ToSearchHelpOrderStatus"
					},
					success: data => {
						$.proxy(this.dataReceived(data), this);
						this.getScreenAuth("U", this._guid);
						this.getView().setBusy(false);
					},
					error: response => {
						this.getView().setBusy(false);
						$.proxy(this.requestFailed(response), this)
					}
				})
			});
		},
		dataReceived: function (data) {
			this._guid = data.Guid;
			this._editModel = this.getModel("edit");
			this._cloneDetailData = jQuery.extend(true, {}, data);
			this.getModel("edit").refresh();
			var selectedCategories = {
				"cat1": "",
				"cat2": "",
				"cat3": "",
				"cat4": "",
				"cat5": ""
			}
			var aCategories = [];
			if (data.ToCategory && data.ToCategory.results && data.ToCategory.results.length > 0) {
				aCategories = data.ToCategory.results;
			}

			var idArr = [{
				"Id": "soeCB1",
				"Level": 1
			}, {
				"Id": "soeCB2",
				"Level": 2
			}, {
				"Id": "soeCB3",
				"Level": 3
			}, {
				"Id": "soeCB4",
				"Level": 4
			}, {
				"Id": "soeCB5",
				"Level": 5
			}];
			for (let sId of idArr) {
				let iIndex = -1;
				iIndex = aCategories.findIndex(category => category.Level === sId.Level);
				if (iIndex == -1) {
					aCategories.push({
						"Level": sId.Level
					})

				} else {
					selectedCategories["cat" + sId.Level] = aCategories[iIndex].Key;
				}
			}
			data.ToCategory.results = aCategories;
			this.getModel("edit").setData(data);
			this.getModel("edit").refresh();
			this._setHeaderPartnerBindings("text", this._editModel, "edit");
			this._setCategoryBindings("selectedKey", this._editModel, "edit");
			this._setHeaderDates("dateValue", this._editModel, "edit");
			this._generateHistoryContextMenu(data.ToChangeHistory.results);
			this.setInitialFilters(selectedCategories, "edit");
			if (data.ToTexts && data.ToTexts.results) {
				this._setTexts("value", this._editModel, "edit");
			}
		},
		handleCopyDoc(oEvent) {
			var that = this;
			this.sendRequest({
				"Guid": this._guid
			}).then(function (data) {
				if (data.Guid) {
					that.getRouter().navTo("objectEdit", {
						guid: data.Guid,
						"?query": {
							"copy": true
						}
					});
				}
			}, function (response) {

			});
		},
		sendRequest(requestPayload) {
			var that = this;
			var messageHandler = this.getOwnerComponent().MessageHandler;
			return new Promise(function (resolve, reject) {
				that.getView().setBusy(true);
				messageHandler.removeServiceMessages();
				that.getModel().create(
					'/HeaderSet',
					requestPayload, {
						success: data => {
							that.getView().setBusy(false);
							resolve(data);
						},
						error: response => {
							messageHandler.showServiceMessagePromise().then(function () {
								that.getView().setBusy(false);
								reject(response);
							});
						}
					});

			});
		},
		handleCustInvoiceDateChanged(oEvent) {
			var model = this.getView().getModel("edit");
			var aToDates = model.getData().ToDates.results ? model.getData().ToDates.results : [];
			var iIndex = aToDates.findIndex(date => date.ApptType === "ZRVO31");
			if (iIndex != -1) {
				aToDates[iIndex] = {
					"ApptType": "ZRVO31",
					"TimestampFrom": this.getView().byId("custInvDate").getDateValue()
				}
			} else {
				aToDates.push({
					"ApptType": "ZRVO31",
					"TimestampFrom": this.getView().byId("custInvDate").getDateValue()
				});
			}
			model.setProperty("/ToDates/results", aToDates);
			model.refresh();
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {
			}, function (response) {});
		},
		sendRequest(requestPayload) {
			var that = this;
			var messageHandler = this.getOwnerComponent().MessageHandler;
			return new Promise(function (resolve, reject) {
				that.getView().setBusy(true);
				messageHandler.removeServiceMessages();
				that.getModel().create(
					'/HeaderSet',
					requestPayload, {
						success: data => {
							that.getView().setBusy(false);
							resolve(data);
							// messageHandler.showServiceMessagePromise().then(function () {});
						},
						error: response => {
							messageHandler.showServiceMessagePromise().then(function () {
								that.getView().setBusy(false);
								reject(response);
							});
						}
					});

			});
		},
		generatePayload() {
			var model = this.getView().getModel("edit");
			var requestPayload = {};
			var diffs = DeepDiff.diff(this._cloneDetailData,
				model.getData());
				delete model.getData().ToCustomerh.__metadata;
				delete model.getData().ToRefObj.__metadata;
			requestPayload = {
				"Guid": this._guid,
				"ToRefObj": model.getProperty("/ToRefObj"),
				// {
				// 	"ProductId": model.getProperty("/ToRefObj/ProductId"),
				// 	"Quantity": model.getProperty("/ToRefObj/Quantity"),
				// 	"TextObject": model.getProperty("/ToRefObj/TextObject")
				// },
				"ToCustomerh": model.getProperty("/ToCustomerh"),
				// {
				// 	"Zz1FaturaNoSrh": model.getProperty("/ToCustomerh/Zz1FaturaNoSrh"),
				// 	"Zz1FaturaTarihSrh": model.getProperty("/ToCustomerh/Zz1FaturaTarihSrh"),
				// 	"Zz1SatisNoktasiSrh": model.getProperty("/ToCustomerh/Zz1SatisNoktasiSrh"),
				// 	"Zz1HKaynagiSdSrh": model.getProperty("/ToCustomerh/Zz1HKaynagiSdSrh"),
				// 	"Zz1HKaynagiSdSrhTxt": model.getProperty("/ToCustomerh/Zz1HKaynagiSdSrhTxt"),
				// 	"Zz1EvteksUrunDrmSrh": model.getProperty("/ToCustomerh/Zz1EvteksUrunDrmSrh"),
				// 	"Zz1MusteriAdsoyadSrh": model.getProperty("/ToCustomerh/Zz1MusteriAdsoyadSrh"),
				// 	"Zz1MusteriAdresSrh": model.getProperty("/ToCustomerh/Zz1MusteriAdresSrh"),
				// 	"Zz1UrunSahibiSrh": model.getProperty("/ToCustomerh/Zz1UrunSahibiSrh"),
				// 	"Zz1UrunSahibiSrhTxt": "",
				// 	"Zz1HataliParcaAdiSrh": model.getProperty("/ToCustomerh/Zz1HataliParcaAdiSrh"),
				// 	"Zz1MiktarSrh": model.getProperty("/ToCustomerh/Zz1MiktarSrh"),
				// 	"Zz1KullanimDurumSrh": model.getProperty("/ToCustomerh/Zz1KullanimDurumSrh"),
				// 	"Zz1KullanimDurumSrhTxt": "",
				// 	"Zz1BayiTalepSrh": model.getProperty("/ToCustomerh/Zz1BayiTalepSrh"),
				// 	"Zz1BayiTalepSrhTxt":"",
				// },
				"ToPartners": model.getProperty("/ToPartners/results"),
				"ToTexts": model.getProperty("/ToTexts/results"),
				"ToDates": model.getProperty("/ToDates/results"),
				"ToCategory": model.getProperty("/ToCategory/results"),
				"ToItems": model.getProperty("/ToItems/results"),
				"ToServiceItems": model.getProperty("/ToServiceItems/results"),
				"ToSpItems": model.getProperty("/ToSpItems/results"),
				"Todiff": []
			};
			if (diffs && diffs.length > 0) {
				const splitAt = (index, xs) => [xs.slice(0, index), xs.slice(index)]
				for (let diff of diffs) {
					// var jsonModelPath = diff.path.join("/"); 
					// diff Part
					if (diff.path[0] == "ToSpItems" || diff.path[0] == "ToServiceItems") {
						var objectPath = diff.path.join("/");
						var lastIndex = objectPath.lastIndexOf("/");
						var pathArr = splitAt(lastIndex, objectPath);
						objectPath = "/" + pathArr[0];
						var rowData = model.getProperty(objectPath);
						var index = model.getData().ToItems.results.findIndex(item => item.Guid === rowData.Guid);
						if (index != -1) {
							model.setProperty("/ToItems/results/" + index + pathArr[1], diff.rhs);
							requestPayload.Todiff.push({
								Kind: diff.kind,
								Path: "/ToItems/" + rowData.Guid + pathArr[1]
							});
						}
						console.log(diff.path[0]);
					} else {
						var newPaths = diff.path.filter(function (el) {
							return el != "results"
						});
						requestPayload.Todiff.push({
							Kind: diff.kind,
							Path: "/" + newPaths.join('/')
						});
					}

				}
			}
			return requestPayload;
		},
		handleFindOrderPress() {
			var aFilters = [];

			var partnerNo = this.getPartnerNo();
			if (this._orderDialog) {
				this.getView().removeDependent(this._orderDialog);
				this._orderDialog.destroy();
			}
			this._orderDialog = sap.ui.xmlfragment(this.getView().getId(), "crm.ssh_req_abr_ik.fragments.orderSearch", this);
			this.getView().addDependent(this._orderDialog);
			this._orderDialog.open();

			aFilters.push(new Filter("Partner", Operator.EQ, partnerNo));
			this._orderDialog.getContent()[0].getBinding("items").filter(aFilters);
			// this.handleProductSearch();
		},
		handleOrderCancel() {
			this._orderDialog.close();
			this._orderDialog.destroy();
		},
		handleOrderListItemPress(oEvent) {
			var that = this;
			var selectedOrder = oEvent.getSource().getBindingContext().getObject();
			var createModel = this.getView().getModel("edit");
			this.getView().getModel("edit").setProperty("/ToCustomerh/Zz1FaturaNoSrh", selectedOrder.BillNo);
			this.getView().getModel("edit").setProperty("/ToCustomerh/Zz1FaturaTarihSrh", selectedOrder.BillDate);
			this.getView().getModel("edit").setProperty("/ToCustomerh/Zz1SatisNoktasiSrhTxt", selectedOrder.SalesPointTxt);
			this.getView().getModel("edit").setProperty("/ToCustomerh/Zz1SatisNoktasiSrh", selectedOrder.SalesPoint);
			this.getView().getModel("edit").setProperty("/ToRefObj/ProductId", selectedOrder.ProductId);
			this.getView().getModel("edit").setProperty("/ToRefObj/TextObject", selectedOrder.ProductName);
			this.getView().getModel("edit").refresh();
			// this.setOrderFieldsEnablement(false);
			// this.handleGeneralStepValidation();
			this._orderDialog.close();
			this._orderDialog.destroy();

			//onurb 14.11.2022
			//sending request for getting Category1 data
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {
				that.dataReceived(data);
			}, function (response) {});

		},
		getPartnerNo() {
			var editModel = this.getView().getModel("edit");
			var partners = editModel.getProperty("/ToPartners/results");
			var patrner = partners.filter(function (el) {
				return el.PartnerFct == "00000001";
			});
			return patrner[0].PartnerNo;
		},
		handleProdStatSelect(oEvent) {
			var that = this;
			var val = oEvent.getSource().getSelectedItem().getKey();
			var oModel = this.getView().getModel("edit");
			oModel.setProperty("/ToCustomerh/Zz1KullanimDurumSrh", val);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {
				that.handleGeneralStepValidation();
			}, function (response) {});
		},
		handleOwnerChange(oEvent) {
			var that = this;
			var ownerKey = oEvent.getSource().getSelectedKey();
			var customerAdd = this.getView().byId("customerAddress");
			var custName = this.getView().byId("custName");
			var oModel = this.getView().getModel("edit");
			oModel.setProperty("/ToCustomerh/Zz1UrunSahibiSrh", ownerKey);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {
				that.handleCustomerStepValidation();
			}, function (response) {});
		},
		handleCustReqSelect(oEvent){
			var that = this;
			var val = oEvent.getSource().getSelectedItem().getKey();
			var oModel = this.getView().getModel("edit");
			oModel.setProperty("/ToCustomerh/Zz1BayiTalepSrh", val);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {
				that.handleGeneralStepValidation();
			}, function (response) {});
		},
		handleInvoiceDateChanged(oEvent) {
			var oModel = this.getView().getModel("edit");
			oModel.setProperty("/ToCustomerh/Zz1FaturaTarihSrh", new Date(oEvent.getSource().getDateValue().setHours(12)));
		},
		handlePaymentStatChange(oEvent){
			var state = oEvent.getParameter("state") ? "04" : "05";
			var oModel = this.getView().getModel("edit");
			oModel.setProperty("/ToPricing/AcIndicator", state);

			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		handleFarkliUrunSelect(oEvent){
			var selected = oEvent.getParameter("selected") ? "X" : " s";
			var oModel = this.getView().getModel("edit");
			oModel.setProperty("/ToCustomerh/Zz1FarkliUrunSrh", selected);

			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		handleSOECB1Select(oEvent) {
			var oView = this.getView();
			this.getView().getModel("edit").setProperty("/ToCategory/results/0/Key", oEvent.getSource().getSelectedKey());
			this.getView().getModel("edit").setProperty("/ToCategory/results/0/Level", parseInt("01"));
			oView.byId("soeCB2").getBinding("items").filter([new Filter("Key", Operator.EQ, oEvent.getSource().getSelectedKey()), new Filter(
				"Guid", Operator.EQ, this._guid)]);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		handleSOECB2Select(oEvent) {
			var oView = this.getView();
			oView.byId("soeCB3").getBinding("items").filter([new Filter("Key", Operator.EQ, oEvent.getSource().getSelectedKey()), new Filter(
				"Guid", Operator.EQ, this._guid)]);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		handleSOECB3Select(oEvent) {
			var oView = this.getView();
			oView.byId("soeCB4").getBinding("items").filter([new Filter("Key", Operator.EQ, oEvent.getSource().getSelectedKey()), new Filter(
				"Guid", Operator.EQ, this._guid)]);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		handleSOECB4Select(oEvent) {
			var oView = this.getView();
			oView.byId("soeCB5").getBinding("items").filter([new Filter("Key", Operator.EQ, oEvent.getSource().getSelectedKey()), new Filter(
				"Guid", Operator.EQ, this._guid)]);
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		handleSOECB5Select(oEvent) {
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
			// oView.byId("soeCB2").getBinding("items")
		},
		handleSourceOfErrorSelect(oEvent) {
			var requestPayload = this.generatePayload();
			this.sendRequest(requestPayload).then(function (data) {}, function (response) {});
		},
		onCancelEdit(oEvent) {
			var that = this;
			var messageHandler = this.getOwnerComponent().MessageHandler;
			var model = this.getView().getModel("edit");
			var data = jQuery.extend(true, {}, this._cloneDetailData);
			messageHandler.showPopupToConfirm("Yaptığınız değişiklikler kaybolacak, emin misiniz ?",
				"İptal", "SUCCESS").then(function () {
				that.clearSession(that._guid, "cancel", " ").then(function (data) {
					model.setData(data);
					model.refresh();
					that.getRouter().navTo("objectDetail", {
						guid: that._guid
					});
				}, function (response) {});
			}, function () {});
		},
		onSave() {
			var that = this;
			var requestPayload = this.generatePayload();
			requestPayload.Save = "X";
			/*var requestPayload = {
				"Guid": this._guid,
				"Save": "X",
				"Todiff": []
			};;*/
			var messageHandler = this.getOwnerComponent().MessageHandler;
			messageHandler.showPopupToConfirm("Kaydetmek istediğinizden emin misiniz?",
				"Kaydet", "SUCCESS").then(function () {
				that.sendRequest(requestPayload).then(function (data) {
					if (data.ObjectId) {
						that.getRouter().navTo("objectDetail", {
							guid: data.Guid
						});
						return;
					}
				}, function (response) {});
			}, function () {

			});
		},
		handleYedekParEkle() {
			if (this._sparePartDialog) {
				this.getView().removeDependent(this._sparePartDialog);
				this._sparePartDialog.destroy();
			}
			this._sparePartDialog = sap.ui.xmlfragment(this.getView().getId(), "crm.ssh_req_abr_ik.fragments.productSuggestion", this);
			this.getView().addDependent(this._sparePartDialog);
			var sProductId = this.getView().getModel("edit").getProperty("/ToRefObj/ProductId");
			var aFilters = [];
			aFilters.push(new Filter("ProductId", Operator.EQ, sProductId));
			this._sparePartDialog.getContent()[0].getBinding("items").filter(aFilters);
			this._sparePartDialog.open();
		},
		handleSparePartListItemPress(oEvent) {
			oEvent.getSource().setSelected(!oEvent.getSource().getSelected());
		},
		handleSparePartCancel() {
			this._sparePartDialog.close();
		},
		handleSparePartSelect() {
			var that = this;
			var selectedItems = this._sparePartDialog.getContent()[0].getSelectedItems();
			// var requestPayload = {
			// 	"Guid": that._guid,
			// 	"ToItems": [],
			// 	"Todiff": [],
			// };
			var requestPayload = this.generatePayload();
			for (let [index, item] of selectedItems.entries()) {
				var newItem = {
					"OrderedProd": item.getBindingContext("productModel").getObject().ObjectId,
					// "Quantity": item.getBindingContext("productModel").getObject().Quantity.trim()
					"Quantity": "1"
				};
				requestPayload.ToItems.push(newItem);
				// requestPayload.Todiff.push({
				// 	"Kind": "C",
				// 	"Path": `/ToItems/${index.toString()}/OrderedProd`
				// });
				// requestPayload.Todiff.push({
				// 	"Kind": "C",
				// 	"Path": `/ToItems/${index.toString()}/Quantity`
				// });

			}
			this.sendRequest(requestPayload).then(function (data) {
				// that.handleCustomerStepValidation();
				that.dataReceived(data);
			}, function (response) {
				// that.handleCustomerStepValidation();

			});
			this._sparePartDialog.close();
		},
		onShowProductLaborValueHelp() {

			if (this._oProductLaborDialog) {
				this.getView().removeDependent(this._oProductLaborDialog);
				this._oProductLaborDialog.destroy();
			}

			this._oProductLaborDialog = sap.ui.xmlfragment(this.getView().getId(), "crm.ssh_req_abr_ik.fragments.productSuggestLabor", this);
			this.getView().addDependent(this._oProductLaborDialog);
			this._oProductLaborDialog.setModel(this.getOwnerComponent().getModel("productModel"), "productModel");

			this._oProductLaborDialog.open();
			this.handleProductLaborSearch();
		},
		handleProductLaborSearch() {
			let sQuery = "",
				aFilters = [];

			sQuery = this.getView().byId("idSearchProdFbControl1").getValue(); //oItems[0].getControl().getValue();
			if (sQuery) aFilters.push(new Filter("ProductId", Operator.Contains, sQuery));

			sQuery = this.getView().byId("idSearchProdFbControl2").getValue(); //oItems[1].getControl().getValue();
			if (sQuery) aFilters.push(new Filter("Description", Operator.Contains, sQuery));

			// sQuery = this.getView().byId("idSearchProdFbControl3").getValue(); //oItems[2].getControl().getValue();
			// if (sQuery) aFilters.push(new Filter("MaterialType", Operator.EQ, sQuery));

			sQuery = this.getView().byId("idSearchProdFbControl4").getValue();
			if (sQuery) aFilters.push(new Filter("Bismt", Operator.EQ, sQuery));

			if (this.getView().byId("idSearchProdFbControl3").getSelectedItems().length) {
				for (let item of this.getView().byId("idSearchProdFbControl3").getSelectedItems())
					aFilters.push(new Filter("MaterialType", Operator.EQ, item.getKey()));
			}

			// sQuery = this.getView().byId("idSearchProdFbControl5").getValue();
			// if (sQuery) aFilters.push(new Filter("ProductType", Operator.EQ, sQuery));

			sQuery = this.getView().byId("prodMaxRows").getValue();
			aFilters.push(new Filter("MaxRows", Operator.EQ, sQuery));

			this._oProductLaborDialog.getContent()[1].getBinding("items").filter(aFilters);
		},
		handleProductLaborSelect: function () {
			var that = this;
			var selectedItems = this._oProductLaborDialog.getContent()[1].getSelectedItems();
			// var requestPayload = {
			// 	"Guid": that._guid,
			// 	"ToItems": [],
			// 	"Todiff": [],
			// };
			var requestPayload = this.generatePayload();
			for (let [index, item] of selectedItems.entries()) {
				var newItem = {
					"OrderedProd": item.getBindingContext("productModel").getObject().ProductId,
					"Quantity": "0"
				};
				requestPayload.ToItems.push(newItem);
				// requestPayload.Todiff.push({
				// 	"Kind": "C",
				// 	"Path": `/ToItems/${index.toString()}/OrderedProd`
				// });
				// requestPayload.Todiff.push({
				// 	"Kind": "C",
				// 	"Path": `/ToItems/${index.toString()}/Quantity`
				// });

			}
			this.sendRequest(requestPayload).then(function (data) {
				// that.handleCustomerStepValidation();
				// that.dataReceived(data);
			}, function (response) {
				// that.handleCustomerStepValidation();

			});
			this._oProductLaborDialog.close();
			this._oProductLaborDialog.destroy();
		},
		handleProductLaborListItemPress: function (oEvent) {
			oEvent.getSource().setSelected(oEvent.getSource().getSelected() ? false : true);
		},
		handleProductLaborCancel: function () {
			this._oProductLaborDialog.close();
			this._oProductLaborDialog.destroy();
		},
		handleChangeUploadSelect: function(oEvent) {
			var visibleData = this.getView().getModel("visibleModel").getData();
			var selectedItem = oEvent.getParameter("selectedItem").getBindingContext("valueHelp").getObject();
			
			var iIndex = visibleData.findIndex(data => data === "uploadAttach" + selectedItem.Key);
			if(visibleData["uploadAttach" + selectedItem.Key]) {
				if(!visibleData["uploadAttach" + selectedItem.Key].Enable) {
					sap.m.MessageToast.show("Bu ek türünü yükleme yetkiniz yok!");
					oEvent.getSource().setSelectedKey("");
				} 
			}
		},
		onUploadCompleted: function (oEvent) {
			oEvent.getSource().setValue("");

			this._getData();

			//this._refreshAttachments(oEvent.getSource());
		},
		handleAttachmentItemPress(oEvent) {
			var that = this;
			var objectToRemove = oEvent.getParameter("listItem").getBindingContext("edit").getObject();
			var oModel = this.getOwnerComponent().getModel();
			var sPath = oModel.createKey("/AttachmentsSet", {
				"HeaderGuid": objectToRemove.HeaderGuid,
				"PhioClass": objectToRemove.PhioClass,
				"PhioObjid": objectToRemove.PhioObjid
			});
			this.getView().setBusy(true);
			oModel.remove(sPath, {
				success: function () {
					that._getData();
					that.getView().setBusy(false);
				},
				error: function () {}
			});

		},
		handleUploadAttachment(oFileUploader, code) {
			oFileUploader = this.getView().byId("fileUploader");
			code = this.getView().byId("idUploadSelect").getSelectedKey(); 
			if(!code) {
				sap.m.MessageToast.show("Ek türü seçmelisiniz!");
				return;
			}
			var oModel = this.getView().getModel();
			oFileUploader.removeAllHeaderParameters();
			oModel.refreshSecurityToken();
			const oHeaders = oModel.oHeaders;
			const sToken = oHeaders['x-csrf-token'];
			var slug = code + "/" + encodeURIComponent(oFileUploader.getValue());
			oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "x-csrf-token",
				value: sToken
			}));
			oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				name: "SLUG",
				value: slug
			}));
			oFileUploader.setSendXHR(true);
			oFileUploader.upload();
		},
		setAttchUploadURLs() {
			var oModel = this.getView().getModel();
			var sPath = oModel.createKey("/HeaderSet", {
				"Guid": this._guid
			});
			sPath = "/sap/opu/odata/sap/ZCM_SERVICEORDER_SRV" + sPath + "/ToAttachments";
			this.getView().byId("fileUploader").setUploadUrl(sPath);
			// this.getView().byId("fileUploader1").setUploadUrl(sPath);
			// this.getView().byId("fileUploader2").setUploadUrl(sPath);
			// this.getView().byId("fileUploader3").setUploadUrl(sPath);
			// this.getView().byId("UploadSet").addHeaderParameter(new sap.m.UploadCollectionParameter({
			// 	name: "x-csrf-token",
			// 	value: sToken
			// }));
		},
		clearUploadFields() {
			this.getView().byId("fileUploader").setValue();
			// this.getView().byId("fileUploader1").setValue();
			// this.getView().byId("fileUploader2").setValue();
			// this.getView().byId("fileUploader3").setValue();
		},
		onAfterRendering() {
			this.setAttchUploadURLs();
			this.clearUploadFields();
		}        
	});
});