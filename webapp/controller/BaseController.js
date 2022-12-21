sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageStrip",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, History, MessageStrip, MessageBox, Filter, Operator) {
	"use strict";

	return Controller.extend("crm.ssh_req_abr_ik.controller.BaseController", {
		// get router object
		getRouter() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		// handle back navigation
		onNavBack(oEvent) {
			var sPreviousHash = History.getInstance().getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
				history.go(-1);
			} else {
				this.getRouter().navTo("search", {}, true /*no history*/ );
			}
		},
		getModel(sName) {
			return this.getView().getModel(sName);
		},
		setModel(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		faturaTarihFormatter(value) {
			if (!value) {
				return null;
			} else {
				return new Date(value);
			}
		},
		_setHeaderPartnerBindings(binding, model, modelId) {
			const aPartnerFct = ["Z0006", "00000001"];
			let iIndex = -1;
			let sId = "";
			let bId = "";

			for (let fct of aPartnerFct) {
				switch (fct) {
				case 'Z0006': //son müşteri
					sId = 'customer';
					// sId = 'dealer';
					break;
				case '00000001': //bayi
					// sId = 'customer';
					sId = 'dealer';
					break;
				default:
					sId = "";
				}

				iIndex = model.getData().ToPartners.results.findIndex(partner => partner.PartnerFct === fct);
				// if (iIndex !== -1 && sId === "customer") {
				// 	// if (this.getView().byId("customerSum")) {
				// 	// 	this.getView().byId("customerSum").bindProperty(binding, {
				// 	// 		path: `/ToPartners/results/${iIndex.toString()}/DescriptionName`,
				// 	// 		model: modelId
				// 	// 	});
				// 	// }
				// 	// if (this.getView().byId("customerReview")) {
				// 	// 	this.getView().byId("customerReview").bindProperty("text", {
				// 	// 		path: `/ToPartners/results/${iIndex.toString()}/DescriptionName`,
				// 	// 		model: modelId
				// 	// 	});
				// 	// }

				// 	// if (this.getView().byId("customerTel")) {
				// 	// 	this.getView().byId("customerTel").bindProperty(binding, {
				// 	// 		path: `/ToPartners/results/${iIndex.toString()}/Telephone`,
				// 	// 		model: modelId
				// 	// 	});
				// 	// }
				// 	// if (this.getView().byId("customerTelReview")) {
				// 	// 	this.getView().byId("customerTelReview").bindProperty("text", {
				// 	// 		path: `/ToPartners/results/${iIndex.toString()}/Telephone`,
				// 	// 		model: modelId
				// 	// 	});
				// 	// }

				// 	// if (this.getView().byId("customerAddress")) {
				// 	// 	this.getView().byId("customerAddress").bindProperty("value", {
				// 	// 		path: `/ToPartners/results/${iIndex.toString()}/AddressShort`,
				// 	// 		model: modelId
				// 	// 	});
				// 	// }

				// 	// if (this.getView().byId("customerAddressRewiew")) {
				// 	// 	this.getView().byId("customerAddressRewiew").bindProperty(binding, {
				// 	// 		path: `/ToPartners/results/${iIndex.toString()}/AddressShort`,
				// 	// 		model: modelId
				// 	// 	});
				// 	// }

				// }
				if (iIndex !== -1 && sId === "dealer") {
					if (this.getView().byId("dealerTel")) {
						this.getView().byId("dealerTel").bindProperty(binding, {
							path: `/ToPartners/results/${iIndex.toString()}/Telephone`,
							model: modelId
						});
					}
					if (this.getView().byId("dealerAddress")) {
						this.getView().byId("dealerAddress").bindProperty("value", {
							path: `/ToPartners/results/${iIndex.toString()}/AddressShort`,
							model: modelId
						});
					}
					if (this.getView().byId("dealerCountry")) {
						this.getView().byId("dealerCountry").bindProperty("value", {
							path: `/ToPartners/results/${iIndex.toString()}/CountryText`,
							model: modelId
						});
					}

					if (this.getView().byId("dealerAddressRew")) {
						this.getView().byId("dealerAddressRew").bindProperty("value", {
							path: `/ToPartners/results/${iIndex.toString()}/AddressShort`,
							model: modelId
						});
					}
					if (this.getView().byId("dealerRew")) {
						this.getView().byId("dealerRew").bindProperty("text", {
							path: `/ToPartners/results/${iIndex.toString()}/DescriptionName`,
							model: modelId
						});
					}
					if (this.getView().byId("dealerCountryRew")) {
						this.getView().byId("dealerCountryRew").bindProperty("value", {
							path: `/ToPartners/results/${iIndex.toString()}/CountryText`,
							model: modelId
						});
					}
				}
				if (iIndex !== -1) {
					if (this.getView().byId(sId)) {
						this.getView().byId(sId).bindProperty(binding, {
							path: `/ToPartners/results/${iIndex.toString()}/DescriptionName`,
							model: modelId
						});
					}
				}
			}
		},
		xfeldToBool(val) {
			return val == "X"
		},
		acIndFormatter(val) {
			return val == "02";
		},
		farkliUrunFormatter(val) {
			return val == "X";
		},
		currencyValue: function (sValue) {
			if (!sValue) {
				return 0.00;
			}

			return parseFloat(parseFloat(sValue).toFixed(2));
		},
		_setTexts(binding, model, modelId) {
			const aTypeArr = ["Z001", "Z007"];
			// const tdid = "Z001";
			let iIndex = -1;
			let sId = "";

			for (let tdid of aTypeArr) {
				switch (tdid) {
				case "Z007":
					sId = "custNote";
					break;
				case "Z700":
					sId = "errorNote";
					break;
				}

				iIndex = model.getData().ToTexts.results.findIndex(text => text.Tdid === tdid);
				if (iIndex !== -1 && this.getView().byId(sId)) {
					this.getView().byId(sId).bindProperty(binding, {
						path: `/ToTexts/results/${iIndex.toString()}/ConcLines`,
						model: modelId
					});

					if (sId == "errorNote") {
						if (this.getView().byId("errorNoteRew")) {
							this.getView().byId("errorNoteRew").bindProperty(binding, {
								path: `/ToTexts/results/${iIndex.toString()}/ConcLines`,
								model: modelId
							});
						}
					}

				}

			}
		},
		_setCategoryBindings(binding, model, modelId) {
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
				iIndex = model.getData().ToCategory.results.findIndex(category => category.Level === sId.Level);
				if (iIndex !== -1 && this.getView().byId(sId.Id)) {
					if (binding == "text") {
						this.getView().byId(sId.Id).bindProperty(binding, {
							path: `/ToCategory/results/${iIndex.toString()}/Value`,
							model: modelId
						});
					} else {
						this.getView().byId(sId.Id).bindProperty(binding, {
							path: `/ToCategory/results/${iIndex.toString()}/Key`,
							model: modelId
						});
					}
				}
			}
		},
		setInitialFilters(selectedCategories, editOrCreate) {
			var oView = this.getView();
			var aFilters = [];

			if (editOrCreate == "create") {
				return;
			}

			oView.byId("soeCB1").getBinding("items").filter(new Filter("Guid", Operator.EQ, this._guid));

			aFilters = [new Filter("Guid", Operator.EQ, this._guid)];
			if (selectedCategories.cat1) {
				aFilters.push(new Filter("Key", Operator.EQ, selectedCategories.cat1));
			}
			oView.byId("soeCB2").getBinding("items").filter(aFilters);

			aFilters = [new Filter("Guid", Operator.EQ, this._guid)];
			if (selectedCategories.cat2) {
				aFilters.push(new Filter("Key", Operator.EQ, selectedCategories.cat2));
			}
			oView.byId("soeCB3").getBinding("items").filter(aFilters);

			aFilters = [new Filter("Guid", Operator.EQ, this._guid)];
			if (selectedCategories.cat3) {
				aFilters.push(new Filter("Key", Operator.EQ, selectedCategories.cat3));
			}
			oView.byId("soeCB4").getBinding("items").filter(aFilters);

			aFilters = [new Filter("Guid", Operator.EQ, this._guid)];
			if (selectedCategories.cat4) {
				aFilters.push(new Filter("Key", Operator.EQ, selectedCategories.cat4));
			}
			oView.byId("soeCB5").getBinding("items").filter(aFilters);

		},
		getScreenAuth(CreateOrUpdate, guid) {
			var messageHandler = this.getOwnerComponent().MessageHandler;
			var that = this;
			messageHandler.removeServiceMessages();
			this.getModel("userModel").read(
				'/GetFieldvisibilitySet', {
					filters: [new Filter("CreateOrUpdate", Operator.EQ, CreateOrUpdate), new Filter("ProcessType", Operator.EQ, "ZC09"), new Filter(
						"Guid",
						Operator.EQ, guid)],
					success: data => {
						var namedArray = [];
						data.results.forEach(element => {
							namedArray[element.FieldName] = element;
						});
						var visibleModel = new JSONModel(namedArray);
						that.getView().setModel(visibleModel, "visibleModel");
						that.setScreenAuth(data);
					},
					error: response => {
						messageHandler.showServiceMessagePromise().then(function () {});
					}
				});
		},
		setScreenAuth(data) {
			for (let item of data.results) {
				if (item.TabName == "itemsTab") {
					if (item.FieldName) {
						viewModelData[item.FieldName + "visible"] = item.Visibility;
						viewModelData[item.FieldName + "enable"] = item.Enable;
					}

				} else if (item.FieldName) {
					if (this.getView().byId(item.FieldName)) {
						this.getView().byId(item.FieldName).setVisible(item.Visibility);

						var inputName = "";
						if (item.FieldName == "customerNameFE") {
							inputName = "customer";
						} else {
							var inputName = item.FieldName.substring(0, item.FieldName.length - 2);
						}
						this.getView().byId(inputName).setEnabled(item.Enable);

					}
				} else if (item.TabName) {
					if (this.getView().byId(item.TabName)) {
						this.getView().byId(item.TabName).setVisible(item.Visibility);
					}
				}

			}
		},
		clearSession(guid, source, edit) {
			var that = this;
			var messageHandler = this.getOwnerComponent().MessageHandler;
			var oModel = this.getView().getModel();
			var sPath = oModel.createKey("/LockSet", {
				Guid: guid,
				Edit: edit
			});
			return new Promise(function (resolve, reject) {
				that.getView().setBusy(true);
				messageHandler.removeServiceMessages();
				oModel.remove(sPath, {
					success: function () {
						// messageHandler.showServiceMessagePromise().then(function () {
						resolve();
						// });
					},
					error: function () {
						if (source == "cancel") {
							reject();
						} else {
							messageHandler.showServiceMessagePromise().then(function () {
								reject();
							});
						}
						// reject()
					}
				});

			});

		},
		_generateHistoryContextMenu(array) {
			var contextMenu = this.getView().byId("historyContextMenu");
			var historyTable = this.getView().byId("idHistoryTable");
			let unique = [...new Set(array.map(item => item.Indtext))];

			for (var text of unique) {
				contextMenu.addItem(new sap.ui.unified.MenuItem({
					text: text,
					select: function (oEvent) {
						var selected = oEvent.getSource().getText();
						historyTable.filter(historyTable.getColumns()[0], selected);
					}
				}));
			}
		},
		handleHistoryClearFilter(oEvent) {
			var historyTable = this.getView().byId("idHistoryTable");

			historyTable.filter(historyTable.getColumns()[0], "");
		},
		onHistoryOperationSort: function (oEvent, sortOrder) {
			var historyTable = this.getView().byId("idHistoryTable");
			var aSortOrder;
			(sortOrder === "asc") ? aSortOrder = sap.ui.table.SortOrder.Ascending: aSortOrder = sap.ui.table.SortOrder.Descending;

			historyTable.sort(historyTable.getColumns()[0], aSortOrder);
		},
		_setHeaderDates(binding, model, modelId) {
			// const apptType = "ZRVO01";
			const apptType = ["ZRVO31"];
			// const apptType = "SRV_CUST_BEG";
			let iIndex = -1;
			let sId = "";

			for (let appt of apptType) {
				switch (appt) {
				case "ZRVO31":
					sId = "custInvDate";
					break;
				}
				if (!model.getData().ToDates.results) {
					return;
				}
				iIndex = model.getData().ToDates.results.findIndex(date => date.ApptType === appt);
				if (iIndex !== -1) {
					var bindParams;
					if (binding == "dateValue") {
						bindParams = {
							path: `/ToDates/results/${iIndex.toString()}/TimestampFrom`,
							// type: new sap.ui.model.type.DateTime({
							// 	oFormatOptions: {
							// 		UTC: true
							// 	}
							// }),
							model: modelId
						};
					} else {
						bindParams = {
							path: `/ToDates/results/${iIndex.toString()}/TimestampFrom`,
							type: new sap.ui.model.type.Date({
								oFormatOptions: {
									UTC: true,
									pattern: "dd.MM.yyyy"
								}
							}),
							model: modelId
						};

					}
					this.getView().byId(sId).bindProperty(binding, bindParams);
					if (sId == "custInvDate") {
						if (this.getView().byId("custInvDateRew")) {
							this.getView().byId("custInvDateRew").bindProperty(binding, bindParams);
						}
					}
				}

			}
		},
		getGroup: function (oContext) {
			return oContext.getProperty('AttachTypeTxt');
		},
		getGroupHeader: function (oGroup) {
			return new sap.m.GroupHeaderListItem({
				title: oGroup.key
			})
		}
	});
});