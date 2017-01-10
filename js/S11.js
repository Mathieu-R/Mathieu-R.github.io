// Variables globales 

let fruits = [ // tableau d'objets 
	{fruit: 'poire', prix: 4.16},
	{fruit: 'ananas', prix: 2.99},
	{fruit: 'dattes', prix: 6.25},
	{fruit: 'orange', prix: 1.50},
	{fruit: 'pomme', prix: 1.79},
	{fruit: 'banane', prix: 2.31},
	{fruit: 'citron', prix: 3.70},
	{fruit: 'raisin', prix: 2.49},
	{fruit: 'noix', prix: 7.80},
	{fruit: 'prune', prix: 4.52},
	{fruit: 'peche', prix: 3.99}
];

let commandes = [];

let total = 0;

// Fonction utilitaires 

function setElem(id, v) {
	document.getElementById(id).innerHTML = v;
}

function getElem(id) {
	return document.getElementById(id).innerHTML;
}

function addElem(id, v) {
	document.getElementById(id).innerHTML += v;
}

function refElem(id) {
	return document.getElementById(id);
}

// Fonctions

function init() {
	let sort = fruits.sort((x, y) => x.fruit > y.fruit ? +1 : x.fruit < y.fruit ? -1 : 0)

	Array.from(document.getElementsByTagName('select')).forEach((s) => s.setAttribute("size", fruits.length))

	sort.forEach((el) => {
		addElem("left_list", `<option>${el.fruit}</option>`)
		addElem("right_list", `<option>${el.prix}</option>`)
	})

	setElem('total', total.toFixed(2))
}

function ajouterFruit(f) {
	let qty = parseFloat(f.weight.value)
	let article = f.left_list.value
	let prix = parseFloat(f.right_list.value)

	let index = commandes.findIndex((c) => c.article == article)

	if (index === -1) {
		commandes.push({
			article: article,
			prix: prix,
			qty: qty
		})
	} else {
		commandes[index].qty = qty
	}
	

	total += (prix * qty);

	makeTable()

	return false;
}

function makeTable() {
	let s = "";

	commandes.sort((x, y) => x.article > y.article ? +1 : x.article < y.article ? -1 : 0)
	commandes.forEach((c) => {
		s += `<tr><td class=article>${c.article}</td><td class=info>${c.prix}</td><td class=info>${c.qty}</td><td class=prix>${(c.prix * c.qty).toFixed(2)}</td></tr>`
	})

	setElem('tbody', s)
	setElem('total', total.toFixed(2))
}

function enleverFruit() {
	let article = document.frm.left_list.value;

	let index = commandes.findIndex((c) => c.article == article)

	if (index !== -1) commandes.splice(index, 1)

	makeTable()
}

function imprimerCommande() {
	DrawHTMLBarcode_Code39()
	window.print()
}

function reinit() {

}

function synchroSelect(s) {
	refElem("left_list").selectedIndex = s.selectedIndex
	refElem("right_list").selectedIndex = s.selectedIndex 
}