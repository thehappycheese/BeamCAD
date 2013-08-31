


function InputTable(){
	
	this.tbody = document.createElement("tbody");
	this.thead = document.createElement("thead");
	
	
	this.generateTable = (function(){
		
		var i,j,temprow,tempcell, tempelem;

		// ==== CLEAR THE TABLE
		this.dom.innerHTML = "";
		this.tbody.innerHTML = "";
		this.thead.innerHTML = "";
		this.inputs = [];

		// ==== GENERATE THE INPUT ELEMENTS
		for(j=0;j<this.numrows;j++){
			temprow = [];
			for(i=0;i<this.columns.length;i++){
				tempelem = document.createElement("input");
				tempelem.type = this.columns[i].type;
				temprow.push(tempelem);
			}
			this.inputs.push(temprow);
		}

		// ==== GENERATE HEADER
		temprow = document.createElement("tr");
		tempcell = document.createElement("th");
		temprow.appendChild(tempcell);
		for(i=0;i<this.columns.length;i++){
			tempcell = document.createElement("th");
			tempcell.innerHTML = this.columns[i].name;
			temprow.appendChild(tempcell);
		}
		tempcell = document.createElement("td");
		temprow.appendChild(tempcell);
			
		tempelem = document.createElement("button");
		tempelem.innerHTML = "+";
		tempelem.row = -1;
		tempelem.onclick = (function(e){
			this.addRow(e.target.row);
		}).bind(this);
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
			tempelem.onclick = (function(e){
				this.removeRow(e.target.row);
				console.log(e.target.row);
			}).bind(this);
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
		
		
		this.dom.appendChild(this.thead);
		this.dom.appendChild(this.tbody);
		
	}).bind(this);
	
	
	this.addRow = (function(after){
		var data = this.getData();
		
		data.splice(after+1,0,[]);
		this.numrows++;
		this.generateTable();
		this.setData(data);
	}).bind(this);
	
	this.removeRow = function(row){
		var data = this.getData();
		
		data.splice(row,1);
		this.numrows--;
		this.generateTable();
		this.setData(data);
	}
	
	
	this.getData = (function(){
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
	
	this.setData = (function(newdata){
		for(j=0;j<this.inputs.length;j++){
			for(i=0;i<this.inputs[j].length;i++){
				this.setInputValue(this.inputs[j][i], newdata[j][i]);
			}
		}
	}).bind(this);
	
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
	
	// ================= CONSTRUCTOR =====================
	this.columns = this.columns || [];
	this.numrows = 1;
	this.inputs = [];
	
	this.dom = document.createElement("table");
	this.dom.className = "InputTable";
	this.generateTable();
	
}