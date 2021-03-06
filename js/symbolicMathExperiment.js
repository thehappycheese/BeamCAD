


// I stopped developing this because it was too complicated.
// A better approach is to laboriously pre-simplify every required equation
// Depending on the unknowns



var fc		= {name:"fc",		notation:"f'_c",		value:32,			isvar:true};
var alpha2	= {name:"alpha2",	notation:"\\alpha_2",	value:0.85,			isvar:true};
var gamma	= {name:"gamma",	notation:"\\gamma",		value:undefined,	isvar:true};
var dn		= {name:"dn",		notation:"d_n",			value:undefined,	isvar:true};
var b		= {name:"b",		notation:"b",			value:undefined,	isvar:true};



function evalOpp(opp, symbolic){
	
	var ev = {};
	
	ev.plus = function(args){
		result = evalOpp(args[0],symbolic);
		for(var i=1;i<args.length;i++){
			if(symbolic){
				result+= "+"+evalOpp(args[i],symbolic);
			}else{
				result+= evalOpp(args[i],symbolic);
			}
		}
		return result;
	}
	
	
	ev.timesDot = function(args){
		result = evalOpp(args[0],symbolic);
		for(var i=1;i<args.length;i++){
			if(symbolic){
				result += "\\cdot "+evalOpp(args[i],symbolic);
			}else{
				result *= evalOpp(args[i],symbolic);
			}
		}
		return result;
	}
	ev.timesCross = function(args){
		result = evalOpp(args[0],symbolic);
		for(var i=1;i<args.length;i++){
			if(symbolic){
				result += "\\cdot "+evalOpp(args[i],symbolic);
			}else{
				result *= evalOpp(args[i],symbolic);
			}
		}
		return result;
	}
	
	
	ev.timesNone = function(args){
		result = evalOpp(args[0],symbolic);
		for(var i=1;i<args.length;i++){
			if(symbolic){
				result += "\\times "+evalOpp(args[i],symbolic);
			}else{
				result *= evalOpp(args[i],symbolic);
			}
		}
		return result;
	}
	
	
	ev.multiply = function(args){
		result = evalOpp(args[0],symbolic);
		for(var i=1;i<args.length;i++){
			if(symbolic){
				result += " "+evalOpp(args[i],symbolic);
			}else{
				result *= evalOpp(args[i],symbolic);
			}
		}
		return result;
	}
	
	
	
	
	
	if(!isNaN(opp)){
		// The opperation is a number;
		if(symbolic){
			return opp.toFixed(2);
		}else{
			return opp;
		}
	}else if(opp.isvar){
		// The opperation is a variable;
		if(symbolic){
			return opp.notation;
		}else{
			return opp.value;
		}
	}else{
		// The opperation is an opperation to be evaluated;
		var opperation = opp.shift();
		console.log(opperation);
		return ev[opperation](opp);
	}
	
	
	
	
	
}


function Opp(func,arg){
	this.func	= func;
	this.arg	= arg;
}


var formula = ["plus", ["times", gamma, alpha2, fc, 3], 2];


function runmathjs(){
	ui.tab0.innerHTML = "$$${"+evalOpp(formula,true)+"}$$$";
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

// symbolic only
// undefined is symbolic - no simplification
// undefined is symbolic - simplified
// 








