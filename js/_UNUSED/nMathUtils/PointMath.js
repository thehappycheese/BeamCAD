Math.rotateTranslate = function(pnt, tx,ty,tr){
	var cr = Math.cos(tr);
	var sr = Math.sin(tr);
	var t = pnt.x*cr - pnt.y*sr + tx
	
	pnt.y = pnt.x*sr + pnt.y*cr + ty 
	pnt.x = t;
	
	return pnt;
}

Math.rotate = function(pnt, tr){
	var cr = Math.cos(tr);
	var sr = Math.sin(tr);
	var  t = pnt.x*cr - pnt.y*sr;
	
	pnt.y = pnt.x*sr + pnt.y*cr;
	pnt.x = t;
	
	return pnt;
}

Math.normalise = function(pnt){
	var mag = Math.sqrt(pnt.x*pnt.x + pnt.y*pnt.y);
	pnt.x /= mag;
	pnt.y /= mag;
	return pnt;
}

Math.leftHand = function(pnt){
	var t = pnt.x;
	pnt.x = -pnt.y;
	pnt.y = t;
	return pnt;
};

Math.dot = function(ap, bp){
	return ap.x*bp.x + ap.y*bp.y;
}

Math.distsqr = function(pa, pb){
	return pa.x*pa.x + pb.y*pb.y
}
Math.dist = function(pa, pb){
	return Math.sqrt(pa.x*pa.x + pb.y*pb.y);
}


Math.clip = function (value, lower, upper){
	if(value<lower){
		value=lower;
	}else if(value>upper){
		value=upper
	}
	return value;
}

Math.loopover = function(value, lower, upper){
	if(value<lower){
		value+=(upper-lower);
	}else if(value>=upper){
		value-=(upper-lower);
	}
	return value;
};

Math.angDiffRad = function (a,b) {
	var result = a - b;
	while (result < -Math.PI) {
		result += Math.PI * 2;
	}
	while (result > Math.PI) {
		result -= Math.PI * 2;
	}
	return result;
}