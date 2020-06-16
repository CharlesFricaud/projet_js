var view = {};

view.init = function init(stockage) { //stockage passé en paramètre à récupérer du localStorage
  if(localStorage.getItem("recherches"))
  {
    var recherches_S = document.getElementById("recherches");
    var stockage = localStorage.getItem("recherches");
    stockage = stockage.split(",");
    for (var i = 0; i < stockage.length; i++) {
      recherches.push(stockage[i]);
      view.recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'+stockage[i]+'</label><img src="img/croix30.jpg" onclick="controler.supprimer_recherche(this)" class="icone-croix"/></p>');
    }
  }
}

view.get_zone_saisie = function ()  {
  var saisie = document.getElementById("zone_saisie");
  return saisie;
}

view.set_zone_saisie = function (elmt){
    var saisie = document.getElementById("zone_saisie");
    saisie.value=elmt;
}

view.get_recherches_S = function ()  {
  var recherches_S = document.getElementById("recherches");
  return recherches_S;
}

view.set_Recherches_S = function(elmt){
  var recherches_S = document.getElementById("recherches-stockees");
  recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'+elmt+'</label><img src="img/croix30.jpg" onclick="controler.supprimer_recherche(this)" class="icone-croix"/></p>');
}


view.get_resultats = function(){
  var resultats = document.getElementById("sortable");
  return resultats;
}


view.get_wait = function (){
  var wait = document.getElementById("wait");
  return wait;
}

view.get_titre_R = function (){
  var titreR = document.getElementById("result");
  return titreR;
}

view.blank_resultats = function(){
  var resultats = document.getElementById("sortable");
  resultats.innerHTML="";
}

view.set_wait = function(){
  wait.style.display="block";
}

view.unset_wait = function(){
  wait.style.display="none";
}

view.set_resultats = function(elmt){
  var resultats = document.getElementById("sortable");
  resultats.innerHTML+=('<p class="titre_result"><a class="titre_news" href='+elmt.url+'target="_blank">'+elmt.titre+'</a><span class="date_news">'+elmt.date+'</span><span class="action_news" onclick="controler.supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>');
}

view.set_resultats_r = function(elmt){
  var resultats = document.getElementById("sortable");
  resultats.innerHTML+=('<p class="titre_result"><a class="titre_news" href='+elmt.url+'target="_blank">'+elmt.titre+'</a><span class="date_news">'+elmt.date+'</span><span class="action_news" onclick="controler.sauver_nouvelle(this)"><img src="img/horloge15.jpg"/></span></p>');
}

view.set_titreR = function(elmt){
  var titreR = document.getElementById("result");
  titreR.innerText="résultats  ("+elmt+")";
}

view.setAttribute_image = function(elt, att, val){
  elt.setAttribute(att,val);
}

view.setAttribut_parent = function(elt, att, val){
  elt.setAttribute(att,val);
}

view.get_titre_annonce = function(elt){
  return elt.getElementsByTagName("a")[0].innerHTML;
}

view.get_date_annonce = function(elt){
  return elt.getElementsByTagName("span")[0].innerHTML;
}

view.get_url_annonce = function(elt){
  return elt.getElementsByTagName("a")[0].href;
}
