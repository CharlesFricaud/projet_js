var view = {};

view.init = function init() {
  if(localStorage.getItem("recherches"))
  {
    var stockage = localStorage.getItem("recherches");
    stockage = stockage.split(",");
    for (var i = 0; i < stockage.length; i++) {
      recherches.push(stockage[i]);
      recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="controler.selectionner_recherche(this)">'+stockage[i]+'</label><img src="img/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
    }
  }
}

view.get_zone_saisie = function get_zone_saisie()  {
  var saisie = document.getElementById("zone_saisie");
  return saisie;
}
