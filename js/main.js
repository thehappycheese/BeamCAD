"use strict";
document.title = "Thesis Idea";


///* Project.js
///~ ui/Setup.js



var project = new Project();
var appman = new AppManager();

var app = new testapp();

appman.load(app)




///~ lib/EventDispatcher.js
function AppManager(){
	
	this.currentApp = null;
	this.loadingApp = null;
	this.currentRequest = null;
	
	this.load = (function(app){
		
		if(!this.validateApp(app)){
			throw new Error("app validation failed");
			return;
		}

		this.loadingApp = app;
		var req = new XMLHttpRequest();
			this.currentRequest=req;
			req.timeout = 4000;
			req.ontimeout = function(){throw new Error("appload has failed")};
			req.onreadystatechange = this.apploaded;
			req.open("GET", app.url);
			req.send();
			
		
	}).bind(this);
	
	this.apploaded = (function(e){
		if(e.target.readyState==4){
			if(e.target.status == 200){
				if(this.currentApp!=null){
					this.currentApp.dispatch("unload");
				}
				this.currentApp = this.loadingApp;
				this.loadingApp = null;
				this.currentApp.manager = this;
				this.currentApp.html   = e.target.responseText;
				ui.mainspace.innerHTML = e.target.responseText;
				this.currentApp.ui = domScrobble(ui.mainspace);
				this.currentApp.dispatch("load");
			}
		}
	}).bind(this);
	
	
	this.validateApp = (function(app){
		return (true);
	}).bind(this)
}






function testapp(){
	EventDispatcher.call(this);
	
	this.manager = null;
	this.ui = null;
	
	this.html = "";
	this.url = "app/sectioneditor.htm";
	
	
	this.on("load", (function(){
		console.log("i loaded!");
		console.log(this.ui);
	}).bind(this));
	this.on("unload", (function(){
		
	}).bind(this));
}

function domScrobble(dom,addTo){
	var elems = dom.querySelectorAll("[id]");
	var results = addTo || {};
	
	var i;
	for(i=0;i<elems.length;i++){
		results[elems[i].id] = elems[i];
	}
	return results;
}

