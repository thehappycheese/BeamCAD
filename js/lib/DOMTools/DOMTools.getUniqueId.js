
/**
 * @class DOMTools
 */
var DOMTools = (function(exp){
var exports = exp || {};


var uniqueId = 0;
/**
 * Returns a unique ID to use for DOM elements. Uses the current time in base 34 with an optional prefix string.
 * @method getUniqueId
 * @param Prefix {String}
 */
exports.getUniqueId = function(prefix){
	return (prefix || "id")+((new Date()).getTime()+ (uniqueId++)).toString(34);
}

return exports;
})(DOMTools);