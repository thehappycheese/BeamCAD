///~ lib/mathjax/MathJax.js?config=TeX-AMS_HTML-full
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js

"use strict";


var ui = DOMTools.scrobble(document.body);




//ui.mainspace.innerHTML = "";


var tab = new nTable(10,2);

tab.getCell(0,0)
	.setValues([["Name","Value","Pre-Requisite Pattern"]])
	.setDomProperties("className",[["heading","heading"]]);


ui.leftbar.appendChild(tab.dom);



var dat = new Database();




function Database(){
	this.headers = ["name","value","prereq","has"];
	this.data = 
		[["A",1			,"!A",		true],
		 ["B",2			,"!B",		true],
		 ["C",undefined	,"!C&B",	false],
		 ["D",undefined	,"!D&A&C",	false],
		 ["E",undefined	,"!E&D&C",	false],
		 ["F",undefined	,"E",		false]];
	
	
	this.getValue = function(varname){
		var i;
		for(i=0;i<this.data.length;i++){
			if(this.data[i][0]==varname){
				return this.data[i][1];
			}
		}
		return undefined;
	}.bind(this);
	
	this.render = function(){
		
	}.bind(this);
	
	this.checkExpression = function(str){
		var prereq = prereqpegjs.parse(str);
		console.log(prereq);
		return this.check(prereq);
	}.bind(this);
	
	
	this.check = function(exp){
		var funcname = exp.shift()
		return this.evaluate[funcname].apply(this,exp)
	}.bind(this);
	
	this.evaluate = {};
	this.evaluate.has = function(varname){
		var i;
		for(i=0;i<this.data.length;i++){
			if(this.data[i][0]==varname){
				return this.data[i][3];
			}
		}
		return false;
	}.bind(this);
	
	this.evaluate.and = function(left, right){
		return this.check(left) && this.check(right);
	}
	this.evaluate.or = function(left, right){
		return this.check(left) || this.check(right);
	}
	this.evaluate.not = function(right){
		return !this.check(right)
	}.bind(this);
	
	this.evaluate.eq = function(left, right){
		console.log("eq",left,"=",this.evaluate.val(left),"; ",right);
		return this.evaluate.val(left) == right;
	}
	this.evaluate.val = function(varname){
		return this.getValue(varname);
	}.bind(this);
}






