
//~ js/StructuralAnalysis.js

function app_structural_analysis(){
	EventDispatcher.call(this);
	
	this.manager = null;
	this.ui = null;
	
	this.html = "";
	this.url = "app/app_structural_analysis.htm";
	
	this.nodeTable = new NodeTable();
	this.memberTable = new MemberTable();
	this.sectionTable = new SectionTable();
	this.nodeActionTable = new NodeActionTable();
	this.memberPointActionTable = new MemberPointActionTable();
	
	
	this.on("load", (function(){
		console.log(this.ui);
		this.ui.app_leftcol.appendChild(this.nodeTable.dom);
		this.ui.app_leftcol.appendChild(this.memberTable.dom);
		this.ui.app_leftcol.appendChild(this.sectionTable.dom);
		
		this.ui.app_rightcol.appendChild(this.nodeActionTable.dom);
		this.ui.app_rightcol.appendChild(this.memberPointActionTable.dom);
	}).bind(this));
	
	this.on("unload", (function(){
		
	}).bind(this));
}

function NodeTable(){

	

	this.name = "Nodes";
	this.columns = [];
	this.columns.push({name:"ID", 		type:"number"});
	this.columns.push({name:"X (mm)", 	type:"number"});
	this.columns.push({name:"Y (mm)", 	type:"number"});
	this.columns.push({name:"Fix X", 	type:"checkbox"});
	this.columns.push({name:"Fix Y", 	type:"checkbox"});
	this.columns.push({name:"Fix &theta;", type:"checkbox"});
	
	InputTable.call(this);
}
function MemberTable(){

	

	this.name = "Members";
	this.columns = [];
	this.columns.push({name:"ID", 		type:"number"});
	this.columns.push({name:"Node A ID", 	type:"number"});
	this.columns.push({name:"Node B ID", 	type:"number"});
	this.columns.push({name:"Section ID", 	type:"number"});

	
	InputTable.call(this);
}


function SectionTable(){

	

	this.name = "Sections";
	this.columns = [];
	this.columns.push({name:"ID", 		type:"number"});
	this.columns.push({name:"E (kN/mm<sup>2</sup> or MPa)", 	type:"number"});
	this.columns.push({name:"I (mm<sup>4</sup>)", 	type:"number"});
	this.columns.push({name:"A (mm<sup>2</sup>)", 	type:"number"});
	this.columns.push({name:"Material ID", 	type:"number"});

	
	InputTable.call(this);
}

function NodeActionTable(){

	

	this.name = "Node Actions";
	this.columns = [];
	this.columns.push({name:"ID", 		type:"number"});
	this.columns.push({name:"X (kN)", 	type:"number"});
	this.columns.push({name:"Y (kN)", 	type:"number"});
	this.columns.push({name:"M (kN/m)", 	type:"number"});

	
	InputTable.call(this);
}
function MemberPointActionTable(){

	

	this.name = "Member Point Actions";
	this.columns = [];
	this.columns.push({name:"ID", 		type:"number"});
	this.columns.push({name:"Global X (kN)", 	type:"number"});
	this.columns.push({name:"Global Y (kN)", 	type:"number"});
	this.columns.push({name:"Local X (kN)", 	type:"number"});
	this.columns.push({name:"Local Y (kN)", 	type:"number"});
	this.columns.push({name:"M (kN/m)", 	type:"number"});
	this.columns.push({name:"Location (mm)", 	type:"number"});

	
	InputTable.call(this);
}

