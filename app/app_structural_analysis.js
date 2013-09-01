
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

	nTable.call(this);

	this.name = "Nodes";
	
	this.datatype = Node;
	this.dataprops = [
		{property:"id",	lable:"ID",				type:"uint"	},
		{property:"x",	lable:"x (mm)", 		type:"float"},
		{property:"y",	lable:"y (mm)", 		type:"float"},
		{property:"fx",	lable:"Fix X", 			type:"bool"	},
		{property:"fy",	lable:"Fix Y", 			type:"bool"	},
		{property:"fr",	lable:"Fix &theta;",	type:"bool"	}
	];
	
	this.data = [new Node(),new Node(),new Node(),new Node(),new Node()];
	
	this.initInputs();
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