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
var log=[];
log=getlog(logins);

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
  text = "Vous avez choisi : ";
  for (i=0; i<matieres.length; i++){
    var mati = document.getElementById(matieres[i]);
    if (mati.checked == true){
      if (mat_check.includes(mati) == false){
        mat_check.push(matieres[i]);
      }
      text += matieres[i]+ ", ";
    } else {
      if (mat_check.includes(mati) == true){
        mat_check.splice(matieres.lastIndexOf(mati),1);
      }
    }
  }
  document.getElementById("test").innerHTML = text;

  if(mat_check.length==0){
    text2 = "";
    document.getElementById("test").innerHTML = text2;
    document.getElementById("test2").innerHTML = text2;
  }else{

    let nbvotes; //nombre de vote par personnes
    let nom=[[],[]]; //nom des matières + nombre de votes
    for (let j = 0; j<mat_check.length; j++){
      matiere = mat_check[j];
      nbvotes=0;
      for(let i in log){
        for(let j in votes){
          if(j==log[i]){
            for(let l in votes[j][matiere]){
              nbvotes++;
              //console.log(j+" a voté pour "+votes[j][matiere][l]+ " en "+matiere);
            }
            break;
          }
        }
      }
      //console.log(nbvotes+ " pour "+matiere);
      nom[0][j]=matiere;
      nom[1][j]=nbvotes;
    }

    let max=0;
    for (let j = 0; j<mat_check.length; j++){
      if(nom[1][j]>max){
        max=nom[1][j];
      }
    }

    for (let j = 0; j<mat_check.length; j++){
      nom[1][j]=nom[1][j]/max;
      //console.log(nom[0][j]+ " "+nom[1][j]);
    }

    //-----------------------Récupération des etudiants-------------------------//
    for (let j = 0; j<mat_check.length; j++){
      var matrice_vote = []; 
      matiere = mat_check[j]; //Attention pour le moment il faut selectionner qu'une seule matiere
      text2 = "";
      let compteur = 0;
      var taille = 0; //La taille de la matrice 
      let indice = 0; //Sert à Initialiser le tableau votants
      for(let i in votes){
        if(log.includes(i)==true){
          compteur = 0;
          for(let l in votes[i][matiere]){
            compteur++;
            //Permet de savoir si l'étudiant est déjà dans le tableau ou non (eviter les doubles)
            if (etudiants.includes(votes[i][matiere][l])==false && votes[i][matiere][l]!=="" && log.includes(votes[i][matiere][l])==true){
              etudiants[taille] = votes[i][matiere][l];
              taille++;
            }
          }
          //Permet de savoir si l'étudiant est déjà dans le tableau ou non (eviter les doubles)
          if (compteur>0){
            if (etudiants.includes(i)==false ){
              etudiants[taille] = i;
              taille ++;
            }
            votants[indice] = i;
            indice ++;
          }
        }
      }
      //définition de la taille de la matrice
      taille = etudiants.length;
    }

    for (let j = 0; j<mat_check.length; j++){
      var nb_vote = 0;
      var alpha = 0.15;
      let votant = true;
      text2 = "";
      let valeur = 0;
    //----------------------------Récupération des votes------------------------------//
      for(let ligne in etudiants){ //Parcourt les étudiants
        //ligne est le numéro de l'etudiant et etudiant[ligne] son log
        //Permet de créer une ligne vide
        matrice_vote.push([]);
        //Remplis la ligne vide créée juste au dessus
        matrice_vote[ligne].push(new Array(taille));
        if (votants.includes(etudiants[ligne])){
          nb_vote = 0;
          for (let j in votes[etudiants[ligne]][matiere]){
            nb_vote++;//Permet d'avoir le nombre de vote dans une matière
          }
          if (nb_vote>0){
            votant = true;
          }else {
            votant = false;
          }
        } else {
          votant = false;
        }
        if (votant){
          //Vérifie si c'est un votant ou un voté
          for (let colonne in etudiants){
            valeur = 0;
            matrice_vote[ligne][colonne] ="vide";
            for (let v in votes[etudiants[ligne]][matiere]){
              valeur = ((1-alpha)*(1/nb_vote))+(alpha/taille);
              if (votes[etudiants[ligne]][matiere][v]==etudiants[colonne]){
                //Ici maintenant il faut regarder dans le if le login voté si c'est celui de la matrice
                matrice_vote[ligne][colonne] = valeur; //ici il faut mettre le calcul du prof 
                break;
              }
            }
            if (matrice_vote[ligne][colonne]== "vide"){
              matrice_vote[ligne][colonne] = alpha/taille;
            }
          }
        } else {
          //Ici ce sont les étudiants ne votants pour personne
          for (let colonne in etudiants){
            valeur = (1-alpha)*1/(taille-1)+alpha/taille
            if (colonne==ligne){
              matrice_vote[ligne][colonne] = alpha/taille; //il ne se vote pas
            } else {
              matrice_vote[ligne][colonne] = valeur; //il vote pour tout le monde
              //taille-1 car vote pour tout le monde sauf lui
            }
          }
        }
      }
      for (let ligne in etudiants){
        let val = 0;
        for (let colonne in etudiants){
          val+= matrice_vote[ligne][colonne];
        }
      }

      let matrice_resultat = multiplication(matrice_vote, matrice_vote,100, taille);

      if(j==0){
        var tab=[[],[]];
        for(let colonne=0; colonne<taille; colonne++){
          tab[0][colonne] = etudiants[colonne]; //le login de l'etudiant
          tab[1][colonne] = matrice_resultat[0][colonne]*nom[1][j]; //son score
        }
      } else {
        for (let colonne=0; colonne<taille; colonne++){
          for (let l=0; l<taille; l++){
            if (tab[0][l]==tab[0][colonne]){
              tab[1][colonne] += matrice_resultat[0][colonne]*nom[1][j];
              break;
            }
          }
        }
      }
    }
    tab[1].sort(); //permet de trier le tableau
    
    text2= " ";
  }
  let classement = 1; //classement
  let compteur = 1; //permet de savoir s'il y a des execos combien
  for(let i=(tab[0].length-1);i>=0;i--){
    text2 += "<li> n°"+classement+" "+tab[0][i]+" "+tab[1][i]+"</li>";
    if (tab[1][i]!=tab[1][i-1]){
      classement += compteur;
      compteur = 1;
    } else {
      compteur++;
    }
  }
  document.getElementById("test2").innerHTML = text2;
}

function compareSecondColumn(a, b) {
  if (a[1] === b[1]) {
    return 0;
  }
  else {
    return (a[1] < b[1]) ? -1 : 1;
  }
}
//-------------------------------Fonction multiplication matrice--------------------------//

function multiplication(matrice1, matrice2, puissance, taille){
  text2 =" ";
  let matrice_resultat1 = [];
  for (let ligne=0; ligne<taille; ligne++){
    matrice_resultat1.push([]);
    matrice_resultat1[ligne].push(new Array(taille));
  }

  let matrice_resultat2 = [];
  for (let ligne=0; ligne<taille; ligne++){
    matrice_resultat2.push([]);
    matrice_resultat2[ligne].push(new Array(taille));
  }

  let matrice_resultat3 = [];
  for (let ligne=0; ligne<taille; ligne++){
    matrice_resultat3.push([]);
    matrice_resultat3[ligne].push(new Array(taille));
  }

  if(puissance!=1){
    if(puissance%2==0){//pair
      matrice_resultat1=multiplication(matrice1,matrice2,puissance/2,taille);

      for (let ligne=0; ligne<taille; ligne++){
        for (let colonne=0; colonne<taille; colonne++){
          for(let i=0; i<taille; i++){
            if (i==0){
              matrice_resultat2[ligne][colonne] = matrice_resultat1[ligne][i]*matrice_resultat1[i][colonne];
            } else {
              matrice_resultat2[ligne][colonne] += matrice_resultat1[ligne][i]*matrice_resultat1[i][colonne];
            }
          }
        }
      }
    } else if (puissance%2==1){//impair
      matrice_resultat1=multiplication(matrice1,matrice2,(puissance-1)/2,taille);

      for (let ligne=0; ligne<taille; ligne++){
        for (let colonne=0; colonne<taille; colonne++){
          for(let i=0; i<taille; i++){
            if (i==0){
              matrice_resultat2[ligne][colonne] = matrice_resultat1[ligne][i]*matrice1[i][colonne];
            } else {
              matrice_resultat2[ligne][colonne] += matrice_resultat1[ligne][i]*matrice1[i][colonne];
            }
          }
        }
      }
    }
    //console.log("puissance = "+puissance);
    return matrice_resultat2;
  } else {
    //console.log("puissance = "+puissance);
    return matrice1;
  }
}

//------------------------------------Fonctions visuels------------------------------------//

function myAccFunc() {
  var x = document.getElementById("demoAcc");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

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