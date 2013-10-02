///~ lib/TapDidgit.js

"use strict";
document.title = "BeamCAD";

var eq1 = "sin(x)";
var eq2 = "5*(10+x) + sin(30 + (40-x))/2";


var parser = new TapDigit.Parser()
var tree = parser.parse(eq1);

console.log(tree);









