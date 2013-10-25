
var nParser = function () {
	function y(e) { return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"' } var n = {
		parse: function (e, l) {
			function h(a) { b < q || (b > q && (q = b, u = []), u.push(a)) } function v() {
				var a, c, d, g, f; f = g = b; a = p(); null !== a ? (124 === e.charCodeAt(b) ? (c = "|", b++) : (c = null, 0 === k && h('"|"')), null !== c ? (d = v(), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a =
				null, b = f); null !== a && (a = ["or", a[0], a[2]]); null === a && (b = g); null === a && (a = p()); return a
			} function p() {
				var a, c, d, g, f; f = g = b; a = w(); null !== a ? (38 === e.charCodeAt(b) ? (c = "&", b++) : (c = null, 0 === k && h('"&"')), null !== c ? (d = p(), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a = null, b = f); null !== a && (a = ["and", a[0], a[2]]); null === a && (b = g); null === a && (f = g = b, a = r(), null !== a ? (61 === e.charCodeAt(b) ? (c = "=", b++) : (c = null, 0 === k && h('"="')), null !== c ? (d = s(), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a = null, b = f), null !== a && (a = ["eq",
				a[0], a[2]]), null === a && (b = g), null === a && (f = g = b, a = r(), null !== a ? (61 === e.charCodeAt(b) ? (c = "=", b++) : (c = null, 0 === k && h('"="')), null !== c ? (d = t(), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a = null, b = f), null !== a && (a = ["eq", a[0], a[2]]), null === a && (b = g), null === a && (f = g = b, a = s(), null !== a ? (61 === e.charCodeAt(b) ? (c = "=", b++) : (c = null, 0 === k && h('"="')), null !== c ? (d = r(), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a = null, b = f), null !== a && (a = ["eq", a[2], a[0]]), null === a && (b = g), null === a && (f = g = b, a = t(), null !== a ? (61 === e.charCodeAt(b) ?
				(c = "=", b++) : (c = null, 0 === k && h('"="')), null !== c ? (d = r(), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a = null, b = f), null !== a && (a = ["eq", a[2], a[0]]), null === a && (b = g), null === a && (a = w()))))); return a
			} function w() { var a, c, d, g; g = d = b; 33 === e.charCodeAt(b) ? (a = "!", b++) : (a = null, 0 === k && h('"!"')); null !== a ? (c = x(), null !== c ? a = [a, c] : (a = null, b = g)) : (a = null, b = g); null !== a && (a = ["not", a[1]]); null === a && (b = d); null === a && (a = x()); return a } function x() {
				var a, c, d, g, f; a = n(); null === a && (a = t(), null === a && (a = s(), null === a && (f = g = b, 40 === e.charCodeAt(b) ?
				(a = "(", b++) : (a = null, 0 === k && h('"("')), null !== a ? (c = v(), null !== c ? (41 === e.charCodeAt(b) ? (d = ")", b++) : (d = null, 0 === k && h('")"')), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)) : (a = null, b = f), null !== a && (a = a[1]), null === a && (b = g)))); return a
			} function t() {
				var a, c, d; k++; d = b; /^[0-9.]/.test(e.charAt(b)) ? (c = e.charAt(b), b++) : (c = null, 0 === k && h("[0-9.]")); if (null !== c) for (a = []; null !== c;) a.push(c), /^[0-9.]/.test(e.charAt(b)) ? (c = e.charAt(b), b++) : (c = null, 0 === k && h("[0-9.]")); else a = null; null !== a && (a = parseFloat(a.join("")));
				null === a && (b = d); k--; 0 === k && null === a && h("number"); return a
			} function n() { var a, c, d; d = b; /^[a-zA-Z_]/.test(e.charAt(b)) ? (c = e.charAt(b), b++) : (c = null, 0 === k && h("[a-zA-Z_]")); if (null !== c) for (a = []; null !== c;) a.push(c), /^[a-zA-Z_]/.test(e.charAt(b)) ? (c = e.charAt(b), b++) : (c = null, 0 === k && h("[a-zA-Z_]")); else a = null; null !== a && (a = ["has", a.join("")]); null === a && (b = d); return a } function r() {
				var a, c, d; d = b; /^[a-zA-Z_]/.test(e.charAt(b)) ? (c = e.charAt(b), b++) : (c = null, 0 === k && h("[a-zA-Z_]")); if (null !== c) for (a = []; null !== c;) a.push(c),
				/^[a-zA-Z_]/.test(e.charAt(b)) ? (c = e.charAt(b), b++) : (c = null, 0 === k && h("[a-zA-Z_]")); else a = null; null !== a && (a = a.join("")); null === a && (b = d); return a
			} function s() {
				var a, c, d, g, f; f = g = b; 34 === e.charCodeAt(b) ? (a = '"', b++) : (a = null, 0 === k && h('"\\""')); if (null !== a) {
					/^[^"]/.test(e.charAt(b)) ? (d = e.charAt(b), b++) : (d = null, 0 === k && h('[^"]')); if (null !== d) for (c = []; null !== d;) c.push(d), /^[^"]/.test(e.charAt(b)) ? (d = e.charAt(b), b++) : (d = null, 0 === k && h('[^"]')); else c = null; null !== c ? (34 === e.charCodeAt(b) ? (d = '"', b++) : (d = null, 0 ===
					k && h('"\\""')), null !== d ? a = [a, c, d] : (a = null, b = f)) : (a = null, b = f)
				} else a = null, b = f; null !== a && (a = a[1].join("")); null === a && (b = g); return a
			} function A(a) { a.sort(); for (var b = null, d = [], e = 0; e < a.length; e++) a[e] !== b && (d.push(a[e]), b = a[e]); return d } function B() { for (var a = 1, c = 1, d = !1, g = 0; g < Math.max(b, q) ; g++) { var f = e.charAt(g); "\n" === f ? (d || a++, c = 1, d = !1) : "\r" === f || "\u2028" === f || "\u2029" === f ? (a++, c = 1, d = !0) : (c++, d = !1) } return { c: a, b: c } } var m = { addi: v, multi: p, unary: w, primary: x, number: t, has: n, valueof: r, string: s }; if (void 0 !==
			l) { if (void 0 === m[l]) throw Error("Invalid rule name: " + y(l) + "."); } else l = "addi"; var b = 0, k = 0, q = 0, u = [], m = m[l](); if (null === m || b !== e.length) { var m = Math.max(b, q), C = m < e.length ? e.charAt(m) : null, z = B(); throw new this.a(A(u), C, m, z.c, z.b); } return m
		}, toSource: function () { return this.d }, a: function (e, l, h, n, p) {
			this.name = "SyntaxError"; switch (e.length) { case 0: e = "end of input"; break; case 1: e = e[0]; break; default: e = e.slice(0, e.length - 1).join(", ") + " or " + e[e.length - 1] } l = l ? y(l) : "end of input"; this.message = "Expected " + e +
			" but " + l + " found."; this.offset = h; this.c = n; this.b = p
		}
	}; n.a.prototype = Error.prototype; return n
}();