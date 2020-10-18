sap.ui.define(["sap/ui/core/UIComponent",
        'sap/ui/model/resource/ResourceModel',
        'sap/ui/model/odata/ODataModel',
    ],

    function (UIComponent, ResourceModel, ODataModel) {
        "use strict";

        var Component = UIComponent.extend("app.Component", {

            metadata: {
                rootView: "app.App",
                routing: {
                    config: {
                        routerClass: "sap.m.routing.Router",
                        viewPath: "app",
                        controlId: "app",
                        controlAggregation: "pages",
                        viewType: "XML",
                        "async" : "true",
                        "clearTarget" : "true"
                    },
                    routes: [
                        {
                            name: "index",
                            // empty hash - normally the start page
                            pattern: "index",
                            target: "index"
                        },
                        {
                            name : "add",
                            pattern: "add",
                            target: "add"
                        },
                        {
                            name : "edit",
                            pattern: "edit/{ids}",
                            target: "edit"
                        },
                        {
                            name : "view",
                            pattern: "view",
                            target: "view"
                        },
                        {
                            name: "delete",
                            pattern: "delete",
                            target: "delete"
                        }

                    ],
                    targets: {
                        "index": {
                            viewName: "App",
                        },
                        add : {
                            viewName : "Add"
                        },
                        edit : {
                            viewName : "Edit"
                        },
                        view : {
                            viewName : "View"
                        },
                        delete : {
                            viewName : "Delete"
                        }
                    }
                }
            },

            init: function () {

                UIComponent.prototype.init.apply(this, arguments);

                this._router = this.getRouter();
                this._router.initialize();

                // Parse the current url and display the targets of the route that matches the hash
                this.getRouter().initialize();

                
            
            },
        });

        return Component;
    }, true);