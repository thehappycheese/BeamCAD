///~ lib/mathjax/MathJax.js?config=default
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js
///~ lib/taffy-min.js

"use strict";


var ui = DOMTools.scrobble(document.body);




//ui.mainspace.innerHTML = "";


var tab = new nTable(10,2);

var asstab = new nTable(1,1);



ui.mainspace.appendChild(tab.dom);
ui.calcbox.appendChild(asstab.dom);



var dat = TAFFY([{"id":"mdc","prereq":"!mdc","name":"Moment design capacity","notation":"M^*","value":500,"unit":"kNm"},{"id":"bt","prereq":"!bt","name":"Beam type","notation":"{}","value":"T-Beam","unit":""},{"id":"mu","prereq":"!mc&Cc&Ts&dn&gamma","name":"Moment capacity","notation":"M_{uo}","value":"","unit":"kNm"},{"id":"phi","prereq":"!phi","name":"Capacity reduction factor","notation":"\\Phi","value":"","unit":""},{"id":"fc","prereq":"!fc","name":"Concrete characteristic strength","notation":"f'_{c}","value":"","unit":"MPa"},{"id":"fctf","prereq":"!fctf&fc","name":"Concrete characteristic tensile strength","notation":"f'_{ct.f}","value":"","unit":"MPa"},{"id":"alphatwo","prereq":"!alphatwo","name":"Alpha2 Coefficient","notation":"\\alpha_2","value":"","unit":""},{"id":"gamma","prereq":"!gamma&fc","name":"Gamma Ratio","notation":"\\gamma","value":"","unit":""},{"id":"ku","prereq":"d&dn","name":"k ratio","notation":"k_u","value":"","unit":""},{"id":"d","prereq":"!d","name":"Depth to tensile steel centroid","notation":"d","value":"","unit":"mm"},{"id":"B","prereq":"!B","name":"Breadth of beam","notation":"B","value":"","unit":"mm"},{"id":"D","prereq":"!D","name":"Depth of beam","notation":"D","value":"","unit":"mm"},{"id":"dn","prereq":"!dn&alphatwo&fc&gamma&B&sigys&Ast","name":"Depth to neutral axis","notation":"d_n","value":"","unit":"mm"},{"id":"Ts","prereq":"!Ts&Ast&sigys","name":"Force in tensile steel","notation":"T_s","value":"","unit":"kN"},{"id":"I","prereq":"!I&B&D","name":"Second moment of area","notation":"I","value":"","unit":"mm^4"},{"id":"Z","prereq":"!Z&I","name":"Section modulus","notation":"Z","value":"","unit":"mm^3"},{"id":"mumin","prereq":"!mumin&Z&fctf","name":"Minimum design capacity","notation":"(M_{uo})_{min}","value":"","unit":""},{"id":"Cc","prereq":"!Cc&dn","name":"Concrete Compression","notation":"C_c","value":"","unit":"kN"},{"id":"Ast","prereq":"!Ast","name":"Area of tensile steel","notation":"A_{st}","value":"","unit":"mm^2"},{"id":"sigys","prereq":"!sigys","name":"Steel yield stress","notation":"\\sigma_{ys}","value":500,"unit":""},{"id":"cchk","prereq":"!cchk&phi&mdc&mu","name":"Capacity Check","notation":"{}","value":"","unit":""}]);
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



