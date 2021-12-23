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

//affiche les votes (clé de l'objet et jsp ce que c'est le numéro) (c'est des objets d'objets de tableau mdr) 
let text="";
for(let i in votes){
  for(let j in i){
    text += "<li>" + i + " " +j +"</li>";
    document.getElementById("test").innerHTML = text;
    console.log(votes[i]);
  }
}

/*let matrice_poids = [];

init_mat_poids();

function init_mat_poids(){
  for (let i=0; i<taille ;i++){
    matrice_poids[i] = 1;
  }
}

var matrice_vote = new Array();

/*matr_voteFunc("ACDA");

//pas sure que ca fonctionne
function matr_voteFunc(matiere){
  for(let i=0; i<taille; i++){
    var x = log[i];
    matrice_vote[x] = new Array();
    for(let j=0; j<taille; j++){
      if (votes[x[matiere]].includes[log[j]] == true){
        matrice_vote[x] = 1 ;
      } else {
        matrice_vote[x] = 0 ;
      }
    }
  }
}*/
//------------------------------------Selection matières------------------------------------//

//Permet de mettre à jour le tableau des matières sélectionnées et les affiche
function clickFunc() { 
  //Tableau de toutes les matières disponibles
  let matieres = ['ACDA', 'ANGL', 'APL', 'ART', 'ASR', 'EC', 'EGOD', 'MAT', 'SGBD', 'SPORT'];
  
  //Tableau des matières sélectionnées
  let mat_check = [];

  let text = "";
  for (i=0; matieres.length; i++){
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
    //document.getElementById("test2").innerHTML = logins[log[0]];
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