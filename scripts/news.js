// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

saisie = document.getElementById("zone_saisie");


function ajouter_recherche() {
  if(!recherches.indexOf("saisie")){
  	recherches.appendChild(saisie);
    console.log(recherches),
  }
}


function supprimer_recherche(elt) {
	//TODO ...
}


function selectionner_recherche(elt) {
	//TODO ...
}


function init() {
	//TODO ...
}


function rechercher_nouvelles() {
	//TODO ...
}


function maj_resultats(res) {
	//TODO ...
}


function sauver_nouvelle(elt) {
	//TODO ...
}


function supprimer_nouvelle(elt) {
	//TODO ...
}
