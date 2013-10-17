////~ lib/nEvents/EventDispatcher.js





function nVarA(){
	nVar.call(this, "A", 0);
}

function nVarB(){
	nVar.call(this, "B", 0);
}
function nVarC(){
	nVar.call(this, "C", 0, ["A","B"]);
}



function nVar(name, value, prerequisites){
	
	this.name = name || "";
	this._value = value || 0;
	this._formula = function(){return 0};

	this.prerequisites = prerequisites || [];

	this.getValue = function(){
		return this._value;
	}.bind(this);

	this.setFormula = function(func){
		this._formula = func;
		return this;
	}.bind(this);

	this.updateValue = function(){
		this._value = this.formula();
	}.bind(this);

}

function nVarBase(){
	this.protos = [new nVarA(),new nVarB(),new nVarC()];
	this.vars = [new nVarA()];

	
	this.getProtoByName = function(name){
		for(var i = this.protos.length-1; i>=0;i--){
			if(name == this.protos[i].name){
				return this.protos[i];
			}
		}
	}.bind(this);

	this.hasvar = function(testname){
		for(var i = this.vars.length-1; i>=0;i--){
			if(this.vars[i].name == testname){
				return i;
			}
		}
		return -1;
	}.bind(this);

	this.canget = function(name){
		var i,j,k;

		// Get the prototype variable based on the name of the variable
		var nvar = this.getProtoByName(name);

		// Now check to see that all of the prototype's prerequisites are met
		var result = true;
		for(k=0;k<nvar.prerequisites.length;k++){
			// If the known .vars array doesnt contain the required name, return false
			if(this.hasvar(nvar.prerequisites[k])===-1){
				result = false;
				break;
			}
		}


		return result;
	}.bind(this);
	
	this.listnext = function(){
		result = [];
		for(i=0;i<this.protos.length;i++){// Look at each proto and see if we canget()
			if(this.canget(this.protos[i].name)){
				result.push(this.protos[i].name);
			}
		}
		return result;
	}.bind(this);

}

var vb = new nVarBase();










// PREREQUISITE BUILDER!
p = new (function PrerequisiteBuilder(){

	this.has = function(name){
		return ["has",name];
	}
	
	
	this.nothas = function(name){
		return ["not",["has",name]];
	}
	this.not = function(statement){
		return ["not",statement];
	}
	
	
	this.and = function(){
		return arguments
	}
	this.or = function(){
		return arguments.unshift("or");
	}
	
	
	this.less = function(variable,value){
		return ["less",variable,value];
	}
	this.greater = function(variable,value){
		return ["greater",variable,value];
	}
	
	
	this.lequal = function(variable,value){
		return ["lequal",variable,value];
	}
	this.gequal = function(variable,value){
		return ["gequal",variable,value];
	}
	
	
	this.equal = function(variable,value){
		return ["equal",variable,value];
	}
	this.notequal = function(variable,value){
		return ["notequal",variable,value];
	}
	this.none = function(){
		return ["none"];
	}

})();

var req = p.and(p.has("A"),	p.has("B"),	p.nothas("C"));


























