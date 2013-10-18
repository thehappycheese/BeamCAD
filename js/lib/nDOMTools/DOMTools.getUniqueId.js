var DOMTools = (function(exp){
var exports = exp || {};


var uniqueId = 0;

exports.getUniqueId = function(prefix){
	return (prefix || "id")+((new Date()).getTime()+ (uniqueId++)).toString(34);
}

return exports;
})(DOMTools);