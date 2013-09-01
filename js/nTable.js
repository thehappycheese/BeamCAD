///* nInput.js

function nTable(){
	
	
	
	
	
	
	
	// =================== GENERATE <input> tags for initial values
	// ==== TODO: convert this to an "addRow()" function
	// ==== so that this is the only way to add data
	// ==== this function is bad because it only runs on init
	// ==== and it wasts a fucktonne of space. Mkay.
	
	this.initInputs = (function(){
		var i, j;
		var row, type;
		this.inputs = [];
		
		for(i = 0; i<this.data.length; i++){
			row = [];
			for(j = 0; j<this.dataprops.length; j++){
				
				type	= this.dataprops[j].type;

				ninput	= new nInput(type, j, i);
				
				ninput.value = this.data[i][this.dataprops[j].property];
				
				row.push(ninput.dom);
				
			}
			this.inputs.push(row);
		}
	}).bind(this);
	
	
	
	
	
	
	
	

	// ================== GENERATE INITIAL HTML TABLE ======
	this.generateTable = (function(){
		var i,j, row;
		
		this.tbody.innerHTML = "";
		this.thead.innerHTML = "";
		
		
		// ================ GENERATE TITLE ROW
		row = [
			this.createCell(this.name),
			this.createCell(this.createMinimizeButton())
		];
		row[0].setAttribute("colspan", this.dataprops.length+1);
		this.thead.appendChild(this.createRow(row))
		
		
		// ================ GENERATE COLUMN HEADINGS
		
		row = [this.createCell("")];
		for(i = 0;i<this.dataprops.length;i++){
			row.push(this.createCell(this.dataprops[i].lable))
		}
		row.push(this.createCell(this.createAddRowButton()));
		this.tbody.appendChild(this.createRow(row));
		
		// ================ GENERATE ROWS OF CONTENT
		for(j=0;j<this.inputs.length;j++){
			row = [this.createCell(this.createAddRowButton())];
			for(i = 0;i<this.inputs[j].length;i++){
				row.push(this.createCell(this.inputs[j][i]))
			}
			row.push(this.createCell(this.createAddRowButton()))
			this.tbody.appendChild(this.createRow(row));
		}
		
		
		
	}).bind(this);
	
	
	
	this.createMinimizeButton = (function(){
		var result = document.createElement("button");
		result.innerHTML = "^";
		result.onclick = (function(e){
			if(this.minimized){
				this.tbody.style.display = "";
				e.target.innerHTML = "^";
			}else{
				this.tbody.style.display = "none";
				e.target.innerHTML = "v";
			}
			this.minimized = !this.minimized;
		}).bind(this);
		return result;
	}).bind(this);
	
	
	this.createAddRowButton = (function(){
		var button = document.createElement("button");
		
		button.innerHTML = "+";
		
		button.onclick = (function(e){
			var f = e.target;
			var tr = f.parentNode.parentNode;
			var tb = f.parentNode.parentNode.parentNode;
			var index = 0;
			for(var i = 0; i< tb.children.length; i++){
				if(tr==tb.children[i]){
					index = i-1;
					break;
				}
			}
			console.log(index);
		}).bind(this);
		
		return button;
	}).bind(this);
	
	
	
	
	this.createCell = (function(content){
		var cell = document.createElement("td");
		if(typeof content == "string"){
			cell.innerHTML = content;
		}else{
			cell.appendChild(content);
		}
		return cell;
	}).bind(this);
	
	
	
	
	
	
	
	
	
	
	
	
	this.createRow = (function(array){
		var row = document.createElement("tr");
		for(var i = 0; i<array.length;i++){
			row.appendChild(array[i]);
		}
		return row;
	}).bind(this);
	
	
	
	
	
	
	
	
	this.addRow = (function(after){
		var data = this.getRawData();
		data.splice(after+1,0,[]);
		this.numrows++;
		this.generateTable();
		this.setRawData(data);
	}).bind(this);
	
	
	
	
	
	
	
	
	
	
	
	this.removeRow = function(row){
		var data = this.getRawData();
		
		data.splice(row,1);
		this.numrows--;
		this.generateTable();
		this.setRawData(data);
	}
	
	
	
	
	
	
	
	
	this.getRawData = (function(){
		var i,j,
			temprow,
			tempval,
			result = [];
		
		for(j=0;j<this.inputs.length;j++){
			temprow = [];
			for(i=0;i<this.inputs[j].length;i++){
				
				temprow.push(this.getInputValue(this.inputs[j][i]));
			}
			
			result.push(temprow);
		
		}
		return result;
	}).bind(this);
	
	
	
	
	
	
	
	
	
	this.setRawData = (function(newdata){
		for(j=0;j<this.inputs.length;j++){
			for(i=0;i<this.inputs[j].length;i++){
				this.setInputValue(this.inputs[j][i], newdata[j][i]);
			}
		}
	}).bind(this);
	
	
	
	// ================= CONSTRUCTOR =====================
	
	
	this.tbody = document.createElement("tbody");
	this.thead = document.createElement("thead");
	this.dom = document.createElement("table");
	this.dom.className = "nTable";
	this.dom.appendChild(this.thead);
	this.dom.appendChild(this.tbody);
	
	this.minimised = false;

	this.name = "unset";
	this.inputs = [];
	this.data = [];
	this.datatype = null;
	this.dataprops = [];
	
}






/*
this.setInputValue = (function(input, value){
		switch(input.type){
			case "number":
				return input.value = value;
			case "checkbox":
				return input.checked = value;
			default:
				return input.value = value;
		}
	}).bind(this);
	
	this.getInputValue = (function(input){
		switch(input.type){
			case "number":
				return parseFloat(input.value);
			case "checkbox":
				return input.checked;
			default:
				return input.value;
		}
	}).bind(this);
	
*/