var model = {};
model.recherche_courante = "";
model.recherches = [];
model.recherche_courante_news = [];

saisie = document.getElementById("zone_saisie");
recherches_S = document.getElementById("recherches-stockees");
resultats = document.getElementById("resultats");
wait = document.getElementById("wait");

class Annonce{
  constructor(titre, date, url){
    this.titre = titre;
    this.date = date;
    this.url = url;
  }
}

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

model.ajouter_recherche = function ajouter_recherche() {
  if(recherches.indexOf(saisie.value) < 0){
  	  recherches.push(saisie.value);
      recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'+saisie.value+'</label><img src="img/croix30.jpg" onclick="controler.supprimer_recherche(this)" class="icone-croix"/></p>');
      localStorage.setItem("recherches",recherches);
  }
  else
  {
  	  console.log("already saved");
  }
}

model.supprimer_recherche = function supprimer_recherche(elt) {
  var parent = elt.parentNode;
  var id = recherches.indexOf(parent.innerText);
  recherches.splice(id,1);
  var suparent = parent.parentNode;
  suparent.removeChild(parent);
  localStorage.setItem("recherches",recherches);
  localStorage.removeItem(parent.innerText);
}

model.sauver_nouvelle = function sauver_nouvelle(elt) {
  var image = elt.lastChild;
  var parent = elt.parentNode;
  image.setAttribute('src','img/disk15.jpg');
  elt.setAttribute('onclick',"controler.supprimer_nouvelle(this)");

  var titre = parent.getElementsByTagName("a")[0].innerHTML;
  var date = parent.getElementsByTagName("span")[0].innerHTML;
  var url = parent.getElementsByTagName("a")[0].href;
  var annonce = new Annonce(titre, date, url);

  if(indexOfResultat(recherche_courante_news, annonce) == -1){
  	  recherche_courante_news.push(annonce);
      localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
  }
  else
  {
  	  console.log("already saved");
  }
}
