///* EventDispatcher.js
///* InputReciever.js

function Canvas(acanvasID){
	"use strict";
	
	
	this.canvas = window.document.getElementById(acanvasID);
	this.canvas.tabIndex = 6969;
	this.canvas.focus();
	this.ctx = this.canvas.getContext("2d");
	
	this.paused = false;
	this.hasFocus = true;
	
	this.currentTime = (new Date()).getTime();
	this.previousTime = this.currentTime;
	// =========== GETTER SETTERS ================
	
	this.__defineGetter__("width", (function(){
		return this.canvas.width;
	}).bind(this));
	this.__defineSetter__("width", (function(i){
		this.canvas.width = i;
	}).bind(this));
	
	this.__defineGetter__("height", (function(){
		return this.canvas.height;
	}).bind(this));
	this.__defineSetter__("height", (function(i){
		this.canvas.height = i;
	}).bind(this));
	
	this.setSize = (function(w,h){
		this.width = w;
		this.height = h;
	}).bind(this);
	// ============  FUNCTIONS  =======================
	
	/*this.fillContainer = (function(){
		
		var container = this.canvas.parentNode;
		
		this.canvas.style.width = "0";
		this.canvas.style.height = "0";
		
		var contStyle = getComputedStyle(container);
		
		var aw = parseFloat(contStyle.width);
		var ah = parseFloat(contStyle.height);
		
		if(aw/this.aspectRatio > ah){
			// aw is used to get ah, the height would be too much too fit; use ah to get aw
			aw = ah*this.aspectRatio;
		}else{
			ah = aw/this.aspectRatio;
		}
		
		this.canvas.width = 1000;
		this.canvas.height = 700;
		
		this.canvas.style.width = this.canvas.width.toFixed(0)+"px";
		this.canvas.style.height = this.canvas.height.toFixed(0)+"px";
		
		this.dispatch("resize",{w:aw,h:ah});
		
	}).bind(this);*/
	
	
	
	this.toggleFullscreen = (function(){
		var elem = this.canvas;
		if(window.document.webkitFullscreenElement === elem){
			window.document.webkitExitFullscreen();
		}else{
			elem.webkitRequestFullscreen()
			elem.webkitRequestPointerLock();
		}
	}).bind(this);
	
	
	
	this.clear = (function(){
		this.ctx.clearRect(0, 0, this.width, this.height);
	}).bind(this);
	
	
	
	this.animate = (function(){
		if(this.paused == false  &&  this.hasFocus == true){
			this.currentTime = (new Date()).getTime();
			var delta = (this.currentTime - this.previousTime);
			
			if(delta > (1000/20)){
				delta = 20;
			}
			
			this.dispatch("animate", delta);
			
			this.mouseDeltaX = 0;
			this.mouseDeltaY = 0;
			
			
			this.previousTime = this.currentTime;
		}
		window.requestAnimationFrame(this.animate);
	}).bind(this);
	
	
	
	// ======= EVENT LISTENERS =================
	
	this.canvas.addEventListener("blur",(function(e){
		if(this.hasFocus == true){
		
			this.ctx.fillStyle = "rgba(0,0,0,0.5)";
			this.ctx.fillRect(this.width*0.02,this.height*0.02, this.width*0.96, this.height*0.96);
			this.ctx.fillStyle = "yellow";
			this.ctx.font = "13px sans-serif"
			this.ctx.textAlign = "center";
			this.ctx.textBaseLine = "middle";
			this.ctx.fillText("CLICK HERE", this.width/2, this.height/2);
			
			
			this.dispatch("blur");
			this.hasFocus = false;
		}
	}).bind(this));
	
	
	this.canvas.addEventListener("focus",(function(e){
		if(this.hasFocus == false){
			this.dispatch("focus");
			this.hasFocus = true;
		}
	}).bind(this));	
	
	
	
	// == INIT CALLS ==
	EventDispatcher.call(this);
	InputReciever.call(this,this.canvas);
	//this.fillContainer();
	window.requestAnimationFrame(this.animate);
}