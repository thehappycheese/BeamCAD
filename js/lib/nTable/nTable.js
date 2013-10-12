///* nCell.js

function nTable(c,r){
	
	
	
	this.getCell = function(r,c){
		return this.cells[r][c];
	}.bind(this);
	
	
	
	this.init = function(c,r){
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
	this.dom.className = "vTable";
	this.init(c,r);
}




