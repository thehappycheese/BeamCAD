///~ lib/nDOMTools/DOMTools.scrobble.js
///~ lib/nTable/nTable.js
///~ lib/nArimsys/nArimsys.js
///~ data/Data.js

var tab = new nTable(10,2);

var asstab = new nTable(1,1);

ui = DOMTools.scrobble(document.body);

ui.tab3.appendChild(tab.dom);
ui.leftbarcontent.appendChild(asstab.dom);





var dat = data_AS3600Variables;
var arim = new Arimsys(dat);

rendertables(["name","notation","value","unit"]);
function rendertables (headings){
	tab.init(dat().count() + 1, headings.length);
	// TODO: Fix this problem with setvalues
	var cell = tab.getCell(0,0);//.setValues([headings]);
		
	// TODO: Get range object from table, apply formatting options to range;
	do{
		cell.dom.className = "heading";
		cell = cell.getRight();
	}while(cell!=undefined)
	// TODO: Change this awful method of math-jaxing things; remove it entirely from the nCell features?
	cell = tab.getCell(1, 1);
	// TODO: create a range.callFunction("funcname",[args,args,...])
	// TODO: remove cell manipulation from nTable and put it in nRange
	// TODO: create nRange.getRange; nrange.getCell
	do{
		cell.convertToMathJax()
		cell = cell.getDown();
	}while(cell)
	
	var x = 0;
	var y = 1;
	dat().order("name").each(function(r){

		headings.forEach(function(heading){
			tab.getCell(y,x).setValue(r[heading]).dom.title = r["description"];
			x++;
		})
		x=0;
		y++;
	});
	

	var av = arim.getAvaliable();
	console.log(av)
	asstab.init(av.length+1,2);
	asstab.getCell(0,0).merge(1,2).setValue("Possible to Find:").dom.className = "heading";
	cell = asstab.getCell(1,0);
	var butcell,butt;
	var i  = 0;
	do{
		cell.setValue(dat({"id":av[i]}).first().notation).convertToMathJax();
		
		butt = document.createElement("button");
		butt.innerHTML =  "calculate it";
		butt.vid = av[i];
		butt.onclick = function(){
			dat({"id":this.vid}).first().value = "###"
			rendertables(["name","notation","value","unit"]);
		}.bind(butt);
		butcell = cell.getRight();
		butcell.dom.appendChild(butt);
		
		i++
		cell = cell.getDown();
	}while (cell);
	
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.body]);
	
}