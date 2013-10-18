///~ lib/mathjax/MathJax.js?config=default
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js

"use strict";


var ui = DOMTools.scrobble(document.body);




//ui.mainspace.innerHTML = "";


var tab = new nTable(10,2);

var asstab = new nTable(1,1);



ui.mainspace.appendChild(tab.dom);
ui.calcbox.appendChild(asstab.dom);



var dat = new Database();
var arim = new Arimsys(dat);

rendertables();

function rendertables (){
	tab.init(dat.data.length+1,dat.humanHeader.length);
	var cell = tab.getCell(0,0)
				  .setValues([dat.humanHeader]);
		
	do{
		cell.dom.className = "heading";
		cell = cell.getRight();
	}while(cell!=undefined)
	
	cell = tab.getCell(1,0);
	var i = 0;
	do{
		cell.setValues([dat.data[i++]])
		cell = cell.getDown();
	}while (cell);
	cell = tab.getCell(1,3);
	do{
		cell.convertToMathJax()
		cell = cell.getDown();
	}while(cell)
	
	tab.getCell(0,0).setStyles("width",[["2cm","3cm","","3cm","2cm","1cm"]])
	
	var av = arim.getAvaliable();
	asstab.init(av.length+1,2);
	asstab.getCell(0,0).merge(1,2).setValue("Possible to Find:").dom.className = "heading";
	cell = asstab.getCell(1,0);
	var butcell,butt;
	var i  = 0;
	do{
		cell.convertToMathJax().setValue(dat.getValue("id",av[i],"notation"));
		
		butt = document.createElement("button");
		butt.innerHTML =  "calculate it";
		butt.vid = av[i];
		butt.onclick = function(){
			dat.setValue("id",this.vid,"value","###");
		}.bind(butt);
		butcell = cell.getRight();
		butcell.dom.appendChild(butt);
		
		i++
		cell = cell.getDown();
	}while (cell);
	
	
}







// ID Description Notation




function Database(){
	this.humanHeader = ["ID","Prerequisite","Name","Notation","Value","Unit"];
	this.header = {"id":0,"0":"id","prereq":1,"1":"prereq","name":2,"2":"name","notation":3,"3":"notation","value":4,"4":"value","unit":5,"5":"unit"};
	this.data =[["mdc","!mdc","Moment design capacity","M^*",500,"kNm"],["bt","!bt","Beam type","Beam~Type","T-Beam",null],["mu","!mc&Cc&Ts&dn&gamma","Moment capacity","M_{uo}",null,"kNm"],["phi","!phi","Capacity reduction factor","\\Phi",null,null],["fc","!fc","Concrete characteristic strength","f'_{c}",null,"MPa"],["fctf","!fctf&fc","Concrete characteristic tensile strength","f'_{ct.f}",null,"MPa"],["alphatwo","!alphatwo","Alpha2 Coefficient","\\alpha_2",null,null],["gamma","!gamma&fc","Gamma Ratio","\\gamma",null,null],["ku","d&dn","k ratio","k_u",null,null],["d","!d","Depth to tensile steel centroid","d",null,"mm"],["B","!B","Breadth of beam","B",null,"mm"],["D","!D","Depth of beam","D",null,"mm"],["dn","!dn&alphatwo&fc&gamma&B&sigys&Ast","Depth to neutral axis","d_n",null,"mm"],["Ts","!Ts&Ast&sigys","Force in tensile steel","T_s",null,"kN"],["I","!IB&D","Second moment of area","I",null,"mm^4"],["Z","!Z&I","Section modulus","Z",null,"mm^3"],["mumin","!mumin&Z&fctf","Minimum design capacity","(M_{uo})_{min}",null,null],["Cc","!Cc&dn","Concrete Compression","C_C",null,"kN"],["Ast","!Ast","Area of tensile steel","A_{st}",null,"mm^2"],["sigys","!sigys","Steel yield stress","\\sigma_{ys}",500,null],["cchk","!cchk&phi&mdc&mu","Capacity Check","Capacity~Check",null,null]]
	
	
	this.getValue = function(inhead,val,outhead){
		// a top down search for a match for the VAL of the column INHEAD. Returns the value of the OUTHEAD cell.
		var inh  = this.header[inhead];
		var outh = this.header[outhead];
		
		if(inh==undefined || outh==undefined){
			return undefined;
		}
		
		var row;
		for(row=0;row<this.data.length;row++){
			if(this.data[row][inh]==val){
				return this.data[row][outh];
			}
		}
		return undefined;
	}.bind(this);
	
	this.setValue = function(inhead,val,outhead,newval){
		// a top down search for a match for the VAL of the column INHEAD. Returns the value of the OUTHEAD cell.
		var inh  = this.header[inhead];
		var outh = this.header[outhead];
		
		if(inh==undefined || outh==undefined){
			return undefined;
		}
		
		var row;
		for(row=0;row<this.data.length;row++){
			if(this.data[row][inh]==val){
				this.data[row][outh] = newval;
			}
		}
		rendertables();
		return this;
	}.bind(this);
}

function Arimsys (database){
	this.dat = database;
	
	
	this.getAvaliable = function(){
		var i;
		var result = [];
		var pre;
		
		for(i=0;i<this.dat.data.length;i++){
			// TODO: This is mega haxorz :(
			var pre = this.dat.data[i][this.dat.header["prereq"]];
			if(pre=="" || pre==undefined || pre==null){
				result.push(this.dat.data[i][this.dat.header["id"]])
			}else{
				if(this.checkPrerequisite(pre)){
					result.push(this.dat.data[i][this.dat.header["id"]])
				}
			}
		}
		return result
	}.bind(this);
	
	this.checkPrerequisite = function(str){
		var prereq = prereqpegjs.parse(str);
		return this.check(prereq);
	}.bind(this);
	
	
	
	// ===== Recursive Prereuisite decomposition =====
	this.check = function(exp){
		var funcname = exp.shift()
		return this[funcname].apply(this,exp)
	}.bind(this);
	
	
	// ===== PREREQUISITE OPPERATORS =====
	this.has = function(varname){
		var val = this.dat.getValue("id",varname,"value")
		return (val!==null && val!==undefined)
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
		var val = this.dat.getValue("id",left,"value")
		return val == right;
	}
}



