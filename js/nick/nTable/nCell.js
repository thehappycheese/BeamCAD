///~ nick/DOMTools.js


/**
@class nCell
@constructor
@param Table {nTable} The table to which the cell will belong.
@param Row {int} The row of the cell.
@param Column {int} The column of the cell.
*/
function nCell(tbl,r,c){
	/**
	The row nCell.
	@property row
	*/
	this.row = r;
	/**
	The column of the nCell.
	@property column
	*/
	this.col = c;
	/**
	Indicates that the cell is obscured due to merging.
	@property obscured
	*/
	this.obscured = false;
	/**
	@method getValue
	*/
	this.getValue = function(){
		return this.value;
	}.bind(this);
	/**
	@method setValue
	@param NewValue {Any}
	*/
	this.setValue = function(newval){
		this.value = newval;
		if(newval==="" || newval === " "){
			newval = "&nbsp;"
		}
		this.dom.innerHTML = newval;
		// TODO: onchange event
		return this;
	}.bind(this);
	/**
	Attempt to merge this nCell with those to the bottom left of it. Merging will throw an error if the cell is obscured.
	@method merge
	@param height
	@param width
	*/
	this.merge = function(h,w){
		if(w<=0 || h<=0){
			throw new Error("Merge function must have positive non-zero integers");
			return;
		}
		if(this.obscured==true){
			throw new Error("Cannot merge obscured cell");
			return;
		}
		w = Math.min(w,this.table.getWidth()-this.col);
		h = Math.min(h,this.table.getHeight()-this.row);
		this.unmerge();
		var i, j;
		for(j=this.row;j<h+this.row;j++){
			for(i=this.col;i<w+this.col;i++){
				if(this.row==j && this.col==i){
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
	/**
	Attempt to unmerge this nCell. Un-merging will throw an error if the cell is obscured.
	@method unmerge
	*/
	this.unmerge = function(){
		if(this.obscured==true){
			throw new Error("Cannot unmerge obscured cell");
			return
		}
		var i, j;
		var w = this.dom.colSpan;
		var h = this.dom.rowSpan;
		for(j=this.row;j<h+this.row;j++){
			for(i=this.col;i<w+this.col;i++){
				if(this.row==j && this.col==i){
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
	
	
	
	
	
	
	
	/**
	Converts the cell to a text input field. The 'value' of this nCell is updated as the user types. nCell 'onchange' events are yet to be added.
	@method convertToInput
	*/
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
	/**
	Converts the cell to a checkbox field. The 'value' of this nCell is updated automatically. nCell 'onchange' events are yet to be added.
	@method convertToCheckbox
	*/
	this.convertToCheckbox = function(){
		this.dom.innerHTML = "";
		var input = document.createElement("input");
		input.type = "checkbox";
		input.checked = this.value;
		var inputChange = function(){
			this.value = input.checked;
			// TODO: onchange event src = user
		}.bind(this);
		input.addEventListener("keyup",inputChange);
		input.addEventListener("change",inputChange);
		this.setValue = function(newval){
			input.checked = newval;
			this.value = newval;
			// TODO: onchange event
			return this;
		}.bind(this);
		this.getValue = function(newval){
			this.value = input.checked;
			return this.value;
		}.bind(this);
		
		this.dom.appendChild(input);
		return this;
	}.bind(this);
	/**
	Converts the cell to a radio field. The 'value' of this nCell is updated automatically. nCell 'onchange' events are yet to be added.
	The radio element requires a "name" attribute to be defined so that groups of options work correctly.
	@method convertToRadio
	@param RadioElementNameAttribute
	*/
	this.convertToRadio = function(name){
		this.dom.innerHTML = "";
		var input = document.createElement("input");
		input.type = "radio";
		input.name = name;
		input.checked = this.value;
		var inputChange = function(){
			this.value = input.checked;
			// TODO: onchange event src = user
		}.bind(this);
		input.addEventListener("keyup",inputChange);
		input.addEventListener("change",inputChange);
		this.setValue = function(newval){
			input.checked = newval;
			this.value = newval;
			// TODO: onchange event
			return this;
		}.bind(this);
		this.getValue = function(newval){
			this.value = input.checked;
			return this.value;
		}.bind(this);
		
		this.dom.appendChild(input);
		return this;
	}.bind(this);
	/**
	Converts the cell to a MathJax field surounded by $${}$$ tags. These tags should be set to 'single line mode' in the MathJax config.
	After setting the value of this nCell, call the mathjax typesetting opperation.
	@method convertToMathJax
	*/
	this.convertToMathJax = function(){
		this.dom.innerHTML = "";
		this.dom.id = DOMTools.getUniqueId();
		this.setValue = function(newval){
			this.dom.innerHTML = "$${"+newval+"}$$";
			this.value = newval;
			
			
			return this;
		}.bind(this);
		this.getValue = function(newval){
			return this.value;
		}.bind(this);
		this.setValue(this.value);
		return this;
	}.bind(this);
	
	
	
	
	

	/**
	@method getLeft
	@returns {nCell} The cell left of this one.
	*/
	this.getLeft = function () { return this.table.getCell(this.row, this.col - 1); }.bind(this);
	/**
	@method getRight
	@returns {nCell} The cell right of this one.
	*/
	this.getRight = function () { return this.table.getCell(this.row, this.col + 1); }.bind(this);
	/**
	@method getUp
	@returns {nCell} The cell above this one.
	*/
	this.getUp = function () { return this.table.getCell(this.row - 1, this.col); }.bind(this);
	/**
	@method getDown
	@returns {nCell} The cell below this one.
	*/
	this.getDown = function () { return this.table.getCell(this.row + 1, this.col); }.bind(this);
	
	/**
	Refers to the table element that this nCell belongs to
	@property table
	*/
	this.table = tbl;
	/**
	Stores the value of the nCell
	@property value
	*/
	this.value = "";
	/**
	This is automadically generated as the nCell class is created. This could lead to massive memory problems!
	@property dom
	@todo find a way not to do this!
	*/
	this.dom = document.createElement("td");
	
	this.setValue("");
}
