sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createModelData: function () {
			var oData = {
				"BildirimNo": "",
				"CreatedByText": "",
				"NowVerifyDate": "",
				"Save": "",
				"PostingDate": "",
				"CreatedAtDate": "",
				"NowCrmChangedAt": "",
				"ChangedAtDate": "",
				"NowPostprocessAt": "",
				"NowCreatedAt": "",
				"VerifyDate": "",
				"Guid": "",
				"NowChangedAt": "",
				"CompTxHeader": "",
				"NowHeadChangedAt": "",
				"NowValidFromExt": "",
				"PredecessorProcess": "",
				"PredecessorGuid": "",
				"Client": "",
				"ObjectId": "",
				"ProcessType": "",
				"Description": "",
				"DescrLanguage": "",
				"LogicalSystem": "",
				"CrmRelease": "",
				"Scenario": "",
				"TemplateType": "",
				"CreatedBy": "",
				"ChangedBy": "",
				"OrderadmHDummy": "",
				"InputChannel": "",
				"BtxClass": "",
				"AuthScope": "",
				"Refbussolnord": "",
				"SdmStatusDura": "",
				"ObjectType": "",
				"ArchivingFlag": "",
				"DescriptionUc": "",
				"ObjectIdOk": "",
				"IsMaintenanceOrder": "",
				"Knumv": "",
				"Kappl": "",
				"Kalsm": "",
				"Doctype": "",
				"Kvewe": "",
				"Mode": "",
				"PredecessorObjectType": "",
				"PredecessorLogSystem": "",
				"BinRelationType": "",
				"DeletedFlag": "",
				"HighestItemNo": "",
				"EarlyOrderNo": "",
				"ProcTypeDescr": "",
				"ProcTypeDescr40": "",
				"CreatedAtTime": "",
				"ChangedAtTime": "",
				"ToItems": {
					"results": [{
						"Client": "",
						"Status": "",
						"NetValue": "",
						"Statustxt": "",
						"Currency": "",
						"Delete": "",
						"NowCreatedAt": "",
						"Guid": "",
						"NowChangedAt": "",
						"Quantity": "",
						"CreatedBy": "",
						"NowOrderDate": "",
						"ProcessQtyUnit": "",
						"ChangedBy": "",
						"ObjectType": "",
						"DescriptionUc": "",
						"Header": "",
						"Parent": "",
						"Alternative": "",
						"Product": "",
						"ProductSrcSys": "",
						"OrderedProd": "",
						"PartnerProd": "",
						"Description": "",
						"ItmLanguage": "",
						"NumberInt": "",
						"NumberExt": "",
						"ItmType": "",
						"SubstReason": "",
						"ItmUsage": "",
						"ItmTypeUsage": "",
						"ProductKind": "",
						"LogSystemExt": "",
						"OrderadmIDummy": "",
						"AltidType": "",
						"ParentInCompTx": "",
						"NumberIntCompTx": "",
						"RevaccRefid": "",
						"RevaccReftype": "",
						"RevaccRelevantType": "",
						"ProfitCenter": "",
						"ProfitCenterOrigin": "",
						"Kokrs": "",
						"ProfitDetermineDate": "",
						"Refbussolnord": "",
						"Refbussolnorditm": "",
						"Subscrpnbillgcycle": "",
						"Midbillcycexprtnallwd": "",
						"DefaultTermsOvrwrt": "",
						"ProjOrgId": "",
						"CostCenter": "",
						"ItemChanged": "",
						"PredecessorGuid": "",
						"CreateSubitems": "",
						"NumberParent": "",
						"NumberAltern": "",
						"PreviousHandle": "",
						"PreviousGuid": "",
						"ItmProcIdent": "",
						"Multiplicity": "",
						"GroupingItem": "",
						"NumberParentCompTx": "",
						"Mode": "",
						"ItemTypeDescr": "",
						"SubstitutedProd": "",
						"CreatedAtDate": "",
						"SitnNumOfInstances": ""
					}]
				},
				"ToDates": {
					"results": [{
						"ApptGuid": "",
						"ApptType": "",
						"TimestampFrom": "",
						"TimezoneFrom": "",
						"TimestampTo": "",
						"TimezoneTo": "",
						"RuleId": "",
						"ShowLocal": "",
						"Dominant": "",
						"RuleGuid": "",
						"RuleName": "",
						"Duration": "",
						"TimeUnit": "",
						"IsDuration": "",
						"ApptTypeDescr": "",
						"Fromdate": "",
						"Todate": ""
					}]
				},
				"ToCustomerh": {
					"Client": "",
					"Zz1SegmentMarkaSrhTxt": "",
					"Zz1ZiyaretAdetSrh": "",
					"Guid": "",
					"Zz1YapilanIslemSrhTxt": "",
					"CustomerInt": "",
					"Zz1SatisNoktasiSrhTxt": "",
					"CustomerExt": "",
					"Zz1HKaynagiSdSrhTxt": "",
					"CustomerHDummy": "",
					"ServHDummyPs": "",
					"Zz1MarkaSrh": "",
					"Zz1CevaplamatipiSrh": "",
					"Zz1LokasyonSrh": "",
					"Zz1GizliBildirimSrh": "",
					"Zz1SatisNoktasiBilgSrh": "",
					"Zz1GecikmeSureSrh": "",
					"Zz1PersonelTipiSrh": "",
					"Zz1YenidenAcEtcSrh": "",
					"Zz1Kat1GarantiSrh": "",
					"Zz1YenidenAcildiSrh": "",
					"Zz1GeliskanaliSrh": "",
					"Zz1IadeFaturaNoSrh": "",
					"Zz1KuponTutariSrh": "",
					"Zz1IsAkisiSrh": "",
					"Zz1YedekParcaTuruSrh": "",
					"Zz1SorunKaynagiSrh": "",
					"Zz1YpLojistikBolumSrh": "",
					"Zz1YasalSurecTalepSrh": "",
					"Zz1KuponKoduSrh": "",
					"Zz1TalepTipiSrh": "",
					"Zz1Kat2KaliteSrh": "",
					"Zz1PazarYeriSrh": "",
					"Zz1YapilanIslemSrh": "",
					"Zz1TeslimatTipiSrh": "",
					"Zz1Kat3KaliteSrh": "",
					"Zz1YanlisTeslimatSrh": "",
					"Zz1IlkOnbesGunSrh": "",
					"Zz1BekletmenedeniSrh": "",
					"Zz1HizmetIlceSrh": "",
					"Zz1HediyeTuruSrh": "",
					"Zz1MsteriTkrrArandiSrh": "",
					"Zz1HediyeKodSrh": "",
					"Zz1IlkUcGunSrh": "",
					"Zz1SiparisNoSrh": "",
					"Zz1AnakoknedenSrh": "",
					"Zz1FaturaIbrazSrh": "",
					"Zz1DonusYapildiMiSrh": "",
					"Zz1HediyeSebebiSrh": "",
					"Zz1FaturaNoSrh": "",
					"Zz1YenidenAcGenelSrh": "",
					"Zz1FaturaTarihSrh": "",
					"Zz1KaporaSrh": "",
					"Zz1KaporaSrhc": "",
					"Zz1HKaynakGarantiSrh": "",
					"Zz1YenidenAcTeslimaSrh": "",
					"Zz1ServisKanalSrh": "",
					"Zz1TutanakSrh": "",
					"Zz1Kat3GarantiSrh": "",
					"Zz1GecenSureSrh": "",
					"Zz1SatisNoktasiTurSrh": "",
					"Zz1MusteriIknaSrh": "",
					"Zz1YenidenAcServisSrh": "",
					"Zz1HizmetIlSrh": "",
					"Zz1BildirimtipiSrh": "",
					"Zz1SatisNoktasiSrh": "",
					"Zz1SatisBolgeSrh": "",
					"Zz1TeslimatKaynagiSrh": "",
					"Zz1TesekkurBolumSrh": "",
					"Zz1MemnuniyetSrh": "",
					"Zz1SiparisNoBilgisiSrh": "",
					"Zz1BayiMagazaSrh": "",
					"Zz1RmaSrh": "",
					"Zz1OnlineDegisimIadSrh": "",
					"Zz1Kat2GarantiSrh": "",
					"Zz1HKaynakKaliteSrh": "",
					"Zz1HKaynagiSdSrh": "",
					"Zz1AramaSonucDurumuSrh": "",
					"Zz1MusteriArandiSrh": "",
					"Zz1TeminYeriSrh": "",
					"Zz1SatisSonucuSrh": "",
					"Zz1PazaryeriWebSrh": "",
					"Zz1CozumSureSrh": "",
					"Zz1SegmentMarkaSrh": "",
					"Zz1Kat1KaliteSrh": "",
					"Zz1YasalSurecRaporSrh": "",
					"Zz1KampanyaSrh": "",
					"Zz1DegisimKararSrh": "",
					"ActvHDummyPs": "",
					"Zz1EpostaAch": "",
					"Zz1SmsAch": "",
					"KnarHDummyPs": "",
					"PsspHDummyPs": "",
					"PsdpHDummyPs": "",
					"PsoaHDummyPs": "",
					"OpptHDummyPs": "",
					"CompHDummyPs": "",
					"RepaHDummyPs": "",
					"MagrHDummyPs": "",
					"IuctHDummyPs": "",
					"DmeaHDummyPs": "",
					"Mode": "",
					"RefGuid": ""
				},
				"Tostatus": {
					"Guid": "",
					"UserStatus": "",
					"UserStatProc": "",
					"Active": "",
					"Process": "",
					"Txt04": "",
					"Txt30": "",
					"Kind": "",
					"ObjectType": "",
					"ActiveOld": "",
					"Derived": "",
					"StObjType": "",
					"External": "",
					"CheckOnly": "",
					"Activate": "",
					"ActStatus": ""
				},
				"ToDocFlow": {
					"results": [{
						"Guid": "",
						"ObjectId": "",
						"CreatedAt": "",
						"ProcessType": "",
						"ProcessTypeDesc": "",
						"Status": "",
						"Txt04": "",
						"Txt30": ""
					}]
				},
				"ToPartners": {
					"results": [
						// 	{
						// 	"RefGuid": "",
						// 	"Telephone": "",
						// 	"EMail": "",
						// 	"RefHandle": "",
						// 	"RefKind": "",
						// 	"RefPartnerHandle": "",
						// 	"RefPartnerFct": "",
						// 	"RefPartnerNo": "",
						// 	"RefNoType": "",
						// 	"RefDisplayType": "",
						// 	"KindOfEntry": "",
						// 	"PartnerFct": "",
						// 	"PartnerNo": "",
						// 	"DisplayType": "",
						// 	"NoType": "",
						// 	"Mainpartner": "",
						// 	"RelationPartner": "",
						// 	"AddrNr": "",
						// 	"AddrNp": "",
						// 	"AddrType": "",
						// 	"AddrOrigin": "",
						// 	"StdBpAddress": "",
						// 	"AddrOperation": "",
						// 	"Calendar": "",
						// 	"Disabled": "",
						// 	"ErrorFlag": "",
						// 	"PartnerSrcSys": "",
						// 	"PartnerDummy": "",
						// 	"CompPrdDb": "",
						// 	"BpPartnerGuid": "",
						// 	"PartnerPft": "",
						// 	"PftSubtype": "",
						// 	"PartnerGuid": "",
						// 	"Guid": "",
						// 	"DeleteFlag": "",
						// 	"PartnFctDescr": "",
						// 	"PartnPftDescr": "",
						// 	"DescriptionName": "",
						// 	"AddressShort": ""
						// }
					]
				},
				"ToTexts": {
					"results": [
						// 	{
						// 	"Mandt": "",
						// 	"Tdobject": "",
						// 	"Tdname": "",
						// 	"Tdid": "",
						// 	"Tdspras": "",
						// 	"Tdtitle": "",
						// 	"Tdfreles": "",
						// 	"Tdfuser": "",
						// 	"Tdfdate": "",
						// 	"Tdftime": "",
						// 	"Tdlreles": "",
						// 	"Tdluser": "",
						// 	"Tdldate": "",
						// 	"Tdltime": "",
						// 	"Tdversion": "",
						// 	"Tdstyle": "",
						// 	"Tdform": "",
						// 	"Tdhyphenat": "",
						// 	"Tdtranstat": "",
						// 	"Tdospras": "",
						// 	"Tdmacode1": "",
						// 	"Tdmacode2": "",
						// 	"Tdtxtlines": "",
						// 	"Tdref": "",
						// 	"Tdrefobj": "",
						// 	"Tdrefname": "",
						// 	"Tdrefid": "",
						// 	"Tdtexttype": "",
						// 	"Tdcompress": "",
						// 	"Tdoclass": "",
						// 	"Logsys": "",
						// 	"ConcLines": "",
						// 	"ConcFormattedLines": "",
						// 	"Tdtext": ""
						// }
					]
				},
				"ToChangeHistory": {
					"results": [{
						"Objectid": "",
						"Changenr": "",
						"Username": "",
						"Udate": "",
						"Utime": "",
						"Tcode": "",
						"Tabname": "",
						"Tabkey": "",
						"Keylen": "",
						"Chngind": "",
						"Fname": "",
						"Ftext": "",
						"Textart": "",
						"Sprache": "",
						"TextCase": "",
						"Outlen": "",
						"FOld": "",
						"FNew": "",
						"Keyguid": "",
						"Tabkey254": "",
						"ExtKeylen": "",
						"KeyguidStr": "",
						"Version": "",
						"NumberInt": "",
						"GuidI": "",
						"EventTypeAppl": "",
						"EventType": "",
						"PartnerFctDescription": "",
						"Indtext": "",
						"Leveltxt": "",
						"Tabtext": ""
					}]
				},
				"ToAttachments": {
					"results": [{
						"HeaderGuid": "",
						"DocKey": "",
						"KwRelativeUrl": "",
						"ContentType": "",
						"Filename": "",
						"UrlToDisplay": "",
						"CreatedBy": "",
						"CreatedAt": "",
						"PhioClass": "",
						"PhioObjid": ""
					}]
				},
				"ToPricing": {
					"AcIndicatorTxt": "",
					"Client": "",
					"NowValidFrom": "",
					"Guid": "",
					"NowValidTo": "",
					"ExchgType": "",
					"NowTransTime": "",
					"ExchgDate": "",
					"Taxjurcode": "",
					"CustPricProc": "",
					"RefCurrency": "",
					"EntStrategy": "",
					"Currency": "",
					"PriceDate": "",
					"Pmnttrms": "",
					"PriceGrp": "",
					"PriceList": "",
					"CustGroup": "",
					"ExchgRate": "",
					"TaxDestCty": "",
					"TaxDestReg": "",
					"VatRegNo": "",
					"EtaxHandType": "",
					"EtaxSource": "",
					"Score": "",
					"Grade": "",
					"AcIndicator": "",
					"CustomerType": "",
					"CfopCode": "",
					"IcmsTaxlaw": "",
					"IpiTaxlaw": "",
					"TaxMatUsage": "",
					"LocTaxcat": "",
					"LocZerovat": "",
					"LocActcode": "",
					"LocDisttype": "",
					"LocTxrelclas": "",
					"IssTaxlaw": "",
					"CofinsTaxlaw": "",
					"PisTaxlaw": "",
					"PaymentMethod": "",
					"ScrapValue": "",
					"ScrapCurrency": "",
					"ScrapInstrLow": "",
					"ScrapInstrHigh": "",
					"LoyMemsId": "",
					"LoyPshId": "",
					"FundExchgType": "",
					"FundExchgDate": "",
					"FundExchgRate": "",
					"FundExchgRTg": "",
					"PricingDummy": "",
					"TaxExemptGuid": "",
					"TaxExemptId": "",
					"PointPmtIndic": "",
					"PointPmtAmt": "",
					"PointPmtPtype": "",
					"PricingControl": "",
					"RefGuid": "",
					"RefKind": "",
					"Mode": ""
				},
				"ToCumulate": {
					"Client": "",
					"Guid": "",
					"GrossWeight": "",
					"NetWeight": "",
					"WeightUnit": "",
					"Volume": "",
					"VolumeUnit": "",
					"GrossValue": "",
					"NetValue": "",
					"NetValueMan": "",
					"TaxAmount": "",
					"Freight": "",
					"NetWoFreight": "",
					"NumberItems": "",
					"CostAmount": "",
					"PaymentAmount": "",
					"RecurringCharge": "",
					"RecurringTax": "",
					"RecurringGross": "",
					"RecDuration": "",
					"RecTimeUnit": "",
					"NonRecurringCharge": "",
					"NonRecurringTax": "",
					"NonRecurringGross": "",
					"ClaimedAmount": "",
					"ValidatedAmount": "",
					"SettledAmount": "",
					"RejectedAmount": "",
					"ChargebAmount": "",
					"RecoveredAmount": "",
					"CarrOverAmount": "",
					"CollectblAmount": "",
					"UncollAmount": "",
					"PpOrigAmount": "",
					"PpChbAmount": "",
					"PpWrOffAmount": "",
					"UnresolvdAmount": "",
					"RequestedAmount": "",
					"PpRemainAmount": "",
					"UnassAmount": "",
					"ClaCostAmount": "",
					"RelExpAmount": "",
					"PaidAmount": "",
					"ClearedAmount": "",
					"UnclearRejAmnt": "",
					"ChargebSumAmnt": "",
					"WroffSumAmount": "",
					"CaroverSumAmnt": "",
					"UnassNetAmount": "",
					"UnresolNetAmnt": "",
					"ChargebNetAmnt": "",
					"PpNetAmount": "",
					"PendRecovAmnt": "",
					"LoyPointType": "",
					"LoyPoints": "",
					"PointsSpent": ""
				},
				"ToRefObj": {
					"TypeObject": "",
					"GuidObject": "",
					"ProductId": "",
					"IbCompRefGuid": "",
					"IbCompValid": "",
					"IbTzone": "",
					"MainObject": "",
					"PartCausFail": "",
					"InstDismInfo": "",
					"ProductGuid": "",
					"SerialNumber": "",
					"ExtRefobj": "",
					"EquipmentId": "",
					"FunctionalLocationId": "",
					"TextObject": "",
					"TextEquipment": "",
					"Select": "",
					"IbIbase": "",
					"IbInstance": "",
					"TextIbComp": "",
					"Mode": "",
					"AltidType": "",
					"IdFrom": "",
					"IdTo": "",
					"GuidRange": "",
					"TextFunctionalLocation": ""

				},
				"ToCategory": {
					"results": [{
						"Level": "",
						"Guid": "",
						"Key": "",
						"Value": ""
					}]
				},
				"ToAditionalFields": {
					"Guid": "",
					"RandevuSaati": "",
					"IlgiliServis": "",
					"SiparisVerenName": "",
					"SiparisVerenNo": "",
					"ZiyaretTarihi": "",
					"MusteriTalebi": "",
					"SiparisVerenEmail": "",
					"SiparisVerenAdres": "",
					"IlgiliKisiName": ""
				}

			};
			return oData;
		}

	};
});