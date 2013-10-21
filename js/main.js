///~ lib/mathjax/MathJax.js?config=default
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js
///~ data/Data.js

"use strict";


var ui = DOMTools.scrobble(document.body);




//ui.mainspace.innerHTML = "";


var tab = new nTable(10,2);

var asstab = new nTable(1,1);



ui.mainbar.appendChild(tab.dom);
ui.calcbox.appendChild(asstab.dom);





var dat = data_AS3600Variables;
var arim = new Arimsys(dat);

rendertables(["name","notation","value","unit"]);
function rendertables (headings){
	tab.init(dat().count()+1,headings.length);
	var cell = tab.getCell(0,0).setValues([headings]);
		
	// TODO: Get range object from table, apply formatting options to range;
	do{
		cell.dom.className = "heading";
		cell = cell.getRight();
	}while(cell!=undefined)
	// TODO: Change this awful method of math-jaxing things
	cell = tab.getCell(1,1);
	do{
		cell.convertToMathJax()
		cell = cell.getDown();
	}while(cell)
	
	var x = 0;
	var y = 1;
	dat().order("name").each(function(r){

		headings.forEach(function(heading){
			tab.getCell(y,x).setValue(r[heading]).dom.title = r["description"];
			x++;
		})
		x=0;
		y++;
	});
	

	var av = arim.getAvaliable();
	console.log(av)
	asstab.init(av.length+1,2);
	asstab.getCell(0,0).merge(1,2).setValue("Possible to Find:").dom.className = "heading";
	cell = asstab.getCell(1,0);
	var butcell,butt;
	var i  = 0;
	do{
		cell.setValue(dat({"id":av[i]}).first().notation).convertToMathJax();
		
		butt = document.createElement("button");
		butt.innerHTML =  "calculate it";
		butt.vid = av[i];
		butt.onclick = function(){
			dat({"id":this.vid}).first().value = "###"
			rendertables(["name","notation","value","unit"]);
		}.bind(butt);
		butcell = cell.getRight();
		butcell.dom.appendChild(butt);
		
		i++
		cell = cell.getDown();
	}while (cell);
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.body]);
	
}

function Arimsys (database){
	this.dat = database;
	
	
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



