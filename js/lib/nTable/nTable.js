///* nCell.js
///* nRange.js

/**
@module tables
@class nTable
@class nRange
@class nCell
*/

/**
@class nTable
@constructor
@param r {int} The number of rows
@param c {int} The number of columns
@requires nCell
*/
function nTable(r,c){
	
	
	/**
	@method getCell
	@param r {int} The row of the cell, zero based.
	@param c {int} The column of the cell, zero based.
	@returns {nCell} The nCell object that is stored internally in the cells array
	*/
	this.getCell = function(r,c){
		try{
			return this.cells[r][c];
		}catch(e){
			return undefined;
		}
	}.bind(this);

	/**
	@method getRange
	@param r {int} The row of the top left cell, zero based.
	@param c {int} The column of the top left cell, zero based.
	@param height {int} Height of the range (minimum of 1).
	@param width {int} Width of the range (minimum of 1).
	@returns {nRange} A new nRange object.
	*/
	this.getRange = function(r,c,h,w){
		return new nRange(r,c,h,w,this);
	}.bind(this);
	/**
	This method is called internally when the class is constructed. It can be called again at any time empty and resize the table.
	@method init
	@param row {int} The new number of rows.
	@param column {int} The new number of columns.
	*/
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
	/**
	This method is called internally after the cells array is filled. This function generates the dom required to display the array and appends it to the dom property.
	At present this function redraws the entire table from scratch which is expensive.
	@method renderTable
	*/
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
	/**
	@method getWidth
	@returns {int} The width of the table
	*/
	this.getWidth = function(){
		return this.cells[0].length;
	}.bind(this);
	/**
	@method getHeight
	@returns {int} The height of the table
	*/
	this.getHeight = function(){
		return this.cells.length;
	}.bind(this);
	
	/**
	This is the internal storage of the nCells objects displayed by the nTable class.
	@property cells
	@type Array
	*/
	this.cells = [];
	/**
	This is the element that needs to be added to the DOM once the nTable class has been initialised.
	@example
		var t = new nTable(5,5);
		document.body.appendChild(t.dom);
	@property dom
	@type HTMLTableElement
	*/
	this.dom = document.createElement("table");
	/**
	Note that by default, the className of the table .dom property is set to "nTable".
	*/
	this.dom.className = "nTable";
	this.init(r,c);
}




