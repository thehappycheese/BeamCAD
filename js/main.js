"use strict";

///~ ui/ToggleButton.js




// ============ RESOURCE LOADER ====================




document.title = "Thesis Idea";


var ui = {};

ui.topBar = document.getElementById("topbar");
ui.bottomBar = document.getElementById("bottombar");
ui.leftBar = document.getElementById("leftbar");
ui.mainspace = document.getElementById("mainspace");






ui.leftBar.appendChild((new ToggleButton("img/icons0.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons1.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons2.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons3.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons4.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons5.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons6.png")).button);
ui.leftBar.appendChild((new ToggleButton("img/icons7.png")).button);


