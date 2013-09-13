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

	function po(o, ent) {
		if (typeof o != "object") {
			return o;
		}
		var result = "";

		for (var i in o) {
			result += i + ":" + po(o[i], true) + " ";
			if (ent == undefined) {
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

		for (i in nodes) {
			// ============= Global displacement vector [D]

			if (nodes[i].fx == 0) {
				globalX.push(i);
			}

			if (nodes[i].fy == 0) {
				globalY.push(i);
			}

			if (nodes[i].fr == 0) {
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

			// For a single beam the problem is solved as below:

			// [M1]	 	 _E_	[4I	2I	0][  theta1 ]
			// [M2]	=	  L		[2I	4I	0][  theta2 ]
			// [P ]				[0	0	A][    e    ]

			members[i].rotationStiffness = 2 * members[i].E * members[i].I / members[i].length;
			members[i].extensionStiffness = members[i].E * members[i].A / members[i].length;

			// ============= find local displacement vector [d]			(localRo and localEx)

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

			// ============ find local forces vector [q]				(localMo and localTe);

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

		// ======= COMPUTE THE UNCOMPILED STIFFNESS MATRIX  [k] =====
		// there are for quadrants here in four FOR loops.
		//		1.	local end moments VS local rotations	(varies)
		//		2.	local end moments VS local extensions	(0)
		//		3.	local 	  tension VS local rotations	(0)
		//		4.	local	  tension VS local extensions	(varies)
		var k = [];
		var tmp;
		for (j = 0; j < localMo.length; j++) {
			tmp = [];
			for (i = 0; i < localRo.length; i++) {
				// TODO: this segement of the code could be simplified by simply "stacking" the individual stiffness
				//		matricies along the main diagonal of [k] this would require that we know the formulation of [q] and [d]

				// A valid stiffness only exists when the Rotation and Moment share thier two node indicies,
				// ... if the moment and rotation are related, then we must check which direction they are related in:
				if (localRo[i].na == localMo[j].na && localRo[i].nb == localMo[j].nb) {
					// If they share them in the same direction (ie M01 and theta01) then the stiffness is multipled by 2
					tmp.push(2 * members[localMo[j].member].rotationStiffness);

				} else if (localRo[i].na == localMo[j].nb && localRo[i].nb == localMo[j].na) {
					// Otherwise (ie M01 and theta10) the stiffness is multipled by 1
					tmp.push(1 * members[localMo[j].member].rotationStiffness);

				} else {
					// If not, there is no relationship between this end rotation and end moment.
					tmp.push(0);
				}
			}
			// local extentions are unaffected by local moments. This quadrant of the matrix is zeros
			for (i = 0; i < localEx.length; i++) {
				tmp.push(0);
			}
			k.push(tmp);
		}
		for (j = 0; j < localTe.length; j++) {
			tmp = [];
			for (i = 0; i < localRo.length; i++) {
				tmp.push(0);
			}
			for (i = 0; i < localEx.length; i++) {
				// this section essentialy stacks the extentional stiffnesses of eack member down the last quadrant of the [k] matrix
				if (localTe[j].member == localEx[i].member) {
					tmp.push(members[localTe[j].member].extensionStiffness);
				} else {
					tmp.push(0);
				}
			}
			k.push(tmp);
		}

		k = $M(k);

		//   q   =          k        		  x     d

		// [mo01]   [			]   [th01]
		// |mo10|   |			|   [th10]
		// |mo12|   |			|   [th12]
		// |mo21| = |			| x [th21]
		// |te0 |   |			|   [ex0 ]
		// [te1 ]   [			]   [ex1 ]

		//	 d	  =			A		  x		D

		// [th01]   [			]	[x  1]
		// [th10]   [			]   [x  2]
		// [th12]   [			]   [y  1]
		// [th21] = [			] x [y  2]
		// [ex0 ]   [			]   [th 1]
		// [ex1 ]   [			]	[th 2]

		//	K= A^T k A
		
		//	Q = KD
		
		//	D = Q x K^-1
		
		//	q = k A D
		
		//	d = A D
		
		console.log("nodes	======\n" + po(nodes) + "\n");
		console.log("members======\n" + po(members) + "\n\n");
		console.log("q		======\n" + po(localMo) + "\n" + po(localTe) + "\n");
		console.log("d	 	======\n" + po(localRo) + "\n" + po(localEx) + "\n");
		console.log("D		======\n" + po(globalX) + "\n" + po(globalY) + "\n" + po(globalRo) + "\n");
		console.log("k		======\n");
		console.log(k.inspect(2))




	}

	flexmethod();

	exports.m = members;
	exports.n = nodes;

	return exports;

})();
