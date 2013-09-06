"use strict";
document.title = "BeamCAD";


///* Project.js
///* AppManager.js
///* beamcad.js
///~ ui/Setup.js
///~ lib/sylvester/sylvester.js

///~ app/app_structural_analysis.js
///~ app/app_beam_design.js





var project = new Project();
var appman = new AppManager();

var app = new app_beam_design();

appman.load(app)








