///~ lib/DOMTools/DOMTools.scrobble.js
///~ ui/CalcBlock.js
///* bcad.js
"use strict";
// Setup initial events:

var ui = DOMTools.scrobble(document.body);
ui.tabbut0.onmousedown = this.changeTab;
ui.tabbut1.onmousedown = this.changeTab;
ui.tabbut2.onmousedown = this.changeTab;
ui.tabbut3.onmousedown = this.changeTab;
function changeTab(e) {
	ui.tabbut0.className = "maintab";
	ui.tabbut1.className = "maintab";
	ui.tabbut2.className = "maintab";
	ui.tabbut3.className = "maintab";

	ui.tab0.style.display = "none";
	ui.tab1.style.display = "none";
	ui.tab2.style.display = "none";
	ui.tab3.style.display = "none";

	e.target.className += " selected";
	switch (e.target.id) {
		case "tabbut0":
			ui.tab0.style.display = "block";
			break;
		case "tabbut1":
			ui.tab1.style.display = "block";
			break;
		case "tabbut2":
			ui.tab2.style.display = "block";
			break;
		case "tabbut3":
			ui.tab3.style.display = "block";
			break;
	}
}


// Create instance of calcblock and add it to the 

var cbDI = new cbDesignIntent();
var cbBS = new cbBeamShape();
var cbEC = new cbExposureClassifictaion();
var cbCS = new cbConcreteStrength();
//ui.tab0.appendChild(cbDI.dom);
ui.tab0.appendChild(cbBS.dom);
ui.tab0.appendChild(cbEC.dom);
ui.tab0.appendChild(cbCS.dom);

/**
@class cbDesignIntent
@extends CalcBlock
@constructor
*/
function cbDesignIntent() {
	CalcBlock.call(this);
	this.setTitle("Design Intent");
	this.loadContent("partials/cbDesignIntent.html");
	



}

function cbExposureClassifictaion() {
	CalcBlock.call(this);
	this.setTitle("Exposure Classification");
}
function cbConcreteStrength() {
	CalcBlock.call(this);
	this.setTitle("Concrete Strength");
}
function cbBeamShape() {
	CalcBlock.call(this);
	this.setTitle("Beam Shape");
	this.loadContent("partials/cbBeamShape.html");
	
}












