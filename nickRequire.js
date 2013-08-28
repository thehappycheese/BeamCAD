

(function(w){
	"use strict";

	try{
		var myscripttag = document.querySelectorAll('[data-main]')
		var main = myscripttag[0].getAttribute("data-main");
	}catch(e){
		console.log("Could not find [data-main] in document");
		return;
	}
	
	
	var inspected	= [];
	var toinspect 	= [main];
	var currentFile = null;
	
	var rules = [];
	var orders = [];
	
	w.compiled = "";
	
	loopInspect();

	function loopInspect(){
		if(toinspect.length>0){
			var url = toinspect.pop();
			
			if(currentFile != null){
				rules.push(currentFile);
			}
			
			currentFile = {url:url, after:[], name:getName(url), path:getPath(url), content:""};
			
			var xreq = new XMLHttpRequest();
				xreq.onreadystatechange = textLoaded;
				xreq.open("GET", url, false);
				xreq.send();
		}else{
			console.log("Inspection Complete!");
			order(rules, orders);
		}
	}
	function textLoaded (e){
		if(e.target.readyState==4){
			if(e.target.status==200){
				var text = e.target.responseText.split(/\r?\n/);
				for(var i = 0; i<text.length;i++){
					// =============== USE RELATIVE PATH ===============
					if(text[i].substr(0,4)=="///*"){
						var url = text[i].substr(5,text[i].length-5);
						currentFile.content = e.target.responseText;
						toinspect.push(getPath(currentFile.url)+url);
						currentFile.after.push(getPath(currentFile.url)+url);
					}
					// =============== USE ROOT PATH ===========
					if(text[i].substr(0,4)=="///~"){
						var url = text[i].substr(5,text[i].length-5);
						currentFile.content = e.target.responseText;
						toinspect.push(url);
						currentFile.after.push(url);
					}
				}
				loopInspect();
			}else{
				console.error("Could not inspect file.. terminating "+currentFile.url);
			}
		}
	}
	
	
	function order(rule, order){
		var i, j;
		var satisfied = false;
		
		for(i = 0; i< rule.length; i++){
			if(rule[i].after.length==0){
				order.push(rule[i].url);
				rule.splice(i--,1);
			}
		}
		
		var killcount = 1000;
		
		while(rule.length>0 && killcount>0){
			killcount--;
			
			// try to satisfy condition of each
			for(i = 0; i< rule.length; i++){
				satisfied = true;
				for(j=0;j<rule[i].after.length;j++){
					if(order.indexOf(rule[i].after[j])==-1){
						satisfied = false;
						break;
					}
				}
				if(satisfied){
					w.compiled = w.compiled+rule[i].content;
					order.unshift(rule[i].url);
					rule.splice(i--,1);
					
				}
			}
		}
		
		if(rule.length>0){
			console.log(rule);
			throw new Error("Cross dependancy error!");
		}
		
		loopLoad();
		
	}
	
	
	function loopLoad(){
		if(orders.length>0){
			var script = document.createElement("script");
			script.onload = loopLoad;
			script.src = orders.pop();
			document.head.appendChild(script);
		}else{
			console.log("Build Complete!");
		}
	}

	
	
	
})(window);

function getName(url){
	var result = "";
	for(var i = url.length-1; i >=0; i--){
		if(url[i]!="/"){
			result = url[i] + result;
		}else{
			break;
		}
	}
	return result;
}
function getPath(url){
	var len = getName(url).length;
	return url.substring(0,url.length-len);
}