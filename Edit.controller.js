sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"jquery.sap.storage",
], function (Controller, MessageToast, JSONModel, jQuery) {
	"use strict";

	return Controller.extend("app.Edit", {
        onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var rEdit = oRouter.getRoute("edit");
			rEdit.attachPatternMatched(this._onObjectMatched, this);
	},
	_onObjectMatched: function (oEvent) {
		var object = oEvent.getParameter("arguments").ids;
		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		this.users = this.oStorage.get("users");
		
        var oModel=new sap.ui.model.json.JSONModel();
		oModel.setData(this.users);

		var index = oModel.getData().findIndex(function(item, i){
			return item.Id == object
		});

		var oTable=new sap.ui.model.json.JSONModel([oModel.getData()[index]]);
		this.getView().setModel(oTable);
		
	},
	onPress : function(evt){
		var obj = evt.getSource().data("data");
		var res = obj.split(",");
		var id = res[0]
		var name = res[1];
		var age = res[2];

		this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		this.users = this.oStorage.get("users");
		
        var oModel=new sap.ui.model.json.JSONModel();
		oModel.setData(this.users);

		var index = oModel.getData().findIndex(function(item, i){
			return item.Id == id
		});

		oModel.getData()[index].Name = name;
		oModel.getData()[index].Age = age;

		console.log(oModel.getData());
		oModel.refresh(true);

        this.oStorage.put("users", oModel.getData());
		
	},
	goBack : function () {
		this.getOwnerComponent().getRouter().navTo("view", true);
	},
	onBack : function () {
		var sPreviousHash = History.getInstance().getPreviousHash();

		//The history contains a previous entry
		if (sPreviousHash !== undefined) {
			window.history.go(-1);
		} else {
			// There is no history!
			// replace the current hash with page 1 (will not add an history entry)
			this.getOwnerComponent().getRouter().navTo("index", null, true);
		}
	}
});
});
