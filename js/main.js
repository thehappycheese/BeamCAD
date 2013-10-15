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

tab.getCell(1,0).setValues([["Variable","Formula","Value","Unit"]])





















