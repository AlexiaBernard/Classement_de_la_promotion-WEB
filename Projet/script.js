//Fonction qui permet de récupérer tous les logins puis de les trier par ordre alphabétique
function getlog(src){
  let dest=[];
  const keys = Object.keys(src);
  for (let x of keys) {
    dest.push(x);
  }
  dest.sort();
  return dest;
}
let log=[];
log=getlog(logins);


//affiche les logins
/*let text="";
for(let i in log){
  text += "<li>" + log[i] + "</li>";
  document.getElementById("test").innerHTML = text;
  console.log(log[i]);
}*/

//------------------------------------Fonctions votes--------------------------------------//
/*
//affiche les votes
let text="";
for(let i in votes){
  for (let j in votes[i][matiere])
  text += "<li>" + i + " " + votes[i][matiere][j] +"</li>";
  document.getElementById("test").innerHTML = text;
  console.log(votes[i]);
}*/

/*
//affiche les votes
text="";
  //console.log(votes["andriama"]["ACDA"]);
for(let i in votes){
  for (let j in votes[i]){
    console.log(votes[i][j]);
    text += "<li>" + i + " " + votes[i][j] +"</li>";
    document.getElementById("test").innerHTML = text;
  }
}*/


let matrice_poids = [];

//init_mat_poids();

function init_mat_poids(){
  for (let i=0; i<taille ;i++){
    matrice_poids[i] = 1;
  }
}

var matrice_vote = new Array();

//------------------------------------Selection matières------------------------------------//

//Permet de mettre à jour le tableau des matières sélectionnées et les affiche
function clickFunc() { 
  let etudiants = [];
  let votants = [];
  //Tableau de toutes les matières disponibles
  let matieres = ['ACDA', 'ANG', 'APL', 'ART', 'ASR', 'EC', 'EGOD', 'MAT', 'SGBD', 'SPORT'];
  
  //Tableau des matières sélectionnées
  let mat_check = [];

  let text = "";
  let text2 = "";
  for (i=0; i<matieres.length; i++){
    var mati = document.getElementById(matieres[i]);
    if (mati.checked == true){
      if (mat_check.includes(mati) == false){
        mat_check.push(matieres[i]);
      }
      text += "<li>" + matieres[i] + "</li>";
    } else {
      if (mat_check.includes(mati) == true){
        mat_check.splice(matieres.lastIndexOf(mati),1);
      }
    }
    document.getElementById("test").innerHTML = text;
    //document.getElementById("test2").innerHTML = logins[log[0]]; //affiche le nom entier
  }

  //affiche les votes
  text="";
  //console.log(votes["andriama"]["ACDA"]);
  for(let i in votes){
    for (let j in votes[i]){
        text += "<li>" + i + " à voté pour " + votes[i][j] + " dans la matière "+ j + "</li>";
        //document.getElementById("test").innerHTML = text;
    }
  }

  //-----------------------Récupération des etudiants-------------------------//
  text2 = "";
  for(let i in votes){
    etudiants.push(i);
    votants.push(i);
    for(let j in votes[i]){
      for(let l in votes[i][j])
      if (etudiants.findIndex(k => k===votes[i][j][l]) == -1 && votes[i][j][l]!==""){
        etudiants.push(votes[i][j][l]);
      }
    }
  }
  //Affichage de la lsite des "participants" + définition de la taille de la matrice
  let taille = 0;
  for (let i in etudiants){
    taille++;
    //text2 += "<li>" + etudiants[i] + "</li>";
    //document.getElementById("test2").innerHTML = text2;
  }

  matrice_vote.length = taille;
  var ligne;
  var nb_vote = 0;
  var matiere;
  //----------------------------Récupération des votes------------------------------//
  for (let j = 0; j<mat_check.length; j++){ 
    matiere = mat_check[j]; 
    //matiere = "ACDA"; //Pour le moment peut etre faire qu'avec une seule matière ca serait pas mal
    for(let t1 in log){ //Parcourt les logins
      //z et text2 = login de l'etudiant votant
      var z = log[t1];
      text2 += "<li>" + z + "</li>";
      //console.log(votes);
      if (etudiants.findIndex(k => k===z) > -1 ){ 
        //Si la personne est présente dans la matrice 
        //(afin d'éviter d'avoir une matrice trop grande avec pleins de zéro inutiles)
        ligne = z;
         
        if (votants.findIndex(k => k===z) > -1){ // votants.includes(z,0) == true
          document.getElementById("test2").innerHTML = "OK";
          //ICI ca ne fonctionne plus, aucun des deux ne fonctionne :/
          //Vérifie si c'est un votant ou un voté
          for (let colonne=0; colonne<taille; colonne++){
            nb_vote = votes[z][matiere].length; //Permet d'avoir le nombre de vote dans une matière
            if (true){
              //Ici maintenant il faut regarder dans le if le login voté si c'est celui de la matrice
              // afin de faire 1/nb_vote comme valeur dans la matrice 
            } else {
              //Ici c'est si c'est pas la bonne personne ça met 0
              matrice_poids[ligne][colonne] = 0;
            }
          }
        } else { //Ici c'est les votés pas votants
          for (let colonne=0; colonne<taille; colonne++){
            matrice_poids[ligne][colonne] = 0;
          }
        }
      }
    }
  } 
  document.getElementById("test2").innerHTML = text2;
}

/*
Fonciton trouvée sur internet pour nous aider
function creer_matrice() {
var choix=prompt("donnez la taille de votre matrice:");
var matrice= new Array();
matrice.length=parseInt(choix);
 
alert("votre matrice est d'ordre :" +matrice.length + " x" +matrice.length);
 
for (var i=0; i<matrice.length; i++) {
  for (var j=0; j<matrice.length; j++) {
    if (!matrice[i]) matrice[i] = new Array(); 
    var case_courante = prompt('Valeur de la case :' + i + '|' + j);
    matrice[i][j] = case_courante;
  }
} 
 
return matrice;
 
}
 */


/* Fonctionne mais uniquement avec les votants, or il faut tous les logins dans la matrice ... 
  //-----------------------Récupération des votants-------------------------//

  for(let i in votes)
    votants.push(i);

  //----------------------------Récupération des votes------------------------------//
  for (let j = 0; j<mat_check.length; j++){ 
    var matiere = mat_check[j]; 
    for(let i in votants){ //Parcourt les votants
      var z = votants[i];
      matrice_vote[z] = new Array();
      //text2 += "<li> ";
      for (let l in votes[z][matiere]){ //Parcourt les votes du votants[i] (égal à votes[i])
        for (let k in votants){ 
          var v = votants[k];
          var x = votes[z][matiere];
          if (x.includes(v) == true){
            matrice_vote[x] = 1 ;
          } else {
            matrice_vote[x] = 0 ;
          }
          //text2 += " "+ matrice_vote[x];
        }
        text2 += "<li>" + z + " " + votes[z][matiere][l] +"</li>";
        //text2 += " </li> ";
      }
    }
  } 
  document.getElementById("test2").innerHTML = text2;
}
*/


//------------------------------------Fonctions visuels------------------------------------//

// Accordion 
function myAccFunc() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Click on the "Matières" link on page load to open the accordion for demo purposes
document.getElementById("myBtn").click();


// Open sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
//Close sidebar
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}