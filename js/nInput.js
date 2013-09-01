function nInput(type, x, y){
	
	this.type = type;
	this.x = x;
	this.y = y;
	
	this.dom = document.createElement("input");
	this.dom.type = "text";
	this.dom.required = true;
	
	switch(type){
		case "float":
			this.dom.pattern = "[-+]?[0-9]*\.?[0-9]*";
			break;
		case "ufloat":
			this.dom.pattern = "[0-9]*\.?[0-9]*";
			break;
		case "bool":
			this.dom.type = "checkbox";
			break;
		case "int":
			this.dom.pattern = "[0-9]*";
			break;
		case "uint":
			this.dom.pattern = "[-+]?[0-9]*";
			break;
	}
	
	
	this.__defineGetter__("isValid", (function(){
		return dom.validity;
	}).bind(this));
	
	
	this.__defineGetter__("value", (function(){
		switch(type){
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
		switch(type){
			case "float":
				this.dom.value = newVal;
				break;
			case "ufloat":
				this.dom.value = Math.abs(newVal);
				break;
			case "bool":
				this.dom.checked = newVal;
			case "int":
				this.dom.value = newVal.toFixed(0);
			case "uint":
				this.dom.value = Math.abs(newVal).toFixed(0);
		}
	}).bind(this));
	
}