///~ nick/DOMTools.js
///~ nick/events/EventDispatcher.js

/**
@class CalcBlock
@param TitleText {String}
@extends EventDispatcher.js
*/
function EditorDiv(manager) {
	this.id = DOMTools.getUniqueId();
	this.manager = manager;
	
	
	// ==== Mixin EventDispatcher ====
	EventDispatcher.call(this);
	
	

	// ==== Build UI ====
	this._title = "untitled";

	this.dom_minimizebutton = document.createElement("div");
	this.dom_minimizebutton.className = "minbut";
	this.dom_closebutton = document.createElement("div");
	this.dom_closebutton.className = "closebut";


	this.dom_titlebar = document.createElement("div");
	this.dom_titlebar.className = "titlebar selected";
	this.dom_titlebar.appendChild(this.dom_closebutton);
	this.dom_titlebar.appendChild(this.dom_minimizebutton);

	this.dom_titletext = document.createElement("div");
	this.dom_titletext.className = "titletext"
	this.dom_titletext.innerHTML = this._title;
	this.dom_titlebar.appendChild(this.dom_titletext);

	this.dom_content = document.createElement("div");
	this.dom_content.className = "content";
	this.dom_content.style.display = "block";

	this.dom = document.createElement("div");
	this.dom.className = "calcblock";
	this.dom.appendChild(this.dom_titlebar);
	this.dom.appendChild(this.dom_content);

	// ==== EVENT LISTENERS ====
	this.dom_minimizebutton.addEventListener("mousedown", function (e) {
		if (this.dom_content.style.display === "block") {
			this.dom_content.style.display = "none";
			this.dom_titlebar.className = "titlebar";
			this.dispatch("minimise", e);
		} else {
			this.dom_content.style.display = "block"
			this.dom_titlebar.className = "titlebar selected";
			this.dispatch("maximise", e);
		}
	}.bind(this));

	this.dom_closebutton.addEventListener("mousedown", function (e) {
		this.dispatch("close", e);
		this.manager.closeEditorDiv(this);
	}.bind(this));


	// ==== METHODS ====

	/**
	@method setTitle
	@param newValue {String}
	*/
	this.setTitle = function (newval) {
		this._title = newval;
		this.dom_titletext.innerHTML = newval;
	}.bind(this);

	

}