///~ lib/mathjax/MathJax.js?config=default
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js
///~ data/Data.js
///* oldMain.js

"use strict";

var mainview = new Mainview(document.body);








var calcblock = new Calcview();
mainview.ui.tab0.appendChild(calcblock.dom);

function Calcview(){
	this.dom = document.createElement("div");
	this.dom.className = "calcblock";
	
	this.topbar = document.createElement("div");
	this.dom.appendChild(this.topbar);
	this.topbar.className = "calcblocktopbar selected"
	this.topbar.appendChild(document.createTextNode("Geometry"));
	
	this.content = document.createElement("div");
	this.dom.appendChild(this.content);
	this.content.className = "calcblockcontent";
	
	
	this.tab = new nTable(10,3);
	this.content.appendChild(this.tab.dom);
	this.tab.getCell(0,0).merge(4,1).setValue("Known Dimentions").dom.className = "heading";
	this.tab.getCell(0,1).setValue("Full geometry known");
	this.tab.getCell(0,2).convertToRadio("aaa");
	
	this.tab.getCell(1,1).setValue("Web breadth known");
	this.tab.getCell(1,2).convertToRadio("aaa");
	
	this.tab.getCell(2,1).setValue("Total depth known");
	this.tab.getCell(2,2).convertToRadio("aaa");
	
	this.tab.getCell(3,1).setValue("Breadth/depth ratio known");
	this.tab.getCell(3,2).convertToRadio("aaa");
	////----------------------------------
	this.tab.getCell(4,0).merge(1,Infinity);
	
	this.tab.getCell(5,0).merge(3,1).setValue("Shape").dom.className = "heading";
	this.tab.getCell(5,1).setValue("T/L Beam");
	this.tab.getCell(5,2).convertToRadio("bbb");
	
	this.tab.getCell(6,1).setValue("Rectangular");
	this.tab.getCell(6,2).convertToRadio("bbb");
	
	this.tab.getCell(7,1).setValue("Free-form");
	this.tab.getCell(7,2).convertToRadio("bbb");
	
}





















function Mainview(dom){
	this.dom = dom;
	this.ui = {};
	this.init = function(){
		this.ui = DOMTools.scrobble(dom);
		this.ui.tabbut0.onmousedown = this.changeTab;
		this.ui.tabbut1.onmousedown = this.changeTab;
		this.ui.tabbut2.onmousedown = this.changeTab;
		this.ui.tabbut3.onmousedown = this.changeTab;
	}.bind(this);
	
	this.changeTab = function(e){
		console.log(e.target.id);
		this.ui.tabbut0.className = "maintab";
		this.ui.tabbut1.className = "maintab";
		this.ui.tabbut2.className = "maintab";
		this.ui.tabbut3.className = "maintab";
		
		this.ui.tab0.style.display = "none";
		this.ui.tab1.style.display = "none";
		this.ui.tab2.style.display = "none";
		this.ui.tab3.style.display = "none";
		
		e.target.className += " selected";
		switch(e.target.id){
			case "tabbut0":
				this.ui.tab0.style.display = "block";
				break;
			case "tabbut1":
				this.ui.tab1.style.display = "block";
				break;
			case "tabbut2":
				this.ui.tab2.style.display = "block";
				break;
			case "tabbut3":
				this.ui.tab3.style.display = "block";
				break;
		}
	}.bind(this);
	
	this.init();
}



