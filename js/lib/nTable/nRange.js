





/**
@class nRange
@constructor
@param row {int} The row of the top left cell of the new nRange.
@param column {int} The column of the top left cell of the nRange.
@param height {int} The height of the nRange in rows.
@param width {int} The width of the nRange in rows.
@param ntable {nTable} The nTable instance from which this nRange object was derived.
*/
function nRange(r,c,h,w,table){
	
	/**
	The row of the top left cell of the new nRange.
	@property row
	*/
	this.row = r;
	/**
	The column of the top left cell of the new nRange.
	@property col
	*/
	this.col = c;
	/**
	The height of the nRange in rows.
	@property rowsize
	*/
	this.rowsize = h;
	/**
	The width of the nRange in columns.
	@property colsize
	*/
	this.colsize = w;
	/**
	The table attached to this nRange object
	@property table
	*/
	this.table = table;
	
	
	/**
	This will set the value of all nCell instances within the nRange by calling the nCell.setValue() function
	@method setValue
	@param Value {Any} This value should be relevant to the nCell mode
	*/
	this.setValue = function(val){
		this.forEach(function(c){c.setValue(val)});
	}.bind(this);
	
	/**
	This can be used to change a specified property of all cells in the range to a specified value.
	@method setProperties
	@param PropertyAddress {Array of Strings} The nCell property to set eg: ["dom","style","color"]
	@param Value {Any}
	@example
		range.setProperties(["dom","style","width"],"50px");
	*/
	this.setProperties = function(prop,value){
		this.forEach(function(c){
			var i, obj;
			obj = c;
			for(i=0;i<prop.length-1;i++){
				obj = obj[prop[i]];
			}
			obj[prop[prop.length-1]] = value;
		});
	}.bind(this);
	/**
	Attempt to merge the range.
	@method merge
	*/
	this.merge = function(){
		var basecell = this.table.getCell(this.row,this.column);
		basecell.merge(this.rowsize,this.colsize);
	}.bind(this);
	/**
	Unmerge all cells within the range.
	@method merge
	*/
	this.unmerge = function(){
		this.forEach(function(c){c.unmerge();});
	}.bind(this);
	/**
	Execute a function on each cell in the nRange
	@method forEach
	@example
		var tab = new nTable(5,5);
		var range = new tab.getRange(1,1,2,2);
		range.forEach(function(c){
			console.log(c.getValue());
		});
	*/
	this.forEach = function(f){
		var rr, cc;
		for(rr=this.row;rr<this.row+this.rowsize;rr++){
			for(cc=this.col; cc<this.col+this.colsize;cc++){
				f(this.table.getCell(rr,cc));
			}
		}
	}
	
	
	
	
	
}