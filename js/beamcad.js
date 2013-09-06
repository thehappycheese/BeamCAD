
///~ lib/sylvester/sylvester.js

beamcad = (function(exports){

if(exports==null || exports==undefined){
	exports={};
}

var nodes = [
	{x:0,y:0, fx:1,fy:1,fr:1},
	{x:4,y:0, fx:0,fy:0,fr:0},
	{x:4,y:4, fx:0,fy:0,fr:0}
];
var members = [
	{a:0, b:1, E:1, I:1},
	{a:1, b:2, E:1, I:1}
	
]
var forces = [
	{n:1,gx:0,gy:1}
]

function flexmethod(){
	//STIFFNESS METHOD
	
	var i, na, nb, matrix;
	for(i in members){
		// calculate member length
		na = nodes[members[i].a];
		nb = nodes[members[i].b];
		dist = Math.sqrt(Math.pow(na.x-nb.x,2)+Math.pow(na.y-nb.y,2));
		members[i].length = dist;
		
		// Calculate member stiffness matrix for each isolated member:
		
		members[i].stiffness = 2*members[i].E*members[i].I/members[i].length;
		/*$M([
			[2,1]
			[1,2]
		]).multiply(2*members[i].E*members[i].I/members[i].length);*/
		
		// For a single beam the problem is solved as below:
		
		// [M1]	 	 _E_	[4I	2I	0][  theta1 ]
		// [M2]	=	  L		[2I	4I	0][  theta2 ]
		// [P ]				[0	0	A][    e    ]
		
		
		
		
		
	}
	
	// find local displacement vector [d]
	
	var d = [];
	
	for(i in members){
		na = nodes[members[i].a];
		nb = nodes[members[i].b];
		
		
		// If rotation is not fixed at node A, add thetaAB
		if(na.fr==0){ // TODO: or if the member is released at that node
			d.push("r,"+members[i].a+","+members[i].b);
		}
		
		// If rotation is not fixed at node B, add thetaBA
		if(nb.fr==0){// TODO: or if the member is released at that node
			d.push("r,"+members[i].b+","+members[i].a);
		}
		
		// If either end of the member has any displacement freedom then add a tension
		if(na.fx==0 || na.fx==0 || nb.fx==0 || nb.fx==0){
			d.push("T,"+i);
		}
	}
	
	// find local forces vector [q]
	
	
	// find uncompiled stiffness matrix [k]
	
	// q=the row indexer, d = the column indexer
	
	console.log(members);
	console.log(nodes);
	console.log(d);
	
	
	// each member has 3 local displacements, mai mbi and ei (e for extention)
	
	//   q   =          k        		  x     d
	
	// [m0A]   [	,	,	,	,	,	]   [theta0A]
	// |m0B|   |	,	,	,	,	,	|   [theta0B]
	// |P0 |   |	,	,	,	,	,	|   [e0     ]
	// |m1A| = |	,	,	,	,	,	| x [theta1A]
	// |m1B|   |	,	,	,	,	,	|   [theta1B]
	// [P1 ]   [	,	,	,	,	,	]   [e1     ]
	
	// some of these local displacements will be shared with other members
	
	// [m0A]   [	,	,	,	]   
	// [m0B]   [	,	,	,	]   [theta1]
	// [P0 ]   [	,	,	,	]   [theta2]
	// [m1A] = [	,	,	,	] x [e0    ]
	// [m1B]   [	,	,	,	]   [e1    ]
	// [P1 ]   [	,	,	,	]   
	
	// Furthermore, some nodes are known to be fixed and thus some DOF dont exist
	   
	// [m0B]   [	,	,	,	]   [theta1]
	// [P0 ]   [	,	,	,	]   [theta2]
	// [m1A] = [	,	,	,	] x [e0    ]
	// [m1B]   [	,	,	,	]   [e1    ]
	// [P1 ]   [	,	,	,	] 

	

	
	
	
}

flexmethod();



exports.m = members;
exports.n = nodes;
	
	
return exports;

})();