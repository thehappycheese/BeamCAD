///~ lib/taffy-min.js

// CONCRETE PROPERTIES AT 28 DAYS (For standard concrete strengths with standard mixes and curing procedures only)
// <AS3600.A2 T3.1.2>
var AS3600T312 = TAFFY(
	{fc:0.020	,fcmi:0.022,	Ec:24.0},
	{fc:0.025	,fcmi:0.028,	Ec:26.7},
	{fc:0.032	,fcmi:0.035,	Ec:30.1},
	{fc:0.040	,fcmi:0.043,	Ec:32.8},
	{fc:0.050	,fcmi:0.053,	Ec:34.8},
	{fc:0.065	,fcmi:0.068,	Ec:37.4},
	{fc:0.080	,fcmi:0.082,	Ec:39.6},
	{fc:0.100	,fcmi:0.099,	Ec:42.2}
);

/**
* @module bc
*/

var bc = (function(){
"use strict";

var exports = {};



function VarGroup(){
	this.__vars = {};
	this.addVar = function(name, value){
		this.__vars[name] = value;
		this.__defineGetter__
	}.bind(this);
	
	this.removeVar = function(){
		
	}.bind(this);
}

/**
* @class Beam
*/
exports.Beam = function (){
	
	this.phi	= 0.8;
	this.Mstar	= 500; //kNm
	this.Mou	= undefined;
	
	
	this.beamtype = "rect"; // t i tslab
	
	
	// ================= STEEL PROPERTIES ================
	this.reoclass = "N";
	
	
	
	this._fsy = 0.500;	// GPa
	 this.fsy = function(newval){
		 //Validation
		if(newval)	this._fsy = newval;
		return		this._fsy;
	}.bind(this);		//GPa
	
	
	
	this._Es = 200;	// GPa
	 this.Es = function(newval){
		// Validation
		if(newval)	this._Es = newval;
		return		this._Es;
	}.bind(this);
	
	
	
	this._fc = 0.032;	// GPa
	this.fc = function(newval){
		// Validation
		if(newval)	this._fc = newval;
		return		this._fc;
	}.bind(this);



	this.alpha2 = function(){
		// Validation
		var result = 1 - 0.003*this.fc();		// <AS3600.A2 8.1.3 page 101> 
		// Validaton
		return result;
	}.bind(this);
	
	

	this.gamma = function(){
		// Validation
		var result = 1.05 - 0.007*this.fc();	// <AS3600.A2 8.1.3 page 101>
		// Validation
		return result;
	}.bind(this);
	
	
	
	
	
	// ============ CONCRETE PROPERTIES ==============
	
	// This is assumed. The limits are 1800-2800  <AS3600.A2 1.1.2 page 8>
	this.rohc = function(){return 2500;}; //kg/m^3
	this.fcmi = function(){return 10;};
	
	this.Ec	= function(){
		// <AS3600.A2 3.1.2 page 37>
		// Validation (Standard values only)
		result = AS3600T312({fc:this.fc()});
		// Validation
		return result;
	}

	
	this._L		= 10000 // mm
	this.L		= function(newval){
		if(newval) this._L = newval;
		return this.L;
	};
		
		
	this.Dtf	= undefined;	// mm
	this.Dbf	= undefined;	// mm
	this.D		= 500;			// mm
	this.dn		= undefined;
		
		
	this.btf	= undefined;	// mm
	this.bbf	= undefined;	// mm
	this.beff	= undefined;	// mm
	this.bw		= 300;			// mm
	
	
	this.cover				= 25;	// mm (Outer surface to shear reo surface)
	this.dfitments			= 12;	// mm (Nominal diameter)
	this.shearReoPitch		= 300;	// mm (Center to center)
	
	
	
	this.momentReo = [
		// Depth is from inner surface of shear reo
		// A negative depth indicates that it goes from the bottom of the beam
		{number:2, diameter:32, depth:-32/2		, As:16*16*Math.PI*2},
		{number:4, diameter:32, depth:-32/2-60	, As:16*16*Math.PI*4}
	];
	
	// Reo explicitly not included in moment reo calcs for the purpose of crack control
	this.crackReo = [];
	
	
	
	
	this.I = function(){
		return this.bw*Math.pow(this.D,3)/12;// rect
	}
	this.Z = function(){
		return this.I()/(this.D/2);	// rect, sag or hog;
	}
	this.Ag = function(){
		return this.D*this.b;		// rect
	}
	
	
	
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
		var dn =0.01;
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
