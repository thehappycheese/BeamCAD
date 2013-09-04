"use strict";
///~ lib/EventDispatcher.js
///~ lib/KEYS.js

function nInput(type){
	EventDispatcher.call(this);
	
	// ===================== CONSTRUCTOR ===============
	this.oldvalue = this.value;
	
	this.type = type;
	
	this.dom = document.createElement("input");
	if(this.type=="bool"){
		this.dom.type = "checkbox";
	}else{
		this.dom.type = "text";
	}
	this.dom.required = true;
	
	/*switch(this.type){
		case "float":
			this.dom.pattern = "[-+]?[0-9]*\\.?[0-9]*";
			break;
		case "ufloat":
			this.dom.pattern = "[0-9]*\\.?[0-9]*";
			break;
		case "bool":
			this.dom.type = "checkbox";
			break;
		case "int":
			this.dom.pattern = "[-+]?[0-9]*";
			break;
		case "uint":
			this.dom.pattern = "[0-9]*";
			break;
	}*/
	
	
	this.__defineGetter__("valid",(function(){
		if(this.type == "bool" || this.type == "text"){
			return true;
		}
		var value = this.dom.value;
		var positive = true;
		var isint = false;
		if(value.substring(0,1)=="+"){
			value = value.substring(1,Infinity);
		}
		if(value.substring(0,1)=="-"){
			value = value.substring(1,Infinity);
			positive = false;
		}
		value = parseFloat(value);
		isint = (value == Math.floor(value))
		
		switch(this.type){
			case "uint":
				return !isNaN(value) && isint && positive;
				break;
			case "int":
				return !isNaN(value) && isint;
				break;
			case "ufloat":
				return !isNaN(value) && positive;
				break;
			case "float":
				return !isNaN(value);
				break;
		}
		
	}).bind(this));
	
	
	// ===================== KEYDOWN EVENT ===============
	this.dom.onkeydown = (function(e){
		if(e.keyCode == KEYS.left){
			if(this.dom.type=="checkbox" || (this.dom.selectionStart == 0 && this.dom.selectionEnd == 0)){
				e.direction = "left"
				this.dispatch("exit",e);
			}
		}
		if(e.keyCode == KEYS.right){ 
			if(this.dom.type=="checkbox" || (this.dom.selectionStart == this.dom.value.length && this.dom.selectionEnd == this.dom.value.length)){
				e.direction = "right";
				this.dispatch("exit",e);
			}
		}
		if(this.dom.type=="checkbox" || (this.dom.selectionStart == this.dom.selectionEnd)){
			if(e.keyCode == KEYS.up){
				e.direction = "up";
				this.dispatch("exit",e);
			}
			if(e.keyCode == KEYS.down){
				e.direction = "down";
				this.dispatch("exit",e);
			}
		}
		
		
	}).bind(this);
	
	this.dom.onkeyup = (function(e){
		if(this.oldvalue !== this.value){
			this.dom.setCustomValidity((this.valid)?"":"invalid!");
			this.dispatch("change");
		}
	}).bind(this);

	
	this.__defineGetter__("isValid", (function(){
		return dom.validity;
	}).bind(this));
	
	
	this.__defineGetter__("value", (function(){
		switch(this.type){
			case "float":
				return parseFloat(this.dom.value);
			case "ufloat":
				return parseFloat(this.dom.value);
			case "bool":
				return this.dom.checked;
			case "int":
				return parseInt(this.dom.value);
			case "uint":
				return parseInt(this.dom.value);
		}
	}).bind(this));
	
	
	this.__defineSetter__("value", (function(newVal){
		if(newVal === undefined || isNaN(newVal) || newVal === ""){
			this.dom.value = "";
			return;
		}
		switch(this.type){
			case "float":
				this.dom.value = newVal;
				break;
			case "ufloat":
				this.dom.value = Math.abs(newVal);
				break;
			case "bool":
				this.dom.checked = newVal;
				break;
			case "int":
				this.dom.value = newVal.toFixed(0);
				break;
			case "uint":
				this.dom.value = Math.abs(newVal).toFixed(0);
				break;
		}
	}).bind(this));
	
}