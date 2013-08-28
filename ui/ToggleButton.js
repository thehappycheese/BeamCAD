function ToggleButton(img){
	
	this.img = img;
	this.value = false;
	this.idString = (new Date()).getTime().toString(36);
	

	
	this.col = "#BBBBBB";
	this.colChecked = "#DDDDDD";
	this.colMouseOver = "#EEEEEE";
	this.mouseIsOver = false;
	
	
	
	this.button = document.createElement("div");
	this.button.style.width = "32px";
	this.button.style.height = "32px";
	this.button.style.borderRadius = "5px";
	this.button.style.backgroundImage = "url("+this.img+")";
	this.button.style.float = "left";
	this.button.style.margin = "2px";
	
	
	this.button.addEventListener("mousedown",(function(e){
		this.value = !this.value;
		this.updateStyles();
	}).bind(this));
	
	this.button.addEventListener("mouseover",(function(e){
		this.mouseIsOver = true;
		this.updateStyles();
	}).bind(this));
	
	this.button.addEventListener("mouseout",(function(e){
		this.mouseIsOver = false;
		this.updateStyles();
	}).bind(this));
	
	
	
	
	this.updateStyles = (function(){
		if(this.value==true){
			this.button.style.backgroundColor = this.colChecked;
			this.button.style.border = "2px inset #CCCCCC";
		}else{
			this.button.style.backgroundColor = this.col;
			this.button.style.border = "2px outset #CCCCCC";
		}
		if(this.mouseIsOver){
			this.button.style.backgroundColor = this.colMouseOver;
		}
		
	}).bind(this);
	
	
	
	
	this.updateStyles();
}

