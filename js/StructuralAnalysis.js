

function Node(){
	this.id = undefined;
	this.x = undefined;
	this.y = undefined;
	this.fx = false;
	this.fy = false;
	this.fr = false;
	
	this.__defineGetter__("valid",(function(){
		result = true;
		result = result && (typeof this.id == "number");
		result = result && (!isNaN(this.id));
		result = result && (this.id == Math.round(Math.abs(this.id)));
		
		result = result && (typeof this.x == "number");
		result = result && (!isNaN(this.x));
		
		result = result && (typeof this.y == "number");
		result = result && (!isNaN(this.y));
		
		result = result && (typeof this.fx == "boolean");
		result = result && (typeof this.fy == "boolean");
		result = result && (typeof this.fr == "boolean");
		return result;
	}).bind(this));
}

function Member(){
	this.id = undefined;
	this.a = undefined;
	this.b = undefined;

	
	this.__defineGetter__("valid",(function(){
		result = true;
		result = result && (typeof this.id == "number");
		result = result && (!isNaN(this.id));
		result = result && (this.id == Math.round(Math.abs(this.id)));
		
		result = result && (typeof this.a == "number");
		result = result && (!isNaN(this.a));
		result = result && (this.a == Math.round(Math.abs(this.a)));
		
		result = result && (typeof this.b == "number");
		result = result && (!isNaN(this.b));
		result = result && (this.b == Math.round(Math.abs(this.b)));
		
		result = result && (this.a != this.b);
		

		
		return result;
	}).bind(this));
}

function Material(){
	this.id = undefined;
	this.name = "";
	this.E = 200000;
	this.I = 894000;
}