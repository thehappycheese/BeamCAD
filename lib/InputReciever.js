///* EventDispatcher.js

function InputReciever (atarget){
	"use strict";
	
	EventDispatcher.call(this);
	
	this.inputTarget = atarget || window;
	
	this.keysDown = [];	for(var i =0;i<128;i++){this.keysDown.push(false);};
	
	this.mouseX = 0;
	this.mouseY = 0;
	this.mouseDeltaX = 0;
	this.mouseDeltaY = 0;
	this.buttonsDown = [false,false,false,false,false];
	
	
	// ========= KEYBOARD ================
	
	
	this._keyUp = (function(e){
		e.stopPropagation();
		this.keysDown[e.keyCode] = false;
		this.dispatch("keyup",e);
	}).bind(this);
	
	this._keyDown = (function(e){
		e.stopPropagation();
		e.preventDefault();
		// Bar multiple "keydown" events from firing.
		if(this.keysDown[e.keyCode] == false){
			this.keysDown[e.keyCode] = true;
			this.dispatch("keydown",e);
		}
	}).bind(this);
	
	// --- QUERY KEYBOARD
	this.isKeyDown = (function(kcode){
		return this.keysDown[kcode];
	}).bind(this);
	
	
	// ========= MOUSE ================
	
	
	this._mouseUp = (function(e){
		e.stopPropagation();
		this.dispatch("mouseup",e);
		this.buttonsDown[e.button] = false;
	}).bind(this);
	
	this._mouseDown = (function(e){
		e.stopPropagation();
		this.dispatch("mousedown",e);
		if(e.button == 1 || e.button == 2){
			e.preventDefault();
		}
		this.buttonsDown[e.button] = true;
	}).bind(this);
	
	this._mouseMove = (function(e){
		this.mouseX = event.offsetX;
		this.mouseY = event.offsetY;
		this.mouseDeltaX += event.webkitMovementX;
		this.mouseDeltaY += event.webkitMovementY;
	}).bind(this);
	
	this._preventContextMenu = (function(e){
		e.preventDefault();
	}).bind(this);
	
	// --- QUERY MOUSE
	this.isMouseDown = (function(mcode){
		return this.buttonsDown[mcode];
	}).bind(this);
	
	
	
	// ==================  EVENT LISTENERS ===================
	
	this.removeTarget = (function(){
		if(this.inputTarget!=null){
			this.inputTarget.removeEventListener("keyup",   this._keyUp);
			this.inputTarget.removeEventListener("keydown", this._keyDown);
			this.inputTarget.removeEventListener("mouseup",   this._mouseUp);
			this.inputTarget.removeEventListener("mousedown", this._mouseDown);
			this.inputTarget.removeEventListener("mousemove", this._mouseMove);
			this.inputTarget.removeEventListener("contextmenu", this._preventContextMenu);
			this.inputTarget = null;
		}
	}).bind(this);
	
	
	this.setTarget = (function(t){
		this.removeTarget(this.inputTarget);
		this.inputTarget = t;
		this.inputTarget.addEventListener("keyup",   this._keyUp);
		this.inputTarget.addEventListener("keydown", this._keyDown);
		this.inputTarget.addEventListener("mouseup",   this._mouseUp);
		this.inputTarget.addEventListener("mousedown", this._mouseDown);
		this.inputTarget.addEventListener("mousemove", this._mouseMove);
		this.inputTarget.addEventListener("contextmenu", this._preventContextMenu);
	}).bind(this);
	
	
	
	this.setTarget(this.inputTarget);
	
	
}

var KEYS = {

	w		: 87,
	a		: 65,
	s		: 83,
	d		: 68,
	space	: 32,
	enter	: 13,
	up		: 38,
	left	: 37,
	down	: 40,
	right	: 39
}