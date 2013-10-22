///~ lib/mathjax/MathJax.js?config=default
///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js
///~ data/Data.js

"use strict";


var ui = DOMTools.scrobble(document.body);




var mainview = new view(document.body);




function view(dom){
	this.dom = dom;
	this.ui = {};
	this.init = function(){
		this.ui = DOMTools.scrobble(dom);
		this.ui.tabbut0.onclick = this.changeTab;
		this.ui.tabbut1.onclick = this.changeTab;
		this.ui.tabbut2.onclick = this.changeTab;
		this.ui.tabbut3.onclick = this.changeTab;
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



