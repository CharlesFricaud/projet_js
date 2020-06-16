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


//ajoute une recherche dans le localStorage & dans l'array recherches & dans la div avec l'id recherches-stockees (ssi elle n'y est pas déjà)
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


//suppression à l'appui utilisateur sur la croix
function supprimer_recherche(elt) {
  var parent = elt.parentNode;
  var id = recherches.indexOf(parent.innerText);    //on trouve l'index où se trouve la recherche à supprimer (dans le tableau recherches)
  recherches.splice(id,1);                          //on supprime 1 valeur à l'index trouvé précédemment
  var suparent = parent.parentNode;
  suparent.removeChild(parent);                     //on supprime la div associée
  localStorage.setItem("recherches",recherches);    //on met à jour le localStorage en conséquence
  localStorage.removeItem(parent.innerText);
}


//lors de l'appui de l'utilisateur sur une recherche stockée
function selectionner_recherche(elt) {
  recherche_courante_news = [];                     //on vide recherche_courante_news = sécurité pour éviter les rémanances d'autres traitements
  resultats.innerHTML="";                           //on vide la zone résultats du html = idem
  wait.style.display="block";                       //on affiche le spinner
  var parent = elt.parentNode;
  var content = parent.innerText;
  saisie.value=content;                             //on modifie la valeur de la zone de saisie = nom de la recherche stockée

  recherche_courante = saisie.value;                //la valeur de la recherche_courante est set à la valeur de la zone de saisie
  if(recherche_courante in localStorage){           //si il existe des recherches enregistrées pour cette recherche dans le localStorage, on les récupère et on les affiches dans la zone de résultats
    recherche_courante_news =  JSON.parse(localStorage.getItem(recherche_courante));
    for (var i = 0; i < recherche_courante_news.length; i++) {
      resultats.innerHTML+=('<p class="titre_result"><a class="titre_news" href='+recherche_courante_news[i].url+'target="_blank">'+recherche_courante_news[i].titre+'</a><span class="date_news">'+recherche_courante_news[i].date+'</span><span class="action_news" onclick="supprimer_nouvelle(this)"><img src="img/disk15.jpg"/></span></p>');
      titreR.innerText="résultats  ("+Number(i+1)+")";      //on modifie le titre de la zone de résultats pour donner le nombres de résultats affichés
    }
  }
  else{
    console.log("aucune annonce sauvegardée pour cette recherche");
  }
  wait.style.display="none";                      //on enlève le spinner
}


//récupération des valeurs du localStorage pour initialiser l'affichage
function init() {
  if(localStorage.getItem("recherches"))                        //si on a stocké des recherches
  {
    var stockage = localStorage.getItem("recherches");          //on les récupère
    stockage = stockage.split(",");
    for (var i = 0; i < stockage.length; i++) {                 //on les affiche et on les stocke dans le tableau recherches
      recherches.push(stockage[i]);
      recherches_S.innerHTML+=('<p class="titre-recherche"><label onclick="selectionner_recherche(this)">'+stockage[i]+'</label><img src="img/croix30.jpg" onclick="supprimer_recherche(this)" class="icone-croix"/></p>');
    }
  }
}


//envoie d'une requête
function rechercher_nouvelles() {
	resultats.innerHTML="";
  wait.style.display="block";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        var data = this.response;
        for (var i = 0; i < data.length; i++) {         //affichage des données renvoyées
          if(indexOfResultat(JSON.parse(localStorage.getItem(recherche_courante)), data[i]) == -1){         //on teste si ces données sont déjà enregistrées dans le localStorage associées à cette recherche = modofication de l'image
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


//on gère les objets par des instances d'une classe = pourrait servir à l'avenir
class Annonce{
  constructor(titre, date, url){
    this.titre = titre;
    this.date = date;
    this.url = url;
  }
}


//permet de sauver une annonce associée à l'associe dans le localStorage à la recherche_courante
function sauver_nouvelle(elt) {
  var image = elt.lastChild;
  var parent = elt.parentNode;
  image.setAttribute('src','img/disk15.jpg');                                                //on met en place le switch visuel enregistrer / supprimer l'annonce
  elt.setAttribute('onclick',"supprimer_nouvelle(this)");

  var titre = parent.getElementsByTagName("a")[0].innerHTML;
  var date = parent.getElementsByTagName("span")[0].innerHTML;
  var url = parent.getElementsByTagName("a")[0].href;
  var annonce = new Annonce(titre, date, url);                                              //on crée notre objet à partir des éléments qui constitue l'annonce

  if(indexOfResultat(recherche_courante_news, annonce) == -1){                              //si l'annonce n'est pas déjà dans le tableau des annonces sauvegardées pour cette recherche
    if(recherche_courante in localStorage){                                                 //on teste si la recherche courrante existe déjà dans le localStorage
      recherche_courante_news =  JSON.parse(localStorage.getItem(recherche_courante));      //si c'est le cas on met à jour son contenu
      recherche_courante_news.push(annonce);
      localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));
    }
    else {                                                                                  //sinon on initialise sont contenu avec la valeur à sauvegarder
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


//permet la suppression d'une annonce enregistrée
function supprimer_nouvelle(elt) {
  var image = elt.lastChild;
  var parent = elt.parentNode;
  image.setAttribute('src','img/horloge15.jpg');                                //on met en place le switch visuel enregistrer / supprimer l'annonce
  elt.setAttribute('onclick',"sauver_nouvelle(this)");

  var titre = parent.getElementsByTagName("a")[0].innerHTML;
  var date = parent.getElementsByTagName("span")[0].innerHTML;
  var url = parent.getElementsByTagName("a")[0].href;
  var annonce = new Annonce(titre, date, url);                                  //on crée un objet à partir des informations de l'annonce

  try {
    recherche_courante_news.splice(indexOfResultat(recherche_courante_news, annonce), 1);       //on essaie de supprimer 1 valeur à l'index renvoyé par la recherche de l'annonce dans le tableau de stockages des annonces
    localStorage.setItem(recherche_courante,JSON.stringify(recherche_courante_news));           //on met à jour le localStorage
  } catch (e) {
      console.log("problème suppr_nouvelle");
  }
}
