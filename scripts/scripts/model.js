var model = {};
model.recherche_courante = "";
model.recherches = [];
model.recherche_courante_news = [];

model.indexOfResultat = function (t, o){
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

model.ajouter_recherche = function(elmt){
	console.log(elmt);
  model.recherches.push(elmt);
}

model.add_recherches_courantes_news = function(elt){
  model.recherche_courante_news.push(elt);
}

model.set_Local_Storage_Recherches = function(){
  localStorage.setItem("recherches",recherches);
}

model.set_Local_Storage = function(elt, tab){
  localStorage.setItem(elt,tab);
}

model.recherches_Splice = function (id){
  model.recherches.splice(id,1);
}

model.recherches_courante_news_Splice = function(id){
  model.recherches_courantes_news.splice(id,1);
}

model.remove_Local_Storage = function(elmt){
  localStorage.removeItem(elmt);
}

model.blank_recherche_courante_news=function(){
  model.recherche_courante_news = [];
}

model.set_recherche_courante = function(elmt){
  model.recherche_courante = elmt;
}

model.get_recherche_courante = function(){
  return model.recherche_courante;
}

model.set_recherche_courante_news = function(){
  model.recherche_courante_news =  JSON.parse(localStorage.getItem(model.recherche_courante));
}

model.get_recherche_courante_news = function(){
  return model.recherche_courante_news;
}

model.get_recherche_courante_news_id = function(i){
  return model.recherche_courante_news[i];
}

model.get_local_Storage_recherches = function(){
   return localStorage.getItem("recherches");
}
