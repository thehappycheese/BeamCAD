///~ lib/nDOMTools/DOMTools.scrobble.js

///* viewCalculation.js
///* viewPaperspace.js
///* viewSummary.js
///* viewDatabase.js

/**
@class viewMain
@static
*/


var viewMain = (function viewMain() {
	/**
	@property dom
	*/
	this.dom = document.body;
	/**
	@property ui
	*/
	this.ui = {};

	
	/**
	@event changeTab
	*/
	this.changeTab = function (e) {
		this.ui.tabbut0.className = "maintab";
		this.ui.tabbut1.className = "maintab";
		this.ui.tabbut2.className = "maintab";
		this.ui.tabbut3.className = "maintab";

		this.ui.tab0.style.display = "none";
		this.ui.tab1.style.display = "none";
		this.ui.tab2.style.display = "none";
		this.ui.tab3.style.display = "none";

		e.target.className += " selected";
		switch (e.target.id) {
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
	/**
	Initialises the static class.
	@method init
	*/
	this.init = function () {
		// Find UI elements
		this.ui = DOMTools.scrobble(dom);
		// Assign change tab events
		this.ui.tabbut0.onmousedown = this.changeTab;
		this.ui.tabbut1.onmousedown = this.changeTab;
		this.ui.tabbut2.onmousedown = this.changeTab;
		this.ui.tabbut3.onmousedown = this.changeTab;
	}.bind(this);
	this.init();
})();