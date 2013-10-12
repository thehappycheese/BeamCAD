
var DOMTools = (function(exp){
var exports = exp || {};


exports.scrobble = function(dom,addTo){
	var elems = dom.querySelectorAll("[id]");
	var results = addTo || {};
	
	var i;
	for(i=0;i<elems.length;i++){
		results[elems[i].id] = elems[i];
	}
	return results;
}

return exports;
})(DOMTools);

