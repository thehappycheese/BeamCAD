{
	"prettyheader":
		["ID","Prerequisite","Name","Description","Notation","UNICODE","Value","Unit","Assumable"],
	"header":
		["id","prereq","name","description","notation","unicode","value","unit","assumable"],
	"data":
		[
			["Ag","!Ag&B&D","Gross sectional area","gross cross-sectional area of a member","A_g","A_g","","mm^2",""],
			["As","","","cross-sectional area of reinforcement (see Clauses 3.4.3.2 and 13.2.2);","A_s","A_s","","",""],
			["Asc","","","cross-sectional area of compressive reinforcement","A_{sc}","A_sc","","",""],
			["Ast","!Ast","Area of tensile steel","cross-sectional area of longitudinal tensile reinforcement; or cross-sectional area of reinforcement in the zone that would be in tension under the design loads if the effects of prestress and axial loads are ignored","A_{st}","A_st","","mm^2","yes"],
			["B","!B","Breadth of beam","width of a rectangular cross-section or member","b","b","","mm","yes"],
			["bt","!bt","Beam type","","","Beam Type","T-Beam","","no"],
			["Cc","!Cc&dn","Concrete Compression","","C_c","C_c","","kN","no"],
			["cchk","!cchk&phi&mstar&muo","Capacity Check","","","Capacity Check","","","no"],
			["d","!d","Depth to tensile steel centroid","effective depth of a cross-section in the plane of bending","d","d","","mm","yes"],
			["D","!D","Depth of beam","overall depth of a cross-section in the plane of bending; or depth or breadth of the symmetrical prism as appropriate (see Clause 12.5.6)","D","D","","mm","yes"],
			["dn","!dn&alphatwo&fc&gamma&B&fsy&Ast","Depth to neutral axis","","d_n","d_n","","mm","yes"],
			["fc","!fc","Concrete characteristic strength","characteristic compressive (cylinder) strength of concrete at 28 days","f'_{c}","f'_c","","MPa","yes"],
			["fctf","!fctf&fc","Concrete characteristic tensile strength","measured flexural tensile strength of concrete (see Clause 3.1.1.3)","f'_{ct.f}","f'_ct.f","","MPa","no"],
			["I","!I&B&D","Second moment of area","second moment of area of the uncracked concrete cross-section about the centroidal axis","I","I","","mm^4","no"],
			["Icr","!Icr","Transformed area second moment of area","second moment of area of a cracked section with the reinforcement transformed to an equivalent area of concrete","I_{cr}","I_cr","","",""],
			["Ief","!Ief","Effective second moment of area","an effective second moment of area (see Clause 8.5.3)","I_{ef}","I_ef","","",""],
			["Iefmax","!Iefmax","Maximum effective second moment of area","maximum effective second moment of area (see Clause 8.5.3)","I_{ef.max}","I_ef.max","","",""],
			["ku","!ku&d&dn","k ratio","neutral axis parameter being the ratio, at ultimate strength under any combination of bending and compression, of the depth to the neutral axis from the extreme compressive fibre to d","k_u","k_u","","","no"],
			["muo","!muo&Cc&Ts&dn&gamma","Moment capacity","ultimate strength in bending, without axial force, at a cross-section","M_{uo}","M_ou","","kNm","no"],
			["muomin","!muomin&Z&fctf","Minimum design capacity","minimum required strength in bending at a critical cross-section (see Clause 8.1.6.1)","(M_{uo})_{min}","M_ou_min","","","no"],
			["mstar","!mstar","Moment design capacity","design bending moment at a cross-section","M^*","M*","","kNm","yes"],
			["Ts","!Ts&Ast&fsy","Force in tensile steel","","T_s","T_s","","kN","no"],
			["Z","!Z&I","Section modulus","section modulus of the uncracked cross-section, referred to the extreme fibre at which flexural cracking occurs (see Clause 8.1.6.1)","Z","Z","","mm^3","no"],
			["alphatwo","!alphatwo","Alpha2 Coefficient","Coefficient of concrete compressive area in the \"Equivalent compression block method\"","\\alpha_2","\u03b1\u2082","","","no"],
			["fsy","!fsy","Steel characteristic yield strength","characteristic yield strength of reinforcement (referred to as Re in AS/NZS 4671), determined in accordance with Clause 3.2.1","\\sigma_{ys}","\u03c3_ys",500,"","yes"],
			["gamma","!gamma&fc","Gamma Ratio","the ratio, under design bending or design combined bending and compression, of the depth of the assumed rectangular compressive stress block to k_u * d","\\gamma","\u03a5","","","no"],
			["phi","!phi","Capacity reduction factor","capacity reduction factor for design using linear elastic analysis (see Clause 2.2.2)","\\Phi","\u03a6","","","yes"],
			["Ec","!Ec","Concrete modulus of elasticity","mean value of the modulus of elasticity of concrete at 28 days","E_c","E_c","","",""]
		]
	
}