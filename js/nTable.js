"use strict";
///* nInput.js
///~ lib/EventDispatcher.js

function nTable(){
	
	EventDispatcher.call(this);
	
	
	
	
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
		row[1].style.width ="20px";
		this.thead.appendChild(this.createRow(row))
		
		
		// ================ GENERATE COLUMN HEADINGS
		
		row = [this.createCell("")];
		for(i = 0;i<this.dataprops.length;i++){
			row.push(this.createCell(this.dataprops[i].lable))
		}
		row.push(this.createCell(this.createRowButton(true)));
		this.tbody.appendChild(this.createRow(row));
		
		// ================ GENERATE ROWS OF CONTENT
		for(j=0;j<this.inputs.length;j++){
			row = [this.createCell(this.createRowButton(false))];
			for(i = 0;i<this.inputs[j].length;i++){
				row.push(this.createCell(this.inputs[j][i].dom))
			}
			row.push(this.createCell(this.createRowButton(true)))
			this.tbody.appendChild(this.createRow(row));
		}
	}).bind(this);
	
	
	
	
	// ============== MINIMIZE BUTTON!! ==============
	this.createMinimizeButton = (function(){
		var result = document.createElement("button");
		result.innerHTML = String.fromCharCode(9651);
		result.onclick = (function(e){
			if(this.minimized){
				this.tbody.style.display = "";
				e.target.innerHTML = String.fromCharCode(9651);
			}else{
				this.tbody.style.display = "none";
				e.target.innerHTML = String.fromCharCode(9661);
			}
			this.minimized = !this.minimized;
		}).bind(this);
		return result;
	}).bind(this);
	
	
	
	
	// ============= CREATE ROW+ / ROW- BUTTONS ======
	this.createRowButton = (function(add){
		
		var button = document.createElement("button");
		button.add = add;
		if(button.add){
			button.innerHTML = "+";
		}else{
			button.innerHTML = "-";
		}
		
		button.onclick = (function(e){
			var row = e.target.getRow(e);
			if(e.target.add){
				this.addRow(row);
			}else{
				this.removeRow(row);
			}
			console.log(row+""+e.target.add);
		}).bind(this);
		
		button.getRow = (function(e){
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
			return index;
		}).bind(this);
		
		return button;
	}).bind(this);
	
	
	
	
	// ============= CREATE <TD> WRAPPER =============
	this.createCell = (function(content){
		var cell = document.createElement("td");
		if(typeof content == "string"){
			cell.innerHTML = content;
		}else{
			cell.appendChild(content);
		}
		return cell;
	}).bind(this);
	
	
	
	
	// ============= CREATE <TR> WRAPPER =============	
	this.createRow = (function(array){
		var row = document.createElement("tr");
		for(var i = 0; i<array.length;i++){
			row.appendChild(array[i]);
		}
		return row;
	}).bind(this);
	
	
	
	
	
	// ============= ADD NEW DATA ELEMENT AND ========
	this.addRow = (function(after, data){
		if(data==undefined){
			data = new this.datatype();
		}
		var j, temp, type, ninput, row = [];
		for(j = 0; j<this.dataprops.length; j++){
			
			type	= this.dataprops[j].type;//bool

			ninput	= new nInput(type);//bool
			
			
			ninput.on("exit",(function(e){
				var i,  j, nextfocus;
				var done = false;
				for(j=0;j<this.inputs.length;j++){
					for(i=0;i<this.inputs[j].length;i++){
						if(e.target == this.inputs[j][i].dom){
							done=true;
							break
						}
					}
					if(done){
						break;
					}
				}
				switch(e.direction){
					case "up":
						j--;
						break;
					case "down":
						j++;
						break;
					case "left":
						i--;
						break;
					case "right":
						i++;
						break;
				}
				if(i<0 || i>=this.inputs[0].length){
					return;
				}
				if(j<0){
					return;
				}
				if(j>=this.inputs.length){
					this.addRow(this.data.length);
				}
				this.inputs[j][i].dom.focus();
			}).bind(this));
			
			ninput.on("change",(function(e){
				this.updateData();
			}).bind(this));
			
			temp = data[this.dataprops[j].property];
			
			if(temp === undefined || isNaN(temp)){
				ninput.value = "";
			}else{
				ninput.value = temp;
			}
			
			row.push(ninput);
		}
		this.data.splice(after+1,0,data);
		this.inputs.splice(after+1, 0, row);
		this.generateTable();
		this.dispatch("change");
	}).bind(this);
	
	
	
	
	// ============= REMOVE TABLE AND DATA ROW =======
	this.removeRow = (function(row){
		this.inputs.splice(row,1);
		this.data.splice(row,1);
		this.tbody.removeChild(this.tbody.children[row+1]);
		this.dispatch("change");
		this.dispatch("removedrow",row);
	}).bind(this);
	
	
	
	
	// ============= UPDATE [DATA] FROM [INPUTS] =====
	this.updateData = (function(){
		var i, j, p;
		for(j = 0; j <this.inputs.length; j++){
			for(i = 0; i <this.inputs[j].length; i++){
				this.data[j][this.dataprops[i].property] = this.inputs[j][i].value;
			}
		}
		this.dispatch("change");
	}).bind(this);
	
	
	
	
	// ============ UPDATE [INPUTS] FROM [DATA] ==========
	this.updateInputs = (function(){
		console.log("unimplemented!");
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