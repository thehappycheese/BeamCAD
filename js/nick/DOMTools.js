/**
 * @class DomTools
 */
var DOMTools = (function (exp) {
	var exports = exp || {};


	/**
	 * Returns an object containing properties with names coresponding to the html id's in the element
	 * @method scrobble
	 * @param DomElement
	 * @param addToObject {Optional}
	 */
	exports.scrobble = function (dom, addTo) {
		var elems = dom.querySelectorAll("[id]");
		var results = addTo || {};

		var i;
		for (i = 0; i < elems.length; i++) {
			results[elems[i].id] = elems[i];
		}
		return results;
	}




	/**
	 * Returns a unique ID to use for DOM elements. Uses the current time in base 34 with an optional prefix string.
	 * @method getUniqueId
	 * @param Prefix {String}
	 */
	var uniqueId = 0;
	exports.getUniqueId = function (prefix) {
		return (prefix || "id") + ((new Date()).getTime() + (uniqueId++)).toString(34);
	}


	/**
	 *
	 * @method loadContent
	 * @param url {string}
	 * @param targetDom {HTMLElement}
	 * @param onload {function}
	 */
	exports.loadContent = function(url, targetDom, done) {
		var xr = new XMLHttpRequest();


		xr.addEventListener("readystatechange", function (e) {
			if (e.target.readyState === e.target.DONE) {
				if (e.target.status === 200) {
					targetDom.innerHTML = e.target.responseText;
					done(targetDom, e.target.responseText);
				} else {
					console.log("DOMTools.loadContent resource failed to load:  error");
					console.log(e.target);
				}
			}
		})


		xr.addEventListener("error", function () {
			console.log("DOMTools.loadContent resource failed to load:  error");
			console.log(e.target);
		});
		xr.addEventListener("timeout", function (e) {
			console.log("DOMTools.loadContent resource failed to load:  timed-out");
			console.log(e.target);
		});

		xr.timeout = 4000;
		xr.open("GET", url, true);
		xr.send();
	}





	return exports;
})(DOMTools);

