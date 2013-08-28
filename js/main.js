"use strict";

///~ lib/Canvas.js




// ============ RESOURCE LOADER ====================




document.title = "Thesis";



/*var canvas = new Canvas("mainCanvas");

//=============================== EVENTS =============================

canvas.on("mousedown", function(e){
	
});



canvas.on("animate",function(delta){
	
	// ============ UPDATE
	
	
	// ============ DRAW

});


canvas.on("blur",function(){
	
})*/


var f = new ToggleButton();
document.body.appendChild(f.button);


function ToggleButton(){
	this.value = false;
	this.idString = (new Date()).getTime().toString(36);
	
	this.button = document.createElement("div");
	
	this.button.style.width = "24px";
	this.button.style.height = "24px";
	this.button.style.borderRadius = "5px";
	this.button.style.backgroundColor = "#AAAAAA";
	this.button.style.border = "2px outset #CCCCCC";
	
	this.button.addEventListener("mousedown",(function(e){
		this.button.style.borderStyle = "inset";
		this.button.style.backgroundColor = "#BBBBBB";
	}).bind(this));
	
}

