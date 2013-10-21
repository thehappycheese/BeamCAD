///~ lib/nDOMTools/DOMTools.getUniqueId.js

function nCell(tbl,r,c){
	
	this.row = r;
	this.column = c;
	
	this.obscured = false;
	
	this.getValue = function(){
		return this.value;
	}.bind(this);
	this.setValue = function(newval){
		this.value = newval;
		if(newval==="" || newval === " "){
			newval = "&nbsp;"
		}
		this.dom.innerHTML = newval;
		// TODO: onchange event
		return this;
	}.bind(this);
	this.setValues = function(arr){
		var rows = arr.length;
		var columns = arr[0].length;
		var r, c, tmpcell;
		for(r=0;r<rows;r++){
			for(c=0;c<columns;c++){
				tmpcell = this.table.getCell(this.row+r, this.column+c);
				if(tmpcell!=undefined){
					tmpcell.setValue(arr[r][c]);
				}
			}
		}
		return this;
	}.bind(this);
	this.setStyles = function(stylename,arr){
		var rows = arr.length;
		var columns = arr[0].length;
		var r, c, tmpcell;
		for(r=0;r<rows;r++){
			for(c=0;c<columns;c++){
				tmpcell = this.table.getCell(this.row+r, this.column+c);
				if(tmpcell!=undefined){
					tmpcell.dom.style[stylename]=arr[r][c];
				}
			}
		}
		return this;
	}.bind(this);
	this.setDomProperties = function(property,arr){
		var rows = arr.length;
		var columns = arr[0].length;
		var r, c, tmpcell;
		for(r=0;r<rows;r++){
			for(c=0;c<columns;c++){
				tmpcell = this.table.getCell(this.row+r, this.column+c);
				if(tmpcell!=undefined){
					tmpcell.dom[property]=arr[r][c];
				}
			}
		}
		return this;
	}.bind(this);
	
	this.merge = function(h,w){
		if(w<=0 || h<=0){
			throw new Error("Merge function must have positive non-zero integers");
			return;
		}
		if(this.obscured==true){
			throw new Error("Cannot merge obscured cell");
			return;
		}
		w = Math.min(w,this.table.getWidth()-this.column);
		h = Math.min(h,this.table.getHeight()-this.row);
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
		return this;
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
		return this
	}.bind(this);
	
	
	
	
	
	
	
	
	this.convertToInput = function(){
		this.dom.innerHTML = "";
		var input = document.createElement("input");
		input.type = "text";
		input.value = this.value;
		var inputChange = function(){
			this.value = input.value;
			// TODO: onchange event src = user
		}.bind(this);
		input.addEventListener("keyup",inputChange);
		input.addEventListener("change",inputChange);
		this.setValue = function(newval){
			input.value = newval;
			this.value = newval;
			// TODO: onchange event
			return this;
		}.bind(this);
		this.getValue = function(newval){
			this.value = input.value;
			return this.value;
		}.bind(this);
		
		this.dom.appendChild(input);
		return this;
	}.bind(this);
	
	this.convertToMathJax = function(){
		this.dom.innerHTML = "";
		this.dom.id = DOMTools.getUniqueId();
		this.setValue = function(newval){
			this.dom.innerHTML = "$${"+newval+"}$$";
			this.value = newval;
			MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.dom.id]);
			
			return this;
		}.bind(this);
		this.getValue = function(newval){
			return this.value;
		}.bind(this);
		this.setValue(this.value);
		return this;
	}.bind(this);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	this.getLeft	= function(){return this.table.getCell(this.row		,this.column-1);}.bind(this);
	this.getRight	= function(){return this.table.getCell(this.row		,this.column+1);}.bind(this);
	this.getUp		= function(){return this.table.getCell(this.row-1	,this.column);}.bind(this);
	this.getDown	= function(){return this.table.getCell(this.row+1	,this.column);}.bind(this);
	
	
	this.table = tbl;
	this.value = "";
	this.dom = document.createElement("td");
	
	this.setValue("");
}