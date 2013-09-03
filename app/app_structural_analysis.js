
///~ js/StructuralAnalysis.js

function app_structural_analysis(){
	EventDispatcher.call(this);
	
	this.manager = null;
	this.ui = null;
	
	this.html = "";
	this.url = "app/app_structural_analysis.htm";
	
	this.nodeTable = new NodeTable();
	this.memberTable = new MemberTable();
	
	
	this.on("load", (function(){
		console.log(this.ui);
		this.ui.app_leftcol.appendChild(this.nodeTable.dom);
		this.ui.app_rightcol.appendChild(this.memberTable.dom);
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
	
	this.data = [new this.datatype()];
	
	this.initInputs();
	this.generateTable();
}
function MemberTable(){

	nTable.call(this);

	this.name = "Member";
	
	this.datatype = Member;
	this.dataprops = [
		{property:"id",	lable:"ID",				type:"uint"	},
		{property:"a",	lable:"Node A", 		type:"float"},
		{property:"b",	lable:"Node B", 		type:"float"}
	];
	
	this.data = [new this.datatype()];
	
	this.initInputs();
	this.generateTable();
}



