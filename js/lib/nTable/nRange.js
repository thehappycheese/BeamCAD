






function nRange(r,c,h,w,table){
	
	this.row = r;
	this.col = c;
	
	this.rowsize = h;
	this.colsize = w;
	
	this.table = table;
	
	
	
	this.setValue = function(val){
		this.forEach(function(c){c.setValue(val)});
	}.bind(this);
	
	this.setDOMProperties = function(prop,value){
		
		this.forEach(function(c){
			var i, obj;
			obj = c;
			for(i=0;i<prop.length-1;i++){
				obj = obj[prop[i]];
			}
			obj[prop[prop.length-1]] = value;
			
		});
		
	}.bind(this);
	
	this.merge = function(){
		var basecell = this.table.getCell(this.row,this.column);
		basecell.merge(this.rowsize,this.colsize);
	}.bind(this);
	this.unmerge = function(){
		this.forEach(function(c){c.unmerge();});
	}.bind(this);
	
	this.forEach = function(f){
		var rr, cc;
		for(rr=this.row;rr<this.row+this.rowsize;rr++){
			for(cc=this.col; cc<this.col+this.colsize;cc++){
				f(this.table.getCell(rr,cc));
			}
		}
	}
	
	
	
	
	
}