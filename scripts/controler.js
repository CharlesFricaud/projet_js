var controler = {};
var saisie=view.get_zone_saisie();

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

controler.selectionner_recherche = function selectionner_recherche(elt) {
  model.recherche_courante_news = [];
  resultats.innerHTML="";
  wait.style.display="block";
  var parent = elt.parentNode;
  var content = parent.innerText;
  saisie.value=content;

  model.recherche_courante = saisie.value;
  if(model.recherche_courante in localStorage){
    model.recherche_courante_news =  JSON.parse(localStorage.getItem(model.recherche_courante));
    for (var i = 0; i < recherche_courante_news.length; i++) {
      resultats.innerHTML+=('<p class="titre_result"><a class="titre_news" href='+model.recherche_courante_news[i].url+'target="_blank">'+model.recherche_courante_news[i].titre+'</a><span class="date_news">'+recherche_courante_news[i].date+'</span><span class="action_news" onclick="controler.supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>');
    }
  }
  else{
    console.log("aucune annonce sauvegardée pour cette recherche");
  }
  wait.style.display="none";
}


controler.rechercher_nouvelles = function rechercher_nouvelles() {
	resultats.innerHTML="";
  wait.style.display="block";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        var data = this.response;
        for (var i = 0; i < data.length; i++) {
          resultats.innerHTML+=('<p class="titre_result"><a class="titre_news" href='+data[i].url+'target="_blank">'+data[i].titre+'</a><span class="date_news">'+data[i].date+'</span><span class="action_news" onclick="controler.sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>');
        }
      }
  };
  xhr.open("GET","https://cavi.alwaysdata.net/search-internships.php?data="+model.recherche_courante,true);
  xhr.responseType = "json";
  xhr.send();
  wait.style.display="none";
}

controler.sauver_nouvelle = function sauver_nouvelle(elt) {
  model.sauver_nouvelle(elt);
}

controler.supprimer_recherche = function supprimer_recherche(elt) {
  var parent = elt.parentNode;
  var id = model.recherches.indexOf(parent.innerText);
  recherches.splice(id,1);
  var suparent = parent.parentNode;
  suparent.removeChild(parent);
  localStorage.setItem("recherches",recherches);
  localStorage.removeItem(parent.innerText);
}


controler.ajouter_recherche = function ajouter_recherche() {
  if(recherches.indexOf(saisie.value) < 0){
  	  model.ajouter_recherche(saisie.value);
      recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'+saisie.value+'</label><img src="img/croix30.jpg" onclick="controler.supprimer_recherche(this)" class="icone-croix"/></p>');
      localStorage.setItem("recherches",recherches);
  }
  else
  {
  	  console.log("already saved");
  }
}

controler.supprimer_recherche = function supprimer_recherche(elt) {
  var parent = elt.parentNode;
  var id = recherches.indexOf(parent.innerText);
  recherches.splice(id,1);
  var suparent = parent.parentNode;
  suparent.removeChild(parent);
  localStorage.setItem("recherches",recherches);
  localStorage.removeItem(parent.innerText);
}
