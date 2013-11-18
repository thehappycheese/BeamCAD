///~ lib/nParser/nParser.js
///~ lib/taffy-min.js


/**
@class Arimsys
@param database {TaffyDB} This database should include the columns {id:"string", prereqs:"string"}
*/
function nArimsys(database) {

	/**
	@property dat {TaffyDB}
	*/
	this.dat = database;

	/**
	Stores a series of calculations in the order that they are to be performed. Each calculation affects a series of entries in the "dat" database
	@property calcs
	*/
	this.calcs = [];
	
	/**
	Searches the calculation space for new symbols that can be found.
	@method getAvaliable
	*/
	this.getAvaliable = function(){
		var i;
		var result = [];
		this.dat().each(function(r){
			if(r.prereq==="" || this.checkPrerequisite(r.prereq)){
				result.push(r.id);
			}
		}.bind(this));
		return result;
	}.bind(this);

	
	this.checkPrerequisite = function(str){
		var prereq = nParser.parse(str);
		return this.check(prereq);
	}.bind(this);
	
	
	
	// ===== Recursive Prereuisite decomposition =====
	this.check = function(exp){
		var funcname = exp.shift()
		return this[funcname].apply(this,exp)
	}.bind(this);
	
	
	// ===== PREREQUISITE OPPERATORS =====
	this.has = function(varname){
		var val = this.dat({"id":varname}).first().value;
		return (val!==null && val!==undefined && val!=="")
	}.bind(this);
	this.and = function(left, right){
		return this.check(left) && this.check(right);
	}
	this.or = function(left, right){
		return this.check(left) || this.check(right);
	}
	this.not = function(right){
		return !this.check(right)
	}.bind(this);
	
	this.eq = function(left, right){
		var val = this.dat({"id":left}).first().value
		return val == right;
	}
}