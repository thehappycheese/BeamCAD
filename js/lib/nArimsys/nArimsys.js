////~ lib/nEvents/EventDispatcher.js





function nVarA(){
	nVar.call(this, "A", 0);
}

function nVarB(){
	nVar.call(this, "B", 0);
}
function nVarC(){
	nVar.call(this, "C", 0, ["A","B"]);
}



function nVar(name, value, prerequisites){
	
	this.name = name || "";
	this._value = value || 0;
	this._formula = function(){return 0};

	this.prerequisites = prerequisites || [];

	this.getValue = function(){
		return this._value;
	}.bind(this);

	this.setFormula = function(func){
		this._formula = func;
		return this;
	}.bind(this);

	this.updateValue = function(){
		this._value = this.formula();
	}.bind(this);

}

function nVarBase(){
	this.protos = [new nVarA(),new nVarB(),new nVarC()];
	this.vars = [new nVarA()];

	
	this.getProtoByName = function(name){
		for(var i = this.protos.length-1; i>=0;i--){
			if(name == this.protos[i].name){
				return this.protos[i];
			}
		}
	}.bind(this);

	this.hasvar = function(testname){
		for(var i = this.vars.length-1; i>=0;i--){
			if(this.vars[i].name == testname){
				return i;
			}
		}
		return -1;
	}.bind(this);

	this.canget = function(name){
		var i,j,k;

		// Get the prototype variable based on the name of the variable
		var nvar = this.getProtoByName(name);

		// Now check to see that all of the prototype's prerequisites are met
		var result = true;
		for(k=0;k<nvar.prerequisites.length;k++){
			// If the known .vars array doesnt contain the required name, return false
			if(this.hasvar(nvar.prerequisites[k])===-1){
				result = false;
				break;
			}
		}


		return result;
	}.bind(this);
	
	this.listnext = function(){
		result = [];
		for(i=0;i<this.protos.length;i++){// Look at each proto and see if we canget()
			if(this.canget(this.protos[i].name)){
				result.push(this.protos[i].name);
			}
		}
		return result;
	}.bind(this);

}

var vb = new nVarBase();








prereqpegjs=function(){function x(e){return'"'+e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var p={parse:function(e,l){function h(a){b<q||(b>q&&(q=b,u=[]),u.push(a))}function v(){var a,c,d,g,f;f=g=b;a=n();null!==a?(124===e.charCodeAt(b)?(c="|",b++):(c=null,0===k&&h('"|"')),null!==c?(d=v(),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=
null,b=f);null!==a&&(a=["or",a[0],a[2]]);null===a&&(b=g);null===a&&(a=n());return a}function n(){var a,c,d,g,f;f=g=b;a=w();null!==a?(38===e.charCodeAt(b)?(c="&",b++):(c=null,0===k&&h('"&"')),null!==c?(d=n(),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=null,b=f);null!==a&&(a=["and",a[0],a[2]]);null===a&&(b=g);null===a&&(f=g=b,a=r(),null!==a?(61===e.charCodeAt(b)?(c="=",b++):(c=null,0===k&&h('"="')),null!==c?(d=s(),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=null,b=f),null!==a&&(a=["eq",
a[0],a[2]]),null===a&&(b=g),null===a&&(f=g=b,a=r(),null!==a?(61===e.charCodeAt(b)?(c="=",b++):(c=null,0===k&&h('"="')),null!==c?(d=t(),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=null,b=f),null!==a&&(a=["eq",a[0],a[2]]),null===a&&(b=g),null===a&&(f=g=b,a=s(),null!==a?(61===e.charCodeAt(b)?(c="=",b++):(c=null,0===k&&h('"="')),null!==c?(d=r(),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=null,b=f),null!==a&&(a=["eq",a[2],a[0]]),null===a&&(b=g),null===a&&(f=g=b,a=t(),null!==a?(61===e.charCodeAt(b)?
(c="=",b++):(c=null,0===k&&h('"="')),null!==c?(d=r(),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=null,b=f),null!==a&&(a=["eq",a[2],a[0]]),null===a&&(b=g),null===a&&(a=w())))));return a}function w(){var a,c,d,g;g=d=b;33===e.charCodeAt(b)?(a="!",b++):(a=null,0===k&&h('"!"'));null!==a?(c=n(),null!==c?a=[a,c]:(a=null,b=g)):(a=null,b=g);null!==a&&(a=["not",a[1]]);null===a&&(b=d);null===a&&(a=p());return a}function p(){var a,c,d,g,f;a=y();null===a&&(a=t(),null===a&&(a=s(),null===a&&(f=g=b,40===e.charCodeAt(b)?
(a="(",b++):(a=null,0===k&&h('"("')),null!==a?(c=v(),null!==c?(41===e.charCodeAt(b)?(d=")",b++):(d=null,0===k&&h('")"')),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)):(a=null,b=f),null!==a&&(a=a[1]),null===a&&(b=g))));return a}function t(){var a,c,d;k++;d=b;/^[0-9.]/.test(e.charAt(b))?(c=e.charAt(b),b++):(c=null,0===k&&h("[0-9.]"));if(null!==c)for(a=[];null!==c;)a.push(c),/^[0-9.]/.test(e.charAt(b))?(c=e.charAt(b),b++):(c=null,0===k&&h("[0-9.]"));else a=null;null!==a&&(a=parseFloat(a.join("")));
null===a&&(b=d);k--;0===k&&null===a&&h("number");return a}function y(){var a,c,d;d=b;/^[a-zA-Z_]/.test(e.charAt(b))?(c=e.charAt(b),b++):(c=null,0===k&&h("[a-zA-Z_]"));if(null!==c)for(a=[];null!==c;)a.push(c),/^[a-zA-Z_]/.test(e.charAt(b))?(c=e.charAt(b),b++):(c=null,0===k&&h("[a-zA-Z_]"));else a=null;null!==a&&(a=["has",a.join("")]);null===a&&(b=d);return a}function r(){var a,c,d;d=b;/^[a-zA-Z_]/.test(e.charAt(b))?(c=e.charAt(b),b++):(c=null,0===k&&h("[a-zA-Z_]"));if(null!==c)for(a=[];null!==c;)a.push(c),
/^[a-zA-Z_]/.test(e.charAt(b))?(c=e.charAt(b),b++):(c=null,0===k&&h("[a-zA-Z_]"));else a=null;null!==a&&(a=a.join(""));null===a&&(b=d);return a}function s(){var a,c,d,g,f;f=g=b;34===e.charCodeAt(b)?(a='"',b++):(a=null,0===k&&h('"\\""'));if(null!==a){/^[^"]/.test(e.charAt(b))?(d=e.charAt(b),b++):(d=null,0===k&&h('[^"]'));if(null!==d)for(c=[];null!==d;)c.push(d),/^[^"]/.test(e.charAt(b))?(d=e.charAt(b),b++):(d=null,0===k&&h('[^"]'));else c=null;null!==c?(34===e.charCodeAt(b)?(d='"',b++):(d=null,0===
k&&h('"\\""')),null!==d?a=[a,c,d]:(a=null,b=f)):(a=null,b=f)}else a=null,b=f;null!==a&&(a=a[1].join(""));null===a&&(b=g);return a}function A(a){a.sort();for(var b=null,d=[],e=0;e<a.length;e++)a[e]!==b&&(d.push(a[e]),b=a[e]);return d}function B(){for(var a=1,c=1,d=!1,g=0;g<Math.max(b,q);g++){var f=e.charAt(g);"\n"===f?(d||a++,c=1,d=!1):"\r"===f||"\u2028"===f||"\u2029"===f?(a++,c=1,d=!0):(c++,d=!1)}return{c:a,b:c}}var m={addi:v,multi:n,unary:w,primary:p,number:t,has:y,valueof:r,string:s};if(void 0!==
l){if(void 0===m[l])throw Error("Invalid rule name: "+x(l)+".");}else l="addi";var b=0,k=0,q=0,u=[],m=m[l]();if(null===m||b!==e.length){var m=Math.max(b,q),C=m<e.length?e.charAt(m):null,z=B();throw new this.a(A(u),C,m,z.c,z.b);}return m},toSource:function(){return this.d},a:function(e,l,h,p,n){this.name="SyntaxError";switch(e.length){case 0:e="end of input";break;case 1:e=e[0];break;default:e=e.slice(0,e.length-1).join(", ")+" or "+e[e.length-1]}l=l?x(l):"end of input";this.message="Expected "+e+
" but "+l+" found.";this.offset=h;this.c=p;this.b=n}};p.a.prototype=Error.prototype;return p}();