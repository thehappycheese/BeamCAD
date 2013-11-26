


function design (){

	//	====== DESIGN GOAL ======
	this.beamtype		= "rect";
	this.liveload		= 500;			// kNm
	this.deadload		= 200;			// kNm	(Discluding self weight)
	this.factoredload	= undefined;	// kNm	(Assumed not to include self weight)
	this.selfweight		= undefined;	// kNm	(apply 'mass' to structural model)
	this.mass			= undefined;	// kg/m	
	
	this.skipselfwieghtcalc = false;
	this.manualyanalyseselfweight = false;
	
	
	// Some geometric assumptions
	this.L			= 10;				// m
	
	this.Dtf		= undefined;		// mm
	this.D			= 500;        // mm
	                                    // mm
	this.btf		= undefined;        // mm
	this.beff		= undefined;        // mm
	this.bw			= 300;              // mm
	
	this.Donbratio	= undefined;		
	
	this.dfitments	= 12;				// mm
	
	
	
	
	// First round of decisions:
	this.fc				= 32;			// MPa
	this.reoclass		= "N";
	this.eclass			= "A2";
	this.useCompReo		= false;
	
	
	
	
	// Other known or assumed values
	this.fsy			= 500;			// MPa
	this.Es				= 200000;		// MPa
	this.rohc			= 2500;			// kg/m^3
	
	
	
	
	// Begin calculations
	this.cover			= undefined;	// m
	
	this.alpha2			= undefined;
	this.gamma			= undefined;
	
	
	// CAPACITY CHECKS
	this.phi			= undefined;
	this.Mou			= undefined;
	this.Mstar			= undefined;			// kNm
	
	
	// Other checks
	this.fcmi			= undefined;
	this.Ec				= undefined;
	this.Moumin			= undefined;
	
	
	
	// SECONDARY GEOMETRIC PROPERTIES
	this.dbar			= undefined;
	this.I				= undefined;
	this.Ztop			= undefined;
	this.Zbot			= undefined;
	this.Zmax			= undefined;
	this.Zmin			= undefined;
	this.Ag				= undefined;

	
}



// WOW HOL SHIT THIS IS MESSED UP :| Keep hammering away at this man. This is where the big deal is.



function designBeam(b){
	if(b.beamtype === "rect"){
		console.log("======= Design a rectangular beam =======");
	}
	
	if(typeof b.D == "number" && typeof b.bw == "number"){
		
		console.log("The depth of the beam is "+b.D+"mm and the breadth is "+b.bw+"mm");
		// Estimate beam self weight
		b.Ag			= b.D*b.bw;
		console.log("thus the gross area would be "+b.Ag+"mm^2");
		
		findMstar();
		
		
		
		
	}else if(b.D == undefined && typeof b.bw == "number"){
		console.log("The breadth of the beam is "+b.bw+"mm but the depth is unknown.");
		
		if
		console.log()
		
		
		
	}else if(b.bw == undefined && typeof b.D == "number"){
		console.log("The depth of the beam is "+b.D+"mm but the breadth is unknown.");
	}else if(b.bw == undefined && b.D == undefined && typeof b.Donbratio == "number"){
		console.log("Niether the depth nor the breadth of the beam is known. A D/b ratio of "+b.Donbratio+" will be used.");
	}else{
		b.Donbratio = 1.41;
		console.log("Niether the depth nor the breadth of the beam is known. A D/b ratio of 1.41 will be assumed. (The proportion of an upright A4 sheet of paper)");
	}
	
	function findMstar(){
		b.mass			= b.Ag*b.rohc/1000/1000;
		console.log("the sectional mass would be "+b.mass+"kg/m");
		
		b.selfweight	= parseFloat(prompt("Based on a sectional mass of "+b.mass+"kg/m what would be the resulting moment?"));
		
		console.log("live load ",		b.liveload+"kNm"," factor: 1.2");
		console.log("dead load",		b.deadload+"kNm"," factor: 1.5");
		console.log("Estimated self weight",b.selfweight+"kNm"," factor: 1.5");
		
		b.Mstar = b.liveload*1.2 + (b.deadload+b.selfweight)*1.5;
		
		console.log("M* = "+b.Mstar+"kNm");
	}
	
}

var d = new design();
var db = designBeam(d);























