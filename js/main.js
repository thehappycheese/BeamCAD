///~ lib/mathjax/MathJax.js?config=TeX-AMS_HTML-full
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js

"use strict";
document.title = "BeamCAD";


var ui = DOMTools.scrobble(document.body);




//ui.mainspace.innerHTML = "";


var tab = new calctable();
ui.mainspace.appendChild(tab.dom);









function calc(){

}

function calctable(){
	this.ntable = new nTable(5,5);
	this.dom = this.ntable.dom;
	
	this.ntable.getCell(0,0)
		.setValues([["Name","Notation","Value","Unit","Description"]])
		.setStyles("width",[["40%","2cm","3cm","1cm"]])
		.setDomProperties("className",[["heading","heading","heading","heading","heading"]]);
	
	

}











