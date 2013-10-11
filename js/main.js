///~ mathjax/MathJax.js?config=TeX-AMS_HTML-full
///~ lib/dom_utilities.js

"use strict";
document.title = "BeamCAD";


var ui = domScrobble(document.body);




ui.mainspace.innerHTML="";

var tab = new vTable(5,10);

ui.mainspace.appendChild(tab.dom);









function vTable(c,r){
	
	
	
	this.getCell = function(r,c){
		return this.cells[r][c];
	}.bind(this);
	
	
	
	this.init = function(c,r){
		this.cells = [];
		
		var i,j,tmparr,tmpcell;
		
		for(j=0;j<r;j++){
			tmparr = [];
			for(i=0; i<c; i++){
				tmpcell = new vCell(this,j,i);
				tmparr.push(tmpcell);
			}
			this.cells.push(tmparr);
		}
		this.renderTable();
	}.bind(this)
	
	this.renderTable = function(){
		var i,j,tmprow;
		this.dom.innerHTML = "";
		for(j=0;j<this.cells.length;j++){
			
			tmprow = document.createElement("tr");
			
			for(i=0; i<this.cells[j].length; i++){

				if(this.cells[j][i].obscured==false){
					tmprow.appendChild(this.cells[j][i].dom);
				}
			
			}
			
			this.dom.appendChild(tmprow);
		
		}
	}.bind(this)
	
	this.getWidth = function(){
		return this.cells[0].length;
	}.bind(this);
	this.getHeight = function(){
		return this.cells.length;
	}.bind(this);
	
	this.cells = [];
	this.dom = document.createElement("table");	
	this.dom.className = "vTable";
	this.init(c,r);
}




function vCell(tbl,r,c){
	
	this.row = r;
	this.column = c;
	
	this.obscured = false;
	
	this.getValue = function(){
		return this.value;
	}.bind(this);
	this.setValue = function(newval){
		this.value = newval;
		this.dom.innerHTML = newval;
	}.bind(this);
	
	this.merge = function(w,h){
		if(w==0 || h==0){
			throw new Error("Merge function must have positive non-zero integers");
			return;
		}
		if(w+this.column>this.table.getWidth() || h+this.row>this.table.getHeight()){
			throw new Error("Cannot Merge out of table bounds");
			return;
		}
		if(this.obscured==true){
			throw new Error("Cannot merge obscured cell");
			return;
		}
		this.unmerge();
		var i, j;
		for(j=this.row;j<h+this.row;j++){
			for(i=this.column;i<w+this.column;i++){
				if(this.row==j && this.column==i){
					continue;
				}else{
					
					this.table.getCell(j,i).obscured = true;
				}
			}
		}
		this.dom.rowSpan = h;
		this.dom.colSpan = w;
		this.table.renderTable();
	}.bind(this);
	
	this.unmerge = function(){
		if(this.obscured==true){
			throw new Error("Cannot unmerge obscured cell");
			return
		}
		var i, j;
		var w = this.dom.colSpan;
		var h = this.dom.rowSpan;
		for(j=this.row;j<h+this.row;j++){
			for(i=this.column;i<w+this.column;i++){
				if(this.row==j && this.column==i){
					continue;
				}else{
					this.table.getCell(j,i).obscured = false;
				}
			}
		}
		this.dom.rowSpan = 1;
		this.dom.colSpan = 1;
		this.table.renderTable();
	}.bind(this);
	
	this.getLeft	= function(){return this.table.getCell(this.r-1,this.c);}.bind(this);
	this.getRight	= function(){return this.table.getCell(this.r+1,this.c);}.bind(this);
	this.getUp		= function(){return this.table.getCell(this.r  ,this.c-1);}.bind(this);
	this.getDown	= function(){return this.table.getCell(this.r  ,this.c+1);}.bind(this);
	
	
	this.table = tbl;
	this.value = "";
	this.dom = document.createElement("td");
	
	this.setValue("narf");
}















