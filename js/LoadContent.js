
function loadContent (url, targetDom, done) {
	var xr = new XMLHttpRequest();
	
	
	xr.addEventListener("readystatechange", function (e) {
		if (e.target.readyState === e.target.DONE) {
			if (e.target.status === 200) {
				targetDom.innerHTML = e.target.responseText;
				done(targetDom);
			} else {
				console.log("loadContent resource failed to load:  error");
				console.log(e.target);
			}
		}
	})
	
	
	xr.addEventListener("error", function () {
		console.log("loadContent resource failed to load:  error");
		console.log(e.target);
	});
	xr.addEventListener("timeout", function (e) {
		console.log("loadContent resource failed to load:  timed-out");
		console.log(e.target);
	});

	xr.timeout = 4000;
	xr.open("GET", url, true);
	xr.send();
}