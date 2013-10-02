///~ math/mpar.js
///~ lib/dom_utilities.js

"use strict";
document.title = "BeamCAD";


var ui = domScrobble(document.body);

var eq1 = "sin(x)";
var eq2 = "5*(10+x)+(30+(40-x))/2";








ui.mainspace.innerHTML="";


ui.mainspace.appendChild(equation(eq2));



function equation(exp){
	var result = document.createElement('div');
	
	try{
		var t = mpar.parse(exp);
	}catch(e){
		console.log("PARSE ERROR: ");
		throw e;
		return
	}
	
	
	result.appendChild(md(t));
	
	return result

}
function md(t){
	var result = document.createElement('div');
	if(typeof t == "object"){
		var opp = t[0];
		if(opp=="()"){
			var d = document.createElement('div');
			d.className="opp"
			d.appendChild(md(t[1]));
			result.appendChild(d);
		}else {
			var d = document.createElement('div');
			
			d.className="inline";
			
			if(opp=="+" || opp=="-"){
				d.className="bracket"
			}
			d.appendChild(md(t[1]));
			d.appendChild(document.createTextNode(t[0]));
			d.appendChild(md(t[2]));
			result.appendChild(d);
		}
	}else{
		result.appendChild(document.createTextNode(t));
	}
	return result;
}