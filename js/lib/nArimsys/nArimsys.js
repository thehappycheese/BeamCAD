///~ lib/nEvents/EventDispatcher.js









function nArimsysVar(name, value, notation){
	
	EventDispatcher.call(this);
	
	this.name = name || "";
	this.notation = notation || "";
	this._value = value || 0;
	this._formula = null;
	
	this.type = "";
	
	
	this.__defineSetter__("formula",function(){
		
	}.bind(this));
	
	this.__defineGetter__("value", function(){
		return this._value;
	}.bind(this));
	this.__defineSetter__("value", function(newval){
		var oldval = this._value;
		this._value = newval;
		this.dispatch("change", {target:this, oldval:oldval});
	}.bind(this));

}

function nArimsysFormula(){
	
}