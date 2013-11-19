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


/**
* @class Beam
*/
exports.Beam = function (){
	
	this.phi	= 0.8;
	this.Mstar	= 500; //kNm
	this.Mou	= undefined;
	this.Moumin = undefined;
	
	
	this.beamtype = "rect"; // t i tslab
	
	
	// ================= STEEL PROPERTIES ================
	this._reoclass = "N";
	Object.defineProperty(this,"reoclass",{
		get:function(){
			return this._reoclass;
		}.bind(this)
		,set:function(newval){
			if(newval==="N" || newval==="L"){
				this._reoclass = newval;
			}else{
				throw new Error("The reoClass must be either\"N\" or \"L\"");
			}
		}.bind(this)
	});
	
	
	
	this._fsy = 0.500;	// GPa
	Object.defineProperty(this,"fsy",{
		get:function(){
			return this._fsy;
		}.bind(this)
		,set:function(newval){
			// TODO: confirm this error message?
			throw new Error("The steel yeild strength must be 500 MPa in this software.");
		}.bind(this)
	});
	
	
	
	this._Es = 200;	// GPa
	Object.defineProperty(this,"Es",{
		get:function(){
			return this._Es;
		}.bind(this)
		,set:function(newval){
			// TODO: confirm this error message?
			throw new Error("The steel youngs modulus must be 200 GPa in this software.");
		}.bind(this)
	});
	
	
	
	this._fc = 0.032;	// GPa
	Object.defineProperty(this,"fc",{
		get:function(){
			return this._fc;
		}.bind(this)
		,set:function(newval){
			// TODO: Validate
			if(AS3600T312({fc:newval}).first()){
				this._fc = newval;
			}else{
				throw new Error("<AS3600.A2 Table 3.1.2> Does not contain this concrete strength: "+newval+" GPa.");
			}
			return this._fc;
		}.bind(this)
	});
	
	
	
	this._alpha2 = undefined;
	Object.defineProperty(this,"alpha2",{
		get:function(){
			if(this._alpha2 !== undefined){
				return this._alpha2;
			}else{
				return 1 - 0.003*this.fc;	// <AS3600.A2 8.1.3 page 101>
			}
		}.bind(this)
		,set:function(newval){
			// TODO: Confirm this assumption
			if(newval === undefined){
				this._alpha2 = undefined;
				console.warn("alpha2 is now automatically calculated");
			}if(newval<0.85 && newval>0.67){
				this._alpha2 = newval;
				console.warm("alpha2 has been manually set to "+newval);
			}else{
				throw new Error("<AS3600.A2 8.1.3> alpha2 must be within the range of 0.67 to 0.85");
			}
			return this._alpha2;
		}.bind(this)
	});
	
	
	
	this._gamma = undefined;
	Object.defineProperty(this,"gamma",{
		get:function(){
			if(this._gamma !== undefined){
				return this._gamma;
			}else{
				return 1.05 - 0.007*this.fc;	// <AS3600.A2 8.1.3 page 101>
			}
		}.bind(this)
		,set:function(newval){
			// TODO: Confirm this assumption
			if(newval === undefined){
				this._gamma = undefined;
				console.warn("gamma is now automatically calculated");
			}if(newval<0.85 && newval>0.67){
				this._gamma = newval;
				console.warm("gamma has been manually set to "+newval);
			}else{
				throw new Error("<AS3600.A2 8.1.3> gamma must be within the range of 0.67 to 0.85");
			}
			return this._gamma;
		}.bind(this)
	});
	
	
	
	
	
	// ============ CONCRETE PROPERTIES ==============
	
	
	this._rohc = 2500; // This is assumed.
	Object.defineProperty(this,"rohc",{
		get:function(){
			return this._rohc; //kg/m^3
		}.bind(this),
		set:function(newval){
			if(newval>2800 || newval<1800){
				// The limits are 1800-2800  <AS3600.A2 1.1.2 page 8>
				throw new Error("<AS3600.A2 1.1.2> limits the density of concrete from 1800 to 2800 kg/m^3");
			}else{
				this._rohc = newval;
			}
		}.bind(this)
	});
	
	
	
	Object.defineProperty(this,"fcmi",{
		get:function(){
			return AS3600T312({fc:this.fc}).first().fcmi; //kg/m^3
		}.bind(this)
	});
	
	
	
	Object.defineProperty(this,"Ec",{
		get:function(){
			// <AS3600.A2 3.1.2 page 37>
			return AS3600T312({fc:this.fc}).first().Ec; //kg/m^3
		}.bind(this)
	});
	
	
	
	this._L		= 10000 // mm
	Object.defineProperty(this,"L",{
		get:function(){
			// <AS3600.A2 3.1.2 page 37>
			return this._L;
		}.bind(this),
		set:function(newval){
			if(newval>0 && newval<100000){
				this._L
			}else{
				throw new Error("Length should be between 0 mm and 100000 mm");
			}
		}
	});
		
		
	this.Dtf	= undefined;		// mm
	this.Dbf	= undefined;		// mm
	this.D		= 500;				// mm
	this.dn		= undefined;
	
	
	this.btf	= undefined;		// mm
	this.bbf	= undefined;		// mm
	this.beff	= undefined;		// mm
	this.bw		= 300;				// mm
	
	
	this.cover				= 25;	// mm (Outer surface to shear reo surface)
	this.dfitments			= 12;	// mm (Nominal diameter)
	this.shearReoPitch		= 300;	// mm (Center to center)
	
	
	
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