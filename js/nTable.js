///* nInput.js

function nTable(){
	
	
	this.generateInputs = (function(){
	}).bind(this);
	
	

	
	this.generateTable = (function(){
		
		var i,j,temprow,tempcell, tempelem;

		// ==== CLEAR THE TABLE
		this.dom.innerHTML = "";
		this.tbody.innerHTML = "";
		this.thead.innerHTML = "";
		

		// ==== GENERATE THE INPUT ELEMENTS
		
		return;
		
		// ==== GENERATE HEADER
		
		// --- title and minimiser
		temprow = document.createElement("tr");

		tempcell = document.createElement("th");
		tempcell.setAttribute("colspan",this.dataprops.length+1);
		tempcell.innerHTML = this.name;
		tempcell.className = "InputTableTitle"
		temprow.appendChild(tempcell);
		

		tempelem = document.createElement("button");
		tempelem.innerHTML = "&Theta;";
		tempelem.onclick = (function(e){
			console.log(e.target.minimized)
			if(this.minimized){
				this.tbody.style.display = "";
				e.target.innerHTML = "&Theta;"
			}else{
				this.tbody.style.display = "none";
				e.target.innerHTML = "&Omicron;"
			}
			this.minimized  = !this.minimized;
		}).bind(this);
		tempcell.appendChild(tempelem);
		temprow.appendChild(tempcell);
		this.thead.appendChild(temprow);
		
		// --- column lables
		temprow = temprow2;
		tempcell = document.createElement("th");
		temprow.appendChild(tempcell);
		for(i=0;i<this.columns.length;i++){
			tempcell = document.createElement("th");
			tempcell.innerHTML = this.columns[i].name;
			temprow.appendChild(tempcell);
		}
		tempcell = document.createElement("td");
		temprow.appendChild(tempcell);
		
		// --- buttons
		tempelem = document.createElement("button");
		tempelem.innerHTML = "+";
		tempelem.row = -1;
		tempelem.onclick = (function(e){this.addRow(e.target.row);}).bind(this);
		tempcell.appendChild(tempelem);
		this.thead.appendChild(temprow);
		
		// ==== GENERATE BODY
		for(j=0;j<this.inputs.length;j++){
			// --- Create new row
			temprow = document.createElement("tr");
			this.tbody.appendChild(temprow);
			
			// --- Startrow button
			tempcell = document.createElement("td");
			temprow.appendChild(tempcell);
			
			tempelem = document.createElement("button");
			tempelem.innerHTML = "-";
			tempelem.row = j;
			tempelem.onclick = (function(e){this.removeRow(e.target.row);}).bind(this);
			tempcell.appendChild(tempelem)
			
			// --- Content
			for(i=0;i<this.inputs[j].length;i++){
				tempcell = document.createElement("td");
				tempcell.appendChild(this.inputs[j][i])
				temprow.appendChild(tempcell);
			}
			
			// --- Endrow buttons
			tempcell = document.createElement("td");
			temprow.appendChild(tempcell);
			
			tempelem = document.createElement("button");
			tempelem.innerHTML = "+";
			tempelem.row = j;
			tempelem.onclick = (function(e){
				this.addRow(e.target.row);
			}).bind(this);
			tempcell.appendChild(tempelem);
			
			
		}
		
		
		
		
	}).bind(this);
	
	
	this.createCell = (function(content){
		var cont = content;
		if(typeof content == "string"){
			cont = document.createTextNode(content);
		}		
		var cell = document.createElement("td");
		cell.appendChild(cont);
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
	this.dom.className = "InputTable";
	this.dom.appendChild(this.thead);
	this.dom.appendChild(this.tbody);
	
	this.minimised = false;

	this.name = "unset";
	this.inputs = [];
	this.data = [];
	this.datatype = null;
	this.dataprops = [];
	
	
	this.generateTable();
	
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