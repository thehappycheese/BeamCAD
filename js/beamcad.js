"usestrict"
///~ lib/sylvester/sylvester.js

beamcad = (function (exports) {

	if (exports == null || exports == undefined) {
		exports = {};
	}

	var nodes = [{
			x : 0,
			y : 0,
			fx : 1,
			fy : 1,
			fr : 1
		}, {
			x : 4,
			y : 0,
			fx : 0,
			fy : 0,
			fr : 0
		}, {
			x : 4,
			y : 2,
			fx : 0,
			fy : 0,
			fr : 0
		}
	];
	var members = [{
			a : 0,
			b : 1,
			E : 1,
			I : 1,
			A : 1
		}, {
			a : 1,
			b : 2,
			E : 1,
			I : 1,
			A : 1
		}

	]
	var forces = [{
			n : 1,
			gx : 0,
			gy : 1
		}
	]

	function po(o,ent) {
		if (typeof o != "object") {
			return o;
		}
		var result = "";

		for (var i in o) {
			result += i + ":" + po(o[i],true) + " ";
			if(ent==undefined){
				result += "\n";
			}
		}

		
		

		return result;
	}

	function flexmethod() {
		//STIFFNESS METHOD

		var localRo = [];
		var localEx = [];

		var localMo = [];
		var localTe = [];
		
		var globalX = [];
		var globalY = [];
		var globalRo = [];

		var i,
		j,
		k,
		na,
		nb,
		matrix;
		
		for(i  in nodes){
			// ============= Global displacement vector [D]
			
			if(nodes[i].fx==0){
				globalX.push(i);
			}
			
			if(nodes[i].fy==0){
				globalY.push(i);
			}
			
			if(nodes[i].fr==0){
				globalRo.push(i);
			}
			
		}

		for (i in members) {
			// ============= member length
			na = nodes[members[i].a];
			nb = nodes[members[i].b];
			dist = Math.sqrt(Math.pow(na.x - nb.x, 2) + Math.pow(na.y - nb.y, 2));
			members[i].length = dist;

			// ============= member stiffness matrix for each isolated member:

			members[i].rotationStiffness = 2 * members[i].E * members[i].I / members[i].length;
			members[i].extensionStiffness =     members[i].E * members[i].A / members[i].length;

			/*$M([
			[2,1]
			[1,2]
			]).multiply(2*members[i].E*members[i].I/members[i].length);*/

			// For a single beam the problem is solved as below:

			// [M1]	 	 _E_	[4I	2I	0][  theta1 ]
			// [M2]	=	  L		[2I	4I	0][  theta2 ]
			// [P ]				[0	0	A][    e    ]


			// ============= find local displacement vector [d]

			// If rotation is not fixed at node A, add thetaAB
			if (na.fr == 0) { // TODO: or if the member is released at that node
				localRo.push({
					member : i,
					na : members[i].a,
					nb : members[i].b
				});
			}

			// If rotation is not fixed at node B, add thetaBA
			if (nb.fr == 0) { // TODO: or if the member is released at that node
				localRo.push({
					member : i,
					na : members[i].b,
					nb : members[i].a
				});
			}

			// If either end of the member has any displacement freedom then add a tension
			if (na.fx == 0 || na.fx == 0 || nb.fx == 0 || nb.fx == 0) {
				localEx.push({
					member : i
				});
			}

			// ============ find local forces vector [q] (Endmoments);

			// If rotation is not fixed at node A, add thetaAB
			//if (na.fr == 0) { // TODO: or if the member is released at that node
				localMo.push({
					member : i,
					na : members[i].a,
					nb : members[i].b
				});
			//}

			// If rotation is not fixed at node B, add thetaBA
			//if (nb.fr == 0) { // TODO: or if the member is released at that node
				localMo.push({
					member : i,
					na : members[i].b,
					nb : members[i].a
				});
			//}

			// If either end of the member has any displacement freedom then add a tension
			if (na.fx == 0 || na.fx == 0 || nb.fx == 0 || nb.fx == 0) {
				localTe.push({
					member : i
				});
			}
		}
		// ========== refine local rotations
		for (i = 0; i < localRo.length; i++) {
			for (j = i + 1; j < localRo.length; j++) {
				if (localRo[i].na == localRo[j].na) {
					//localRo.splice(j--, 1);
				}
			}
		}
		for (i = 0; i < localRo.length; i++) {
			//localRo[i].n=localRo[i].na;
			//delete localRo[i].na;
			//delete localRo[i].nb;
		}
		// find uncompiled stiffness matrix [k]
		
		function getRotationStiffness(member, na, nb, noi){
			//console.log(member,na,nb,noi)
			// The node of interest is no on this member, return 0.
			if(!(noi==na || noi==nb)){
				return 0;
			}
			var result;
			// If the moment of interest is AT the rotation of interest, the stiffness is multiplied by 2.
			if(na == noi){
				result = 2;
			}else{
				result = 1;
			}
			// the result is the multiplied by the precalculated member stiffness and returned:
			return result*members[member].rotationStiffness;
			
		}
		
		var k = [];
		var tmp;
		for(j=0;j<localMo.length;j++){
			tmp = [];
			for(i=0;i<localRo.length;i++){
				tmp.push(getRotationStiffness(localMo[j].member, localMo[j].na, localMo[j].nb, localRo[i].na));
			}
			for(i=0;i<localEx.length;i++){
				tmp.push(0);
			}
			k.push(tmp);
		}
		for(j=0;j<localTe.length;j++){
			tmp = [];
			for(i=0;i<localRo.length;i++){
				tmp.push(0);
			}
			for(i=0;i<localEx.length;i++){
				if(localTe[j].member == localEx[i].member){
					tmp.push(members[localTe[j].member].extensionStiffness);
				}else{
					tmp.push(0);
				}
			}
			k.push(tmp);
		}
		
		k = $M(k);

		// q=the row indexer, d = the column indexer
		
		

		
		

		console.log("nodes	======\n"+ po(nodes)  +	"\n");
		console.log("members======\n"+ po(members)+ "\n\n");
		console.log("q		======\n"+ po(localMo)+ "\n"+po(localTe)+"\n");
		console.log("d	 	======\n"+ po(localRo)+ "\n"+ po(localEx)+ "\n");
		console.log("D		======\n"+ po(globalX)+ "\n"+ po(globalY)+ "\n"+ po(globalRo)+ "\n");
		console.log("k		======\n");
		console.log(k.inspect(2))

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
