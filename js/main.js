///~ lib/mathjax/MathJax.js?config=TeX-AMS_HTML-full
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js

"use strict";
document.title = "BeamCAD";


var ui = DOMTools.scrobble(document.body);




ui.mainspace.innerHTML = "";


var tab = new nTable(10,7);
ui.mainspace.appendChild(tab.dom);




tab.getCell(0,0).merge(1,Infinity).setValue("GEOMETRY").dom.className = "title";

tab.getCell(2,0).merge(1,Infinity).setValue("Cross Section").dom.className = "subtitle";

tab.getCell(3,0).setValue("Full Geometry known");
tab.getCell(3,4).setValue("Web Width Known");
tab.getCell(4,0).setValue("Web Width Known");




















