/*
 * Still to add: >= <=   a<1,2>
 */

start
	= addi

addi
	= left:multi "|" right:addi {
		return ["or",left,right];
	}
	
	/ multi

multi
	= left:unary "&" right:multi {
		return ["and",left,right];
	}
	/ left:valueof "=" right:string {
		return ["eq",left,right];
	}
	/ left:valueof "=" right:number {
		return ["eq",left,right];
	}
	/ left:string "=" right:valueof{
		return ["eq",right,left];
	}
	/ left:number "=" right:valueof {
		return ["eq",right,left];
	}
	/ unary
	
	
unary
	= "!" right:multi {
		return ["not",right];
	}
	/ primary
	
primary
	= has
	/ number
	/ string
	/ "(" inparens:addi ")" {
		return inparens;
	}

number "number"
	= digits:[0-9\.]+ {
		return parseFloat(digits.join(""));
	}
	
has
	= letters:[a-zA-Z_]+ {
		return ["has",letters.join("")];
	}
valueof
	= letters:[a-zA-Z_]+ {
		return letters.join("");
	}

string
	= "\"" letters:[^"]+ "\"" {
		return letters.join("");
	}