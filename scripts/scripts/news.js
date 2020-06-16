// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];

saisie = document.getElementById("zone_saisie");
recherches_S = document.getElementById("recherches-stockees");
resultats = document.getElementById("sortable");
wait = document.getElementById("wait");
titreR = document.getElementById("result");

/**
 * Fonction utilitaire qui cherche si l'objet résultat (o) est bien
 * présent dans dans le tableau des résultats (t)
 * => Si un résultat a exactement le même titre et la même date,
 *     la fonction retourne l'index de celui-ci dans le tableau
 * => Sinon, la fonction retourne -1
*/
function indexOfResultat(t, o){
	try {
    var limit = t.length;
  } catch (e) {
    var limit = 0;
  }
	var trouve = false;
	var i = 0;
	while( (!trouve) && (i<limit) ){
		var c = t[i];
		if ((c.titre == o.titre) && (c.date == o.date)){
			trouve = true;
		}
		i++;
	}
	if (trouve) { return (i-1); }
	else { return -1; }
}


function ajouter_recherche() {
  if(recherches.indexOf(saisie.value) < 0){
  	  recherches.push(saisie.value);
      recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+saisie.value+'</label><img src="img/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
      localStorage.setItem("recherches",recherches);
  }
  else
  {
  	  console.log("already saved");
  }
}


function supprimer_recherche(elt) {
  var parent = elt.parentNode;
  var id = recherches.indexOf(parent.innerText);
  recherches.splice(id,1);
  var suparent = parent.parentNode;
  suparent.removeChild(parent);
  localStorage.setItem("recherches",recherches);
  localStorage.removeItem(parent.innerText);
}


function selectionner_recherche(elt) {
  recherche_courante_news = [];
  resultats.innerHTML="";
  wait.style.display="block";
  var parent = elt.parentNode;
  var content = parent.innerText;
  saisie.value=content;

  recherche_courante = saisie.value;
  if(recherche_courante in localStorage){
    recherche_courante_news =  JSON.parse(localStorage.getItem(recherche_courante));
    for (var i = 0; i < recherche_courante_news.length; i++) {
      resultats.innerHTML+=('<p class="titre_result"><a class="titre_news" href='+recherche_courante_news[i].url+'target="_blank">'+recherche_courante_news[i].titre+'</a><span class="date_news">'+recherche_courante_news[i].date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>');
      titreR.innerText="résultats  ("+Number(i+1)+")";
    }
  }
  else{
    console.log("aucune annonce sauvegardée pour cette recherche");
  }
  wait.style.display="none";
}


function init() {
  if(localStorage.getItem("recherches"))
  {
    var stockage = localStorage.getItem("recherches");
    stockage = stockage.split(",");
    for (var i = 0; i < stockage.length; i++) {
      recherches.push(stockage[i]);
      recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+stockage[i]+'</label><img src="img/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
    }
  }
}


function rechercher_nouvelles() {
	resultats.innerHTML="";
  wait.style.display="block";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        var data = this.response;
        for (var i = 0; i < data.length; i++) {
          if(indexOfResultat(JSON.parse(localStorage.getItem(recherche_courante)), data[i]) == -1){
            resultats.innerHTML+=('<p class="titre_result ui-widget-content" id="draggable"><a class="titre_news" href='+data[i].url+'target="_blank">'+data[i].titre+'</a><span class="date_news">'+data[i].date+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>');
            titreR.innerText="résultats  ("+Number(i+1)+")";
          }
          else{
            resultats.innerHTML+=('<p class="titre_result ui-widget-content" id="draggable"><a class="titre_news" href='+data[i].url+'target="_blank">'+data[i].titre+'</a><span class="date_news">'+data[i].date+'</span><span class="action_news" onclick="sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>');
            titreR.innerText="résultats  ("+Number(i+1)+")";
          }
        }
      }
  };
  recherche_courante = saisie.value;
  xhr.open("GET","https://cavi.alwaysdata.net/search-internships.php?data="+recherche_courante,true);
  xhr.responseType = "json";
  xhr.send();
  wait.style.display="none";
}


class Annonce{
  constructor(titre, date, url){
    this.titre = titre;
    this.date = date;
    this.url = url;
  }
}


function sauver_nouvelle(elt) {
  var image = elt.lastChild;
  var parent = elt.parentNode;
  image.setAttribute('src','img/disk15.jpg');
  elt.setAttribute('onclick',"supprimer_nouvelle(this)");

  var titre = parent.getElementsByTagName("a")[0].innerHTML;
  var date = parent.getElementsByTagName("span")[0].innerHTML;
  var url = parent.getElementsByTagName("a")[0].href;
  var annonce = new Annonce(titre, date, url);

  if(indexOfResultat(recherche_courante_news, annonce) == -1){
    if(recherche_courante in localStorage){
      recherche_courante_news =  JSON.parse(localStorage.getItem(recherche_courante));
      recherche_courante_news.push(annonce);
      localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
    }
    else {
        recherche_courante_news = [];
        recherche_courante_news.push(annonce);
        localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
    }
  }
  else
  {
  	  console.log("already saved");
  }
}


function supprimer_nouvelle(elt) {
  var image = elt.lastChild;
  var parent = elt.parentNode;
  image.setAttribute('src','img/horloge15.jpg');
  elt.setAttribute('onclick',"sauver_nouvelle(this)");

  var titre = parent.getElementsByTagName("a")[0].innerHTML;
  var date = parent.getElementsByTagName("span")[0].innerHTML;
  var url = parent.getElementsByTagName("a")[0].href;
  var annonce = new Annonce(titre, date, url);

  try {
    recherche_courante_news.splice(indexOfResultat(recherche_courante_news, annonce), 1);
    localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
  } catch (e) {
      console.log("problème suppr_nouvelle");
  }
}
