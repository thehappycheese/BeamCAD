
var geom = (function(){

var exports = {};

exports.Point = function Point (ax,ay){
	this.x = ax || 0;
	this.y = ay || 0;
	
	this.clone = (function(){
		return new Point(this.x, this.y);
	}).bind(this);
	
	this.add = (function(xy){
		this.x += xy.x;
		this.y += xy.y;
		return this;
	}).bind(this);
	
	this.subtract = (function(xy){
		this.x -= xy.x;
		this.y -= xy.y;
		return this;
	}).bind(this);
	
	this.multiply = (function(scalar){
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}).bind(this);
	
	this.dot = (function(xy){
		return this.x*xy.x + this.y*xy*y;
	}).bind(this);
	
	this.length = (function(){
		return Math.sqrt(this.lengthSquared());
	}).bind(this);
	
	this.normalise = (function(){
		var len = this.length();
		this.x /= len;
		this.y /= len;
		return this;
	}).bind(this);
	
	this.lengthSquared = (function(){
		return this.x*this.x + this.y*this.y;
	}).bind(this);
	
	this.dist = (function(xy){
		return Math.sqrt(Math.pow(this.x-xy.x, 2) + Math.pow(this.y-xy.y,2));
	}).bind(this);
	
	this.distSq = (function(xy){
		return Math.sqrt(Math.pow(this.x-xy.x, 2) + Math.pow(this.y-xy.y,2));
	}).bind(this);
	
	this.toString = (function(){
		return "{"+this.x.toFixed(1)+" , "+this.y.toFixed(1)+"}";
	}).bind(this);
}







return exports;
})();