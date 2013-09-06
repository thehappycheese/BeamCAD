
///~ js/StructuralAnalysis.js

function app_structural_analysis(manager) {
	EventDispatcher.call(this);

	this.manager = manager;
	this.ui = null;

	this.ctx = null;
	this.view = {
		x : 0,
		y : 0,
		w : 1.5,
		h : 1
	};

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
			this.ctx = this.ui.app_canvas.getContext("2d");
			this.ui.app_rightcol.appendChild(this.nodeTable.dom);
			this.ui.app_bottomrow.appendChild(this.memberTable.dom);
		}).bind(this));

	this.on("unload", (function () {}).bind(this));

	this.draw = (function () {
		var i, j, data;

		var nodes = [];
		var members = [];
		// Validate data
		data = this.nodeTable.data;
		for (i = 0; i < data.length; i++) {
			if (data[i].valid) {
				nodes.push(data[i]);
			}
		}
		data = this.memberTable.data;
		var nodeshasA = false;
		var nodeshasB = false;
		for (i = 0; i < data.length; i++) {
			nodeshasA = false;
			nodeshasB = false;
			for (j = 0; j < nodes.length; j++) {
				if (nodes[j].id == data[i].a) {
					nodeshasA = true;
					data[i].nodea = nodes[j];
				}
				if (nodes[j].id == data[i].b) {
					nodeshasB = true;
					data[i].nodeb = nodes[j];
				}
			}
			// 
			if (data[i].valid && nodeshasA && nodeshasB) {
				members.push(data[i]);
			}
		}
		// Form Node Hull

		var xmin = Infinity;
		var xmax = -Infinity;

		var ymin = Infinity;
		var ymax = -Infinity;

		for (i = 0; i < nodes.length; i++) {
			if (nodes[i].x > xmax) {
				xmax = nodes[i].x;
			}
			if (nodes[i].x < xmin) {
				xmin = nodes[i].x;
			}
			if (nodes[i].y > ymax) {
				ymax = nodes[i].y;
			}
			if (nodes[i].y < ymin) {
				ymin = nodes[i].y;
			}
		}
		// Set view properties
		var border = ((xmax - xmin) + (ymax - ymin)) / 2 * 0.1 + 1;

		this.view.x = xmin - border;
		this.view.y = ymin - border;
		this.view.w = (xmax - xmin) + border * 2;
		this.view.h = (ymax - ymin) + border * 2;

		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
		// Draw members
		this.drawMembers(nodes, members);
		console.log(members);
		// Draw member fixities

		// Draw node fixities

		// Draw Nodes
		this.drawNodes(nodes);
		// Render other information

	}).bind(this);


	this.drawNodes = (function (nodes) {
		var i;
		var ctx = this.ctx;
		var nodeSize = 4;
		var nodeNumber = true;
		
		ctx.fillStyle = "black";
		for (i = 0; i < nodes.length; i++) {
			ctx.fillRect(this.tX(nodes[i].x) - nodeSize / 2,
				this.tY(nodes[i].y) - nodeSize / 2,
				nodeSize,
				nodeSize);
			ctx.font = "10px sans-serif";
			if(nodeNumber){
				ctx.fillText(nodes[i].id, this.tX(nodes[i].x) + nodeSize / 2, this.tY(nodes[i].y));
			}
		}

	}).bind(this);
	
	
	this.drawMembers = (function (nodes, members) {
		var i;
		var ctx = this.ctx;
		ctx.strokeStyle = "red";
		var memberNumber = true;
		var ax = 0;
		var ay = 0;
		var bx = 0;
		var by = 0;
		var nodea = null;
		var nodeb = null;
		for (i = 0; i < members.length; i++) {
			nodea = members[i].nodea;
			nodeb = members[i].nodeb;
			
			ax = this.tX(nodea.x);
			ay = this.tY(nodea.y);
			bx = this.tX(nodeb.x);
			by = this.tY(nodeb.y);
			
			ctx.beginPath();
			ctx.moveTo(ax,ay);
			ctx.lineTo(bx,by);
			ctx.stroke();
			
			ax = (ax+bx)/2;
			ay = (ay+by)/2;
			
			if(memberNumber){
				ctx.fillStyle = "red";
				ctx.fillText(members[i].id, ax, ay);
			}
		}

	}).bind(this);
	
	this.getArrayElementByProperty = (function(array, property, value){
		var i;
		for(i=0;i<array.length;i++){
			if(array[i][property]==value){
				return array[i];
			}
		}
		return null;
	}).bind(this);
	
	this.tX = (function (x) {
		return (x - this.view.x) / this.view.w * this.ctx.canvas.width;
	}).bind(this);

	this.tY = (function (y) {
		return (y - this.view.y) / this.view.h * this.ctx.canvas.height;
	}).bind(this);
}

function NodeTable() {

	nTable.call(this);

	this.name = "Nodes";

	this.datatype = Node;
	this.dataprops = [{
			property : "id",
			lable : "ID",
			type : "uint"
		}, {
			property : "x",
			lable : "X(mm)",
			type : "float"
		}, {
			property : "y",
			lable : "Y(mm)",
			type : "ufloat"
		}, {
			property : "fx",
			lable : "FixX",
			type : "bool"
		}, {
			property : "fy",
			lable : "FixY",
			type : "bool"
		}, {
			property : "fr",
			lable : "Fix&theta;",
			type : "bool"
		}
	];

	this.addRow(0);

	this.generateTable();
}
function MemberTable() {

	nTable.call(this);

	this.name = "Members";

	this.datatype = Member;
	this.dataprops = [{
			property : "id",
			lable : "ID",
			type : "uint"
		}, {
			property : "a",
			lable : "Node A",
			type : "float"
		}, {
			property : "b",
			lable : "Node B",
			type : "float"
		}
	];

	this.addRow(0);

	this.generateTable();
}
