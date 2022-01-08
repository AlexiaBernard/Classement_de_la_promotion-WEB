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

var matrice_vote = [];

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
  for (let j = 0; j<mat_check.length; j++){ 
    matiere = mat_check[j]; //Attention pour le moment il faut selectionner qu'une seule matiere
    text2 = "";
    let taille = 0; //La taille de la matrice 
    let indice = 0; //Sert à Initialiser le tableau votants
    for(let i in votes){
      etudiants[taille] = i;
      votants[indice] = i;
      taille ++;
      indice ++;
        for(let l in votes[i][matiere])
        if (etudiants.findIndex(k => k===votes[i][matiere][l]) == -1 && votes[i][matiere][l]!==""){
          etudiants[taille] = votes[i][matiere][l];
          taille++;
        }
    }
    //définition de la taille de la matrice
    taille = etudiants.length;
    let taille2 = votants.length;

    //Affichage de tous les participants
    for (let i = 0; i<taille; i++){
      text2 +=  "<li>" + etudiants[i] + "</li>";
    }
    //document.getElementById("test2").innerHTML = text2; //Ca fonctionne

    //matrice_vote.length = taille;
    var ligne;
    var nb_vote = 0;
    var matiere;
    var delta = 0.15;
    var votant = false;
    text2 = ""; //A mettre en commentaire pour essayer la partie du dessus
  //----------------------------Récupération des votes------------------------------//
    for(let ligne in etudiants){ //Parcourt les logins
      //ligne est le numéro de l'etudiant et etudiant[ligne] son log
      //console.log(votes);
      votant = false;
      text2 += "<li>" + etudiants[ligne];
      //Si la personne est présente dans la matrice 
      //(afin d'éviter d'avoir une matrice trop grande avec pleins de zéro inutiles)
      matrice_vote.push([]);
      matrice_vote[ligne].push(new Array(taille));
      var test = etudiants[ligne];
      //La boucle ci dessous permet de savoir si la personne vote ou est voté 
      for (let i = 0; i<taille2; i++){
        if (votants[i] == etudiants[ligne]){
          votant = true;
          break;
        }
      }
      if (votant){
        //Vérifie si c'est un votant ou un voté
        nb_vote = 0;
        for (let colonne in etudiants){
          for (let j in votes[etudiants[ligne]][matiere]){
            nb_vote++;//Permet d'avoir le nombre de vote dans une matière
          }
          for (let v in votes[etudiants[ligne]][matiere]){
            if (votes[etudiants[ligne]][matiere][v]==etudiants[colonne]){
              //Ici maintenant il faut regarder dans le if le login voté si c'est celui de la matrice
              matrice_vote[ligne][colonne] = "V"; //ici il faut mettre le calcul du prof 
            } else {
              //Ici c'est si c'est pas la bonne personne (pas voté) ça met : delta/taille 
              matrice_vote[ligne][colonne] = "Z"; 
            }
            text2 += " "+matrice_vote[ligne][colonne];
          }
        }
      } else { //Ici ce sont les étudiants ne votants pour personne
        for (let colonne in etudiants){
          if (colonne==ligne){
            matrice_vote[ligne][colonne] = "ZZ"; //ici c'est 0 : il ne se vote pas
          } else {
            matrice_vote[ligne][colonne] = "NV"; //ici il faut mettre le calcul du prof
          }
          text2 += " "+matrice_vote[ligne][colonne];
        }
      }
      text2 += "</li>";
    }
    document.getElementById("test2").innerHTML = text2;
  }  
}

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