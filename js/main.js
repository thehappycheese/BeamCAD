///~ nick/DOMTools.js
///~ nick/nTable/nTable.js
///~ EditorDiv.js
///* bcad.js



"use strict";




var ui = DOMTools.scrobble(document.body);



// ==== Setup TABS ==============================================

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




// ==== Create a collapsable calcblock and set up a manager for it =========

var calcManager = new (function(){
	this.dom = ui.tab0;
	this.editordivs = [];
	
	this.closeEditorDiv = function(ed){
		for(var i=0;i<this.editordivs.length;i++){
			if(this.editordivs[i] === ed){
				this.editordivs.splice(i,1);
				console.log("closeed EditorDiv" +i);
				break;
			}
		}
		this.render();
	}.bind(this);
	
	this.render = function(){
		this.dom.innerHTML = "";
		for(var i=0;i<this.editordivs.length;i++){
			this.dom.appendChild(this.editordivs[i].dom);
		}
	}.bind(this);
	
})();









var ediv = new EditorDiv(calcManager);
calcManager.editordivs.push(ediv);
calcManager.render();






function Calc(t) {
	this.title = 
	this.target = t;
	this.lines = [];
	
	
	this.render = function(){
		this.target.innerHTML = "";
		this.lines.forEach(function(l){
			this.target.appendChild(this.target);
		});
	}
}
function CalcLine(){
	this.dom = document.createElement("div");
}








