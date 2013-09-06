

function app_beam_design(manager) {
	EventDispatcher.call(this);

	this.manager = manager;
	this.ui = null;

	

	this.html = "";
	this.url = "app/app_structural_analysis.htm";

	this.nodeTable = new NodeTable();
	this.memberTable = new MemberTable();

	this.nodeTable.on("change", (function () {
			this.draw();
		}).bind(this));

	this.memberTable.on("change", (function () {
			this.draw();
		}).bind(this));

	this.on("load", (function () {

	}).bind(this));

	this.on("unload", (function () {}).bind(this));
}
