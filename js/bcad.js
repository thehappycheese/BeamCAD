///~ lib/taffy-min.js

// CONCRETE PROPERTIES AT 28 DAYS (For standard concrete strengths with standard mixes and curing procedures only)
// <AS3600.A2 T3.1.2>
var AS3600T312 = TAFFY([
	{fc:0.020	,fcmi:0.022,	Ec:24.0},
	{fc:0.025	,fcmi:0.028,	Ec:26.7},
	{fc:0.032	,fcmi:0.035,	Ec:30.1},
	{fc:0.040	,fcmi:0.043,	Ec:32.8},
	{fc:0.050	,fcmi:0.053,	Ec:34.8},
	{fc:0.065	,fcmi:0.068,	Ec:37.4},
	{fc:0.080	,fcmi:0.082,	Ec:39.6},
	{fc:0.100	,fcmi:0.099,	Ec:42.2}
]);

/**
* @module bc
*/

var bc = (function(){
"use strict";

var exports = {};





function BeamVar = function(parent,value,data){
	this.parent		= parent;
	
	
	this.value		= value;
	
	
	this.get 		= function(){
		return this.value;
	}.bind(this);
	
	
	this.set		= function(newval){
		this.value = newval;
	}.bind(this);
	
	
	if(data){
		for(var item in data){
			
			if(typeof data[item] === "function"){
				this[item] = data[item].bind(this);
			}else{
				this[item] = data[item];
			}
			
		}
	}

}











/**
* @class Beam
*/
exports.Beam = function (){
	
	this.phi = new BeamVar(this,0.8,{set:undefined});
	
	this.Mstar = new BeamVar(this,500,{
		unit:"kNm",
		set:function(newval){
			if(newval === parseFloat(newval)){
				this.value = newval;
			}
		}
	});
	
	
	this.Mou	= new BeamVar(this,undefined);
	this.Moumin = new BeamVar(this,undefined);
	
	
	this.beamtype = new BeamVar(this,"rect",{
		set:function(newval){
			// TODO: Establish weather other values of beam type are required
			if(newval==="rect" || newval === "t"){
				this.value = newval;
			}else{
				throw new Error("BeamCAD::Beam: beamtype may only be 't' or 'rect'");
			}
		}
	});
	
	
	// ================= STEEL PROPERTIES ================

	this.reoclass = new BeamVar(this,"N",{
		set:function(newval){
			if(newval==="N" || newval==="L"){
				this.value = newval;
			}else{
				throw new Error("BeamCAD::Beam: The reoClass must be either\"N\" or \"L\"");
			}
		}
	})
	
	
	
	this.fsy = new BeamVar(this,0.500,{
		set:function(newval){
			// TODO: confirm this error message?
			throw new Error("BeamCAD::Beam: The steel yeild strength cannot be changed from 500 MPa in this software.");
		}
	});
	
	
	
	this.Es = new BeamVar(this,200,{
		set:function(newval){
			// TODO: confirm this error message?
			throw new Error("BeamCAD::Beam: The steel youngs modulus cannot be changed from 200 GPa in this software.");
		}.bind(this)
	});
	
	
	this.fc = new BeamVar(this,0.032,{
		set:function(newval){
			// TODO: Validate
			if(AS3600T312({fc:newval}).first()){
				this.value = newval;
			}else{
				throw new Error("BeamCAD::Beam: <AS3600.A2 Table 3.1.2> Does not contain this concrete strength: "+newval+" GPa.");
			}
		}
	});
	
	
	this.alpha2 = new BeamVar(this,undefined,{
		
		
		get:function(){
			if(this.mode === "user"){
				return this.value;
			}else if(mode === "auto"){
				// TODO: Confirm code correctness and test
				return Math.min(0.85,Math.max(0.67,1 - 0.003*this.parent.fc.get()));	// <AS3600.A2 8.1.3 page 101>
			}
		},
		set:function(newval){
			// TODO: Confirm code correctness and test
			//		 greq ?
			if(newval <= 0.85 && newval >= 0.67){
				this.value = newval;
			}else{
				throw new Error("BeamCAD::Beam: <AS3600.A2 8.1.3> alpha2 must be within the range of 0.67 to 0.85");
			}
		},
		mode:"auto",
		setMode:function(newval){
			if(newval === "user" || newval === "auto"){
				this.mode = newval;
			}else{
				throw new Error("BeamCAD::Beam: The mode for alpha2 should be either 'user' or 'auto'");
			}
		}
	});
	
	
	
	this.gamma = new BeamVar(this,undefined,{
		
		
		get:function(){
			if(this.mode === "user"){
				return this.value;
			}else if(mode === "auto"){
				// TODO: Confirm code correctness and test
				return Math.min(0.85,Math.max(0.67,1.05 - 0.007*this.parent.fc.get()));	// <AS3600.A2 8.1.3 page 101>
			}
		},
		set:function(newval){
			// TODO: Confirm code correctness and test
			//		 greq ?
			if(newval <= 0.85 && newval >= 0.67){
				this.value = newval;
			}else{
				throw new Error("BeamCAD::Beam: <AS3600.A2 8.1.3> gamma must be within the range of 0.67 to 0.85");
			}
		},
		mode:"auto",
		setMode:function(newval){
			if(newval === "user" || newval === "auto"){
				this.mode = newval;
			}else{
				throw new Error("BeamCAD::Beam: The mode for gamma should be either 'user' or 'auto'");
			}
		}
	});
	
	
	// ============ CONCRETE PROPERTIES ==============
	
	// LEFTOFF: 2013 11 23
	// TODO:	Continue to convert this class to BeamVar
	//			Leave this solution alone. This calculator solves a limited purpose atm.
	
	this.rohc = new BeamVar(this,2500,{//kg/m^3 assumed
		set:function(newval){
			if(newval<=2800 && newval>=1800){
				this.value = newval;
			}else{
				// The limits are 1800-2800  <AS3600.A2 1.1.2 page 8>
				throw new Error("BeamCAD::Beam: <AS3600.A2 1.1.2> limits the density of concrete from 1800 to 2800 kg/m^3");
			}
		}
	});
	
	
	
	this.fcmi = new BeamVar(this,undefined,{
		get:function(){

			var result = AS3600T312({fc:this.parent.fc.get()}).first().fcmi;
			if(result === false){
				throw new Error("BeamCAD::Beam: fcmi could not be automatically calculated: f'c not found in <AS3600.A2 T3.1.2>");
			}
			return result;

		},
		set:undefined
	});
	
	

	
	this.Ec = new BeamVar(this,undefined,{
		get:function(){
			// <AS3600.A2 3.1.2 page 37>
			return AS3600T312({fc:this.parent.fc.get()}).first().Ec; //kg/m^3
		}
		set:undefined
	});
	
	
	
	this.L = new BeamVar(this, 10000, {
		set:function(newval){
			if(typeof newval == "number" && newval === Math.abs(newval)){
				this.value = newval;
			}else{
				throw new Error("BeamCAD::Beam: L should be a positive number");
			}
		}
	})
	
	
	// TODO: validate the getters AND setters for these?
	this.Dtf		= new BeamVar(this,undefined);
	this.Dbf		= new BeamVar(this,undefined);
	this.D			= new BeamVar(this,undefined);
	
	//////////////////////////////////////////// WHAT TO DO HERE :I ???
	this.dn			= undefined;
		
		
	this.btf		= new BeamVar(this,undefined);
	this.bbf		= new BeamVar(this,undefined);
	this.beff		= new BeamVar(this,undefined);
	this.bw			= new BeamVar(this,300);
	
	
	this.cover		= new BeamVar(this,25);	// (Outer surface to shear reo surface)
	this.dfitments	= new BeamVar(this,12);	// (Nominal diameter)
	
	// TODO: what are the practical limits for shear reo spacing?
	//		 Also, is it important in this beam object at all?
	this.shearReoPitch	= new BeamVar(this,300);	// (Center to center)
	
	
	
	this.momentReo = [
		// Depth is from inner surface of shear reo
		// A negative depth indicates that it goes from the bottom of the beam
		{number:2, diameter:32, depth:-32/2		, As:16*16*Math.PI*2},
		{number:4, diameter:32, depth:-32/2-60	, As:16*16*Math.PI*4}
	];
	
	
	
	this.I = function(){
		return this.bw*Math.pow(this.D,3)/12;// rect
	}
	
	
	
	this.Z = function(){
		return this.I()/(this.D/2);	// rect, sag or hog;
	}
	
	
	
	this.Ag = function(){
		return this.D*this.b;		// rect
	}
	
	
	Object.defineProperty(this,"dn",{
		get:function(){
			
			
			
			
		}.bind(this)
	});
	this.processDn = function(dn){
		var Ast		= 0;			// mm^2
		var Asc		= 0;			// mm^2
		var Ts		= 0;			// kN
		var Cs		= 0;			// kN
		
		var i,
			di,						// Depth from the top of the i'th layer of steel
			Fsi,					//  Force in the i'th layer ot steel
			epsilonsi,				// Strain in the i'th layer of steel
			epsiloncmax = 0.003,	// Maximum allowable strain in concrete according to < TODO: code ref >
			epsilonsmax = 0.0025;	// Assume steel strain limit is 0.0025 when calculating the force
		
		var topd = this.cover + this.dfitments;				// Depth to upper inner shearbar surf
		var botd = this.D - (this.cover + this.dfitments);	// Depth to lower inner shearbar surf
		
		//var logtable = [];

		for(i=0;i<this.momentReo.length;i++){
			if(this.momentReo[i].depth<0){
				di = botd + this.momentReo[i].depth;
			}else{
				di = topd + this.momentReo[i].depth;
			}
			
			
			
			// ratio
			epsilonsi = epsiloncmax / dn * (di-dn);
			
			// kN
			Fsi = Math.min(epsilonsi,epsilonsmax) *	// Ratio *
						   this.momentReo[i].As  *	// mm^2	 *
						   this.Es;					// GPa	 = kN
			//console.log("di: ",di,"  epsilonsi:",epsilonsi, "  Fsi: ",Fsi);
			// TODO: Ensure ordering of reobars so that the console doesnt spit out random crap?
			// TODO: Prevent the selection of all layers,
			//			particularly bars of <1/2 dima of largest bar.
			//			Make sure this limitation is obvious to the user in the picture of the beam.
			if(Fsi>0){
				Ts	+= Fsi;
				Ast += this.momentReo[i].As;
			}else{
				Cs -= Fsi;
				Asc += this.momentReo[i].As;
			}
			//logtable.push({ di: di, epsilonsi: epsilonsi, Ts: Ts, Cs: Cs, Ast: Ast, Asc: Asc });

		}
		//console.table(logtable);
		return {Ts:Ts, Cs:Cs, Ast:Ast, Asc:Asc};
	}
	
	
	this.Acc = function(dn){
		return (this.gamma*dn)*this.bw; //rect
	}
	
	this.Asc = function(dn){
		return this.processDn(dn).Asc;
	}
	
	this.Ast = function(dn){
		return this.processDn(dn).Ast;
	}
	
	this.Ts = function(dn){
		//----------------------- OPTION 1 ---------------------------
		// can assume that all Ast is yielded... (then check later that it was right!)
		//return this.Ast(dn)*this.fsy;
		return this.processDn(dn).Ts;
	}
	
	this.Cs = function(dn){
		return this.processDn(dn).Cs;
	}
	
	
	this.Cc = function(dn){
		return this.alpha2*this.fc*this.Acc(dn); // all types
	}
	
	
	
	
	this.checkCapacity = function(){
		var dn = 0.01;
		var lastdist = Infinity;
		var t
		var c
		var logtable = [];
		for(dn=1;dn<this.D;dn+=1){
			t = this.processDn(dn).Ts;
			c = this.Cc(dn);
			
			logtable.push({"Depth to neutral axis":dn,Tenstion:Math.round(t),Compression:Math.round(c)});
			if(Math.abs(t-c)>lastdist){
				dn-=1;
				break
			}
			lastdist = Math.abs(t-c);
		}
		console.table(logtable)
		return dn;
	}
	
	
	
}




return exports;
})();
b = new bc.Beam();