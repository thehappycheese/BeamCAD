///~ math/mpar.js
///~ lib/dom_utilities.js

"use strict";
document.title = "BeamCAD";


var ui = domScrobble(document.body);

var eq1 = "sin(x)";
var eq2 = "k_ou/{10+1}";








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
	console.log(t)
	return result

}
function md(t){
	
	
	if(typeof t == "object"){
		
		
		var result = document.createElement('table');
		result.cellPadding = 0;
		result.cellSpacing = 0;
		var row = document.createElement('tr');
		var opp = t[0];
		
		
		if(opp=="()"){
		
			var d = document.createElement('td');
			d.appendChild(md(t[1]));
			d.className = "bracket";
			row.appendChild(d);
			result.appendChild(row);
			
		}else if(opp=="{}"){
		
			var d = document.createElement('td');
			d.appendChild(md(t[1]));
			row.appendChild(d);
			result.appendChild(row);
			
		}else if(opp=="*" || opp=="+" || opp=="-") {
			
			var d = document.createElement('td');
			d.className = "mathcell";
			d.appendChild(md(t[1]));
			row.appendChild(d);
			
			var d = document.createElement('td');
			d.className = "mathcell";
			
			if(t[0]=="*"){
				d.innerHTML+="&times;";
			}else{
				d.appendChild(document.createTextNode(t[0]));
			}
			row.appendChild(d);
			
			var d = document.createElement('td');
			d.className = "mathcell";
			d.appendChild(md(t[2]));
			row.appendChild(d);
			
			result.appendChild(row);
			
		}else if(opp=="/") {
			
			var d = document.createElement('td');
			d.className = "mathcell math-numerator";
			d.borderBottom = "1px solid black"
			d.appendChild(md(t[1]));
			row.appendChild(d);
			
			row.appendChild(d);
			result.appendChild(row);
			
			
			
			var row2 = document.createElement('tr');
			
			var d = document.createElement('td');
			d.appendChild(md(t[2]));
			d.className = "mathcell";
			
			row2.appendChild(d);
			
			result.appendChild(row2);
			
		}else if(opp == "_"){
			var d = document.createElement('td');
			d.className = "mathcell";
			d.appendChild(md(t[1]));
			row.appendChild(d);
			
			
			
			var span = document.createElement('span');
			span.className = "math-subscript";
			span.appendChild(md(t[2]));
			
			
			var d = document.createElement('td');
			d.className = "mathcell";
			d.appendChild(span);
			row.appendChild(d);
			
			result.appendChild(row);
		}
	}else{
		//row.appendChild(document.createTextNode(t));
		return document.createTextNode(t)
	}
	return result;
}


















