///~ lib/DOMTools/DOMTools.scrobble.js
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

var cb = new CalcBlock("Exposure Classification");
ui.tab0.appendChild(cb.dom);




///~ lib/Events/EventDispatcher.js

/**
@class CalcBlock
@param TitleText {String}
@extends EventDispatcher.js
*/
function CalcBlock(Title) {
	//Mixin EventDispatcher
	EventDispatcher.call(this);
	this.title = Title
	
	this.dom_minimizebutton = document.createElement("div");
	this.dom_minimizebutton.className = "minbut";
	this.dom_closebutton = document.createElement("div");
	this.dom_closebutton.className = "closebut";


	this.dom_titlebar = document.createElement("div");
	this.dom_titlebar.className = "titlebar";
	this.dom_titlebar.appendChild(this.dom_closebutton);
	this.dom_titlebar.appendChild(this.dom_minimizebutton);
	this.dom_titlebar.appendChild(document.createTextNode(this.title));

	this.dom_content = document.createElement("div");
	this.dom_content.className = "content";


	this.dom = document.createElement("div");
	this.dom.className = "calcblock";
	this.dom.appendChild(this.dom_titlebar);
	this.dom.appendChild(this.dom_content);

}









