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





var dat = TAFFY([{"id":"Ag","prereq":"!Ag&B&D","name":"Gross sectional area","description":"gross cross-sectional area of a member","notation":"A_g","unicode":"A_g","value":"","unit":"mm^2","undefined":""},{"id":"As","prereq":"","name":"","description":"cross-sectional area of reinforcement (see Clauses 3.4.3.2 and 13.2.2);","notation":"A_s","unicode":"A_s","value":"","unit":"","undefined":""},{"id":"Asc","prereq":"","name":"","description":"cross-sectional area of compressive reinforcement","notation":"A_{sc}","unicode":"A_sc","value":"","unit":"","undefined":""},{"id":"Ast","prereq":"!Ast","name":"Area of tensile steel","description":"cross-sectional area of longitudinal tensile reinforcement; or cross-sectional area of reinforcement in the zone that would be in tension under the design loads if the effects of prestress and axial loads are ignored","notation":"A_{st}","unicode":"A_st","value":"","unit":"mm^2","undefined":"yes"},{"id":"B","prereq":"!B","name":"Breadth of beam","description":"width of a rectangular cross-section or member","notation":"b","unicode":"b","value":"","unit":"mm","undefined":"yes"},{"id":"bt","prereq":"!bt","name":"Beam type","description":"","notation":"","unicode":"Beam Type","value":"T-Beam","unit":"","undefined":"no"},{"id":"Cc","prereq":"!Cc&dn","name":"Concrete Compression","description":"","notation":"C_c","unicode":"C_c","value":"","unit":"kN","undefined":"no"},{"id":"cchk","prereq":"!cchk&phi&mstar&muo","name":"Capacity Check","description":"","notation":"","unicode":"Capacity Check","value":"","unit":"","undefined":"no"},{"id":"d","prereq":"!d","name":"Depth to tensile steel centroid","description":"effective depth of a cross-section in the plane of bending","notation":"d","unicode":"d","value":"","unit":"mm","undefined":"yes"},{"id":"D","prereq":"!D","name":"Depth of beam","description":"overall depth of a cross-section in the plane of bending; or depth or breadth of the symmetrical prism as appropriate (see Clause 12.5.6)","notation":"D","unicode":"D","value":"","unit":"mm","undefined":"yes"},{"id":"dn","prereq":"!dn&alphatwo&fc&gamma&B&fsy&Ast","name":"Depth to neutral axis","description":"","notation":"d_n","unicode":"d_n","value":"","unit":"mm","undefined":"yes"},{"id":"fc","prereq":"!fc","name":"Concrete characteristic strength","description":"characteristic compressive (cylinder) strength of concrete at 28 days","notation":"f'_{c}","unicode":"f'_c","value":"","unit":"MPa","undefined":"yes"},{"id":"fctf","prereq":"!fctf&fc","name":"Concrete characteristic tensile strength","description":"measured flexural tensile strength of concrete (see Clause 3.1.1.3)","notation":"f'_{ct.f}","unicode":"f'_ct.f","value":"","unit":"MPa","undefined":"no"},{"id":"I","prereq":"!I&B&D","name":"Second moment of area","description":"second moment of area of the uncracked concrete cross-section about the centroidal axis","notation":"I","unicode":"I","value":"","unit":"mm^4","undefined":"no"},{"id":"Icr","prereq":"!Icr","name":"Transformed area second moment of area","description":"second moment of area of a cracked section with the reinforcement transformed to an equivalent area of concrete","notation":"I_{cr}","unicode":"I_cr","value":"","unit":"","undefined":""},{"id":"Ief","prereq":"!Ief","name":"Effective second moment of area","description":"an effective second moment of area (see Clause 8.5.3)","notation":"I_{ef}","unicode":"I_ef","value":"","unit":"","undefined":""},{"id":"Iefmax","prereq":"!Iefmax","name":"Maximum effective second moment of area","description":"maximum effective second moment of area (see Clause 8.5.3)","notation":"I_{ef.max}","unicode":"I_ef.max","value":"","unit":"","undefined":""},{"id":"ku","prereq":"!ku&d&dn","name":"k ratio","description":"neutral axis parameter being the ratio, at ultimate strength under any combination of bending and compression, of the depth to the neutral axis from the extreme compressive fibre to d","notation":"k_u","unicode":"k_u","value":"","unit":"","undefined":"no"},{"id":"muo","prereq":"!muo&Cc&Ts&dn&gamma","name":"Moment capacity","description":"ultimate strength in bending, without axial force, at a cross-section","notation":"M_{uo}","unicode":"M_ou","value":"","unit":"kNm","undefined":"no"},{"id":"muomin","prereq":"!muomin&Z&fctf","name":"Minimum design capacity","description":"minimum required strength in bending at a critical cross-section (see Clause 8.1.6.1)","notation":"(M_{uo})_{min}","unicode":"M_ou_min","value":"","unit":"","undefined":"no"},{"id":"mstar","prereq":"!mstar","name":"Moment design capacity","description":"design bending moment at a cross-section","notation":"M^*","unicode":"M*","value":"","unit":"kNm","undefined":"yes"},{"id":"Ts","prereq":"!Ts&Ast&fsy","name":"Force in tensile steel","description":"","notation":"T_s","unicode":"T_s","value":"","unit":"kN","undefined":"no"},{"id":"Z","prereq":"!Z&I","name":"Section modulus","description":"section modulus of the uncracked cross-section, referred to the extreme fibre at which flexural cracking occurs (see Clause 8.1.6.1)","notation":"Z","unicode":"Z","value":"","unit":"mm^3","undefined":"no"},{"id":"alphatwo","prereq":"!alphatwo","name":"Alpha2 Coefficient","description":"Coefficient of concrete compressive area in the \"Equivalent compression block method\"","notation":"\\alpha_2","unicode":"\u03b1\u2082","value":"","unit":"","undefined":"no"},{"id":"fsy","prereq":"!fsy","name":"Steel characteristic yield strength","description":"characteristic yield strength of reinforcement (referred to as Re in AS/NZS 4671), determined in accordance with Clause 3.2.1","notation":"\\sigma_{ys}","unicode":"\u03c3_ys","value":500,"unit":"","undefined":"yes"},{"id":"gamma","prereq":"!gamma&fc","name":"Gamma Ratio","description":"the ratio, under design bending or design combined bending and compression, of the depth of the assumed rectangular compressive stress block to k_u * d","notation":"\\gamma","unicode":"\u03a5","value":"","unit":"","undefined":"no"},{"id":"phi","prereq":"!phi","name":"Capacity reduction factor","description":"capacity reduction factor for design using linear elastic analysis (see Clause 2.2.2)","notation":"\\Phi","unicode":"\u03a6","value":"","unit":"","undefined":"yes"},{"id":"Ec","prereq":"!Ec","name":"Concrete modulus of elasticity","description":"mean value of the modulus of elasticity of concrete at 28 days","notation":"E_c","unicode":"E_c","value":"","unit":"","undefined":""}]);
var arim = new Arimsys(dat);

rendertables(["name","notation","value"]);
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
			rendertables(["name","notation","value"]);
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
		var val = this.dat({"id":left}).first().value
		return val == right;
	}
}



