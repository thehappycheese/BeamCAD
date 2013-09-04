
///~ js/StructuralAnalysis.js

function app_structural_analysis(){
	EventDispatcher.call(this);
	
	this.manager = null;
	this.ui = null;
	
	this.ctx = null;
	this.view = {x:0,y:0,w:1.5,h:1};
	
	this.html = "";
	this.url = "app/app_structural_analysis.htm";
	
	this.nodeTable = new NodeTable();
	this.memberTable = new MemberTable();
	
	this.nodeTable.on("change", (function(){
		this.draw();
	}).bind(this));
	
	this.memberTable.on("change", (function(){
		this.draw();
	}).bind(this));
	
	
	
	this.on("load", (function(){
		this.ctx = this.ui.app_canvas.getContext("2d");
		this.ui.app_rightcol.appendChild(this.nodeTable.dom);
		this.ui.app_bottomrow.appendChild(this.memberTable.dom);
	}).bind(this));
	
	this.on("unload", (function(){	
	}).bind(this));
	
	
	
	
	this.draw = (function(){
		var i, data;
		
		var nodes = [];
		var members = [];
		// Validate data
		data = this.nodeTable.data;
		for(i = 0; i < data.length; i++){
			if(data[i].valid){
				nodes.push(data[i]);
			}
		}
		data = this.memberTable.data;
		for(i = 0; i < data.length; i++){
			if(data[i].valid){
				members.push(data[i]);
			}
		}
		// Form Node Hull
		
		var xmin = Infinity;
		var xmax = -Infinity;
		
		var ymin = Infinity;
		var ymax = -Infinity;
		
		
		for(i = 0; i < nodes.length; i++){
			if(nodes[i].x>xmax){
				xmax = nodes[i].x;
			}
			if(nodes[i].x<xmin){
				xmin = nodes[i].x;
			}
			if(nodes[i].y>ymax){
				ymax = nodes[i].y;
			}
			if(nodes[i].y<ymin){
				ymin = nodes[i].y;
			}
		}
		// Set view properties
		var border = ((xmax-xmin)+(ymax-ymin))/2*0.1+1;
		
		this.view.x = xmin - border;
		this.view.y = ymin - border;
		this.view.w = (xmax-xmin) + border*2;
		this.view.h = (ymax-ymin) + border*2;
		
		
		this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height)
		// Draw members
		
		
		// Draw member fixities
		
		// Draw node fixities
		
		// Draw Nodes
		this.drawNodes(nodes);
		// Render other information
		
	}).bind(this);
	
	this.tX = (function(x){
		return (x-this.view.x)/this.view.w*this.ctx.canvas.width;
	}).bind(this);
	
	this.tY = (function(y){
		return (y-this.view.y)/this.view.h*this.ctx.canvas.height;
	}).bind(this);
	
	this.drawNodes = (function(data){
		var i;
		var ctx = this.ctx;
		var data
		var nodeSize = 4;
		var nodeNumber = true;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.ctx);
		for(i = 0; i < data.length; i++){
			ctx.fillRect(this.tX(data[i].x) - nodeSize/2,
						 this.tY(data[i].y) - nodeSize/2,
						 nodeSize,
						 nodeSize);
			ctx.font = "10px sans-serif";
			ctx.fillText(data[i].id, this.tX(data[i].x)+nodeSize/2, this.tY(data[i].y))
		}
		
	}).bind(this);
}

function NodeTable(){

	nTable.call(this);

	this.name = "Nodes";
	
	this.datatype = Node;
	this.dataprops = [
		{property:"id",	lable:"ID",				type:"uint"	},
		{property:"x",	lable:"x (mm)", 		type:"float"},
		{property:"y",	lable:"y (mm)", 		type:"ufloat"},
		{property:"fx",	lable:"Fix X", 			type:"bool"	},
		{property:"fy",	lable:"Fix Y", 			type:"bool"	},
		{property:"fr",	lable:"Fix &theta;",	type:"bool"	}
	];
	
	this.addRow(0);
	
	this.generateTable();
}
function MemberTable(){

	nTable.call(this);

	this.name = "Members";
	
	this.datatype = Member;
	this.dataprops = [
		{property:"id",	lable:"ID",				type:"uint"	},
		{property:"a",	lable:"Node A", 		type:"float"},
		{property:"b",	lable:"Node B", 		type:"float"}
	];
	
	this.addRow(0);
	

	this.generateTable();
}



