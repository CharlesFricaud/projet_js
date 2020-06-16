var controler = {};
var saisie=view.get_zone_saisie();

class Annonce{
  constructor(titre, date, url){
    this.titre = titre;
    this.date = date;
    this.url = url;
  }
}

controler.ajouter_recherche = function () {
  var recherche = view.get_zone_saisie();
  if(model.recherches.indexOf(recherche) < 0){
      model.ajouter_recherche(recherche.value);
      view.set_Recherches_S(recherche.value);
      model.set_Local_Storage_Recherches();
  }
  else
  {
  	  console.log("already saved");
  }
}

controler.supprimer_recherche = function(elt) {
  var parent = elt.parentNode;
  var id = model.recherches.indexOf(parent.innerText);
  model.recherches_Splice(id);
  var suparent = parent.parentNode;
  suparent.removeChild(parent);
  model.set_Local_Storage_Recherches();
  model.remove_Local_Storage(parent.innerText);
}


controler.selectionner_recherche = function(elt) {
  model.blank_recherche_courante_news(); recherche_courante_news = [];
  view.blank_resultats();
  view.set_wait();
  var parent = elt.parentNode;
  var content = parent.innerText;
  view.set_zone_saisie(content);
  model.set_recherche_courante(view.get_zone_saisie.value);

  if(model.get_recherche_courante() in localStorage){
    model.set_recherche_courante_news(model.get_recherche_courante());
    for (var i = 0; i < model.get_recherche_courante_news().length; i++) {
      view.set_resultats(model.get_recherche_courante_news_id(i));
      view.set_titreR(Number(i+1));
    }
  }
  else{
    console.log("aucune annonce sauvegardée pour cette recherche");
  }
  view.unset_wait();
}


controler.init = function () {
  if(model.get_local_Storage_recherches())
  {
    var stockage = model.get_local_Storage_recherches();
    stockage = stockage.split(",");
    for (var i = 0; i < stockage.length; i++) {
      model.ajouter_recherche(stockage[i]);
      view.set_Recherches_S(stockage[i]);
    }
  }
}


controler.rechercher_nouvelles = function() {
	view.blank_resultats();
  view.set_wait();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        var data = this.response;
        for (var i = 0; i < data.length; i++) {
          console.log(data[i]);
          view.set_resultats_r(data[i]);
          view.set_titreR(Number(i+1));
        }
      }
  }

  model.set_recherche_courante(view.get_zone_saisie().value);
  var rc = model.get_recherche_courante();
  xhr.open("GET","https://cavi.alwaysdata.net/search-internships.php?data="+rc,true);
  xhr.responseType = "json";
  xhr.send();
  view.unset_wait();
}


controler.sauver_nouvelle = function (elt){
  var image = elt.lastChild;
  var parent = elt.parentNode;
  view.setAttribute_image(image,'src','img/disk15.jpg');
  view.setAttribut_parent(elt,'onclick',"controler.supprimer_nouvelle(this)");
  var annonce = new Annonce(view.get_titre_annonce(parent),view.get_date_annonce(parent), view.get_url_annonce(parent));

  if(model.indexOfResultat(model.get_recherche_courante_news(), annonce) == -1){
    if(model.get_recherche_courante() in localStorage){
      model.set_recherche_courante_news(JSON.parse(localStorage.getItem(model.get_recherche_courante())));
      model.add_recherches_courantes_news(annonce);
      model.set_Local_Storage(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
    }
    else {
      model.blank_recherche_courante_news();
      model.add_recherches_courantes_news(annonce);
      model.set_Local_Storage(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
    }
  }
  else
  {
  	  console.log("already saved");
  }
}

controler.supprimer_nouvelle = function(elt) {
  var image = elt.lastChild;
  var parent = elt.parentNode;
  view.setAttribute_image(image,'src','img/horloge15.jpg');
  view.setAttribut_parent('onclick',"controler.sauver_nouvelle(this)");

  var annonce = new Annonce(view.get_titre_annonce(parent),view.get_date_annonce(parent), view.get_url_annonce(parent));

  try {
    model.recherches_courante_news_Splice(model.indexOfResultat(model.get_recherche_courante_news(), annonce));
      model.set_Local_Storage(recherche_courante,JSON.stringify(recherche_courante_news));
  } catch (e) {
      console.log("problème suppr_nouvelle");
  }
}
