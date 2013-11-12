

/**
* @module bc
*/

var bc = (function(){

var exports = {};



/**
* @class Beam
*/
exports.Beam = function (){
	
	this.phi = 0.8;
	this.Mstar = 500; //kNm
	this.Mou = undefined;
	
	
	this.t = "rect"; // t i tslab
	
	this.reoclass = "N";
	this.fc = 32; //MPa
	this.fsy = 500; //MPa
	this.Ec = undefined;
	
	
	this.L = 10000;
	this.a = undefined; // For beff?
	
	
	this.Dtf = undefined;
	this.Dbf = undefined;
	this.D = 500;
	
	
	this.btf = undefined;
	this.bbf = undefined;
	this.beff = undefined;
	this.bw = 300;
	
	
	this.cover = 25;
	this.shearReoDiameter	= 12;
	this.shearReoPitch		= 300;
	
	
	// A negative depth indicates that it goes from the bottom of the beam
	this.momentReo = [
		[2, 32, -32/2], // # Diam depth-from-shear-reo-surface
		[2, 32, -32/2-60]
	];
	
	
	this.dn = 100; // TODO: Assumed value :S paramaterize the functions that use it instead?
	this.alpha2 = undefined;
	this.gamma = undefined;
	
	
	this.I = function(){
		return this.bw*Math.pow(this.D,3)/12;// rect
	}
	this.Z = function(){
		return this.I()/(this.D/2);// rect, sag or hog;
	}
	
	this.Ag = function(){
		return this.D*this.b; // rect
	}
	
	this.Acc = function(){
		return this.gamma*this.dn*this.bw; //rect
	}
	
	this.Cc = function(){
		return this.alpha2*this.fc*this.Acc(); // all types
	}
	
	this.Ast = function(){
		// only the reo with di>dn is tensile
		
		// TODO: Prevent the selection of all layers, particularly bars of <1/2 dima of largest bar. Make sure this limitation is obvious to the user in the picture of the beam.
		
		var result = 0;
		
		var topd = this.cover + this.shearReoDiameter;
		var botd = this.D - (this.cover + this.shearReoDiameter);
		
		var i,
			di,
			m = this.momentReo;
			
		for(i=0;i<m.length;i++){
			if(m[i][2]<0){
				di = botd + m[i][2];
			}else{
				di = topd + m[i][2];
			}
			console.log(m);
			if(di>this.dn){
				result += m[i][0]*getReoArea(m[i][1])
			}
		}
		return result;
	}
	
	this.Ts = function(){
		//----------------------- OPTION 1 ---------------------------
		// can assume that all Ast is yielded... (then check later that it was right!)
		return this.Ast()*this.fsy;
		
		
		//----------------------- OPTION 2 ---------------------------
		// or can calculate force of each layer based on strain
		var result = undefined;
		
		// TODO: Prevent the selection of all layers, particularly bars of <1/2 dima of largest bar. Make sure this limitation is obvious to the user in the picture of the beam.
		var topd = this.cover + this.shearReoDiameter;
		var botd = this.D - (this.cover + this.shearReoDiameter);
		
		var i,
			di,
			m = this.momentReo;
			
		for(i=0;i<m.length;i++){
			if(m[i][2]<0){
				di = this.botd + m[i][2];
			}else{
				di = this.topd + m[i][2];
			}
			
			// LEFTOFF: 2013 11 13
			// TODO: get steel strain based on depth, then calculate force based on strain and report. This same chunk can be used to calculate Cs but for a single if statement which checks if the force is positive or negative.
		}
		
		
		
		
		
		return result;
		
	}
	
	
	
	
	
	
	this.checkCapacity = function(){
		
	}
	
	
	
}


// TODO: update this function to reflect the rebar standard
function getReoArea(d){
	return (d/2)*(d/2)*Math.PI;
}






return exports;







})();
