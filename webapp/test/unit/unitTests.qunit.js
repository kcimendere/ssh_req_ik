/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"crm/ssh_req_abr_ik/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});