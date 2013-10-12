///~ lib/mathjax/MathJax.js?config=TeX-AMS_HTML-full
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js

"use strict";
document.title = "BeamCAD";


var ui = DOMTools.scrobble(document.body);




ui.mainspace.innerHTML = "";


var tab = new nTable(5,10);
ui.mainspace.appendChild(tab.dom);

























