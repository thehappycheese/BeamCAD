


function tok(str){
	var result = [];
	var os = str;
	
	var i = 0;
	
	var ts = []; // token stack
	
	ts.__defineGetter__("last",function(){
		if(this.length==0){
			return null;
		}else{
			return this[this.length-1]
		}
	}.bind(ts))
	
	
	
	var cc = "";
	while(i<os.length){
		
		cc = os[i];
		
		if(ts.last == null || ctype(cc) != ts.last.type || ctype(cc)=="paren"){
			// If token stack is empty or the character is a new type of token then
			if(ctype(cc)!="space"){
				ts.push({type:ctype(cc), start:i, end:i, terminal:cterm(c)});
			}
		
		}else {
			// If the token stack has something in it, AND the last token is of the same type as the current token
			ts.last.end == i; 
			if(ts.last.terminal=="not" && ts.last.type != ctype(cc)
			result.push(ts.pop)
		}
		
		i++
	}

	return result;
}
function ctype(c){
	if(isSpace(c)){
		return "space";
	}
	if(isNum(c)){
		return "num";
	}
	if(isParen(c)){
		return "paren";
	}
	if(isOpp(c)){
		return "opp";
	}
	return "none";
}
function cterm(c){
	
	switch(ctype(c)){
		case "num":
			return "not";
		case "paren":
			if(c=="{"){
				return "}";
			} else if(c=="("){
				return "(";
			} else if(c=="["){
				return "]";
			}
		case "opp":
			return "not";		
	}

}
function isSpace(c){
	return (/[\s]/).test(c);
}
function isNum(c){
	return (/[0-9]/).test(c);
}
function isOpp(c){
	return (/[/\*\+-]/).test(c);
}
function isParen(c){
	return (/[/\*\+-]/).test(c);
}
