
///~ lib/Events/EventDispatcher.js

/**
@class CalcBlock
@param TitleText {String}
@extends EventDispatcher.js
*/
function CalcBlock() {
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

	/**
	@method loadContent
	@param URL {string}
	*/
	this.loadContent = function (url) {
		var xr = new XMLHttpRequest();
		xr.addEventListener("readystatechange", function (e) {
			if (e.target.readyState === e.target.DONE) {
				if (e.target.status === 200) {
					this.dom_content.innerHTML = e.target.responseText;
					this.dispatch("load");
					MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.dom_content]);
				} else {
					console.log("ContentBlock resource failed to load:  error");
					console.log(e.target);
					this.dispatch("error",e.targt.statusText);
				}
			}
		}.bind(this));
		xr.addEventListener("error", function () {
			console.log("ContentBlock resource failed to load:  error");
			console.log(e.target);
			this.dispatch("error", e.targt.statusText);
		}.bind(this));
		xr.addEventListener("timeout", function (e) {
			console.log("ContentBlock resource failed to load:  timed-out");
			console.log(e.target);
			this.dispatch("error", e.targt.statusText);
		}.bind(this));

		xr.timeout = 4000;
		xr.open("GET", url, true);
		xr.send();
	}.bind(this);

	/**
	@method setInputs
	*/
	this.setInputs = function (e) {

	}.bind(this);
	/**
	@method getOutput
	*/
	this.getOutput = function () {

	}.bind(this);


}