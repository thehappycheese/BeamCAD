///* nCell.js
///* nRange.js

function nTable(r,c){
	
	
	
	this.getCell = function(r,c){
		try{
			return this.cells[r][c];
		}catch(e){
			return undefined;
		}
	}.bind(this);
	
	this.getRange = function(r,c,h,w){
		return new nRange(r,c,h,w,this);
	}.bind(this);
	
	this.init = function(r,c){
		this.cells = [];
		
		var i,j,tmparr,tmpcell;
		
		for(j=0;j<r;j++){
			tmparr = [];
			for(i=0; i<c; i++){
				tmpcell = new nCell(this,j,i);
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
	this.dom.className = "nTable";
	this.init(r,c);
}




