






var fc		= {name:"fc",		notation:"f'_c",		value:32,	isvar:true};
var alpha2	= {name:"alpha2",	notation:"\\alpha_2",	value:0.85,	isvar:true};



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
	ev.times = function(args){
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
	console.log("opp", opp);
	if(!isNaN(opp)){
		// The opperation is a number;
		console.log("opp is a number")
		if(symbolic){
			return opp.toFixed(2);
		}else{
			return opp;
		}
	}else if(opp.isvar){
		// The opperation is a variable;
		console.log("opp is a variable")
		if(symbolic){
			return opp.notation;
		}else{
			return opp.value;
		}
	}else{
		console.log("opp is a an opperation")
		// The opperation is an opperation to be evaluated;
		var opperation = opp.shift();
		console.log(opperation)
		return ev[opperation](opp);
	}
	
	
	
	
	
}


function Opp(func,arg){
	this.func	= func;
	this.arg	= arg;
}


var formula = ["plus", ["times", alpha2, fc, 3], 2];


function runmathjs(){
	ui.tab0.innerHTML = "$$${"+evalOpp(formula,true)+"}$$$";
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}










