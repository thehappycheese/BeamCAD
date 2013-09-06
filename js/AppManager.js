///~ lib/EventDispatcher.js
///~ lib/dom_utilities.js
///* nTable.js

function AppManager(){
	
	this.currentApp = null;
	this.loadingApp = null;
	this.currentRequest = null;
	
	this.load = (function(app){
		


		this.loadingApp = new app(this);
		
		var req = new XMLHttpRequest();
			this.currentRequest=req;
			req.timeout = 4000;
			req.ontimeout = function(){throw new Error("Loading an application has failed D: "+this.loadingApp.constructor.name)};
			req.onreadystatechange = this.apploaded;
			req.open("GET", this.loadingApp.url);
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
				this.currentApp.html   = e.target.responseText;
				ui.mainspace.innerHTML = e.target.responseText;
				this.currentApp.ui = domScrobble(ui.mainspace);
				this.currentApp.dispatch("load");
			}
		}
	}).bind(this);
}














