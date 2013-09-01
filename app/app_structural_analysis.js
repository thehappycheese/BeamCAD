
//~ js/StructuralAnalysis.js

function app_structural_analysis(){
	EventDispatcher.call(this);
	
	this.manager = null;
	this.ui = null;
	
	this.html = "";
	this.url = "app/app_structural_analysis.htm";
	
	this.nodeTable = new NodeTable();
	
	
	this.on("load", (function(){
		console.log(this.ui);
		this.ui.app_leftcol.appendChild(this.nodeTable.dom);
	}).bind(this));
	
	this.on("unload", (function(){
		
	}).bind(this));
}

function NodeTable(){

	InputTable.call(this);

	this.name = "Nodes";
	
	this.datatype = Node;
	this.dataprops = [
		["id",	"ID",			"uint"],
		["x",	"x (mm)", 		"float"],
		["y",	"y (mm)", 		"float"],
		["fx",	"Fix X", 		"bool"],
		["fy",	"Fix Y", 		"bool"],
		["fr",	"Fix Rotation",	"bool"]
	];
	
	this.addRow(0);
	
	this.generateInputs();
	this.generateTable();
}



function Node(){
	this.id = 0;
	this.x = 0;
	this.y = 0;
	this.fx = false;
	this.fy = false;
	this.fr = false;
	
}