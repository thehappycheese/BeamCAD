///~ lib/EventDispatcher.js
///~ lib/dom_utilities.js
///* InputTable.js

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
	
	this.inputTable = new NodeTable();
	
	
	this.on("load", (function(){
		console.log("Testapp loaded");
		console.log(this.ui);
		ui.mainspace.appendChild(this.inputTable.dom)
	}).bind(this));
	
	this.on("unload", (function(){
		
	}).bind(this));
}


function NodeTable(){

	

	this.name = "Nodes";
	this.columns = [];
	this.columns.push({name:"ID", 		type:"number"});
	this.columns.push({name:"X (mm)", 	type:"number"});
	this.columns.push({name:"Y (mm)", 	type:"number"});
	this.columns.push({name:"Fix X", 	type:"checkbox"});
	this.columns.push({name:"Fix Y", 	type:"checkbox"});
	this.columns.push({name:"Fix &theta;", type:"checkbox"});
	
	this.validate
	
	InputTable.call(this);
}

function Node(){
	this.x = 0;
	this.y = 0;
	this.fx = false;
	this.fy = false;
	this.fr = false;
}


