function recursive (puissance, matrice1, matrice2){
    let p_autre = 0; //ça c'est genre si il y a 1 comme à la ligne 12 12 1 dans la ligne ci dessous
    let matrice_res = [];
    if (puissance!=3){
        if(puissance%2==0){//pair
            puissance = puissance/2;
            p_autre = 0;
        } else if (puissance%2==1){//impair
            puissance = (puissance-1)/2;
            p_autre = 1;
            matrice_res = recursive(puissance, matrice1, matrice2);
            if(p_autre!=0){
                matrice_res = multiplication(matrice_res, matrice2);
            }
        }
    } else {
        matrice_res = multiplication(matrice1,matrice2);
        matrice_res = multiplication(matrice_res, matrice2);
    }
    return matrice_res;
}

/*
 * Et du coup en fait leprof avait dit que pour pouvoir calculer mais economiser du temps faudrait diviser
genre comme ca : 
                                        100
                                    50      50
                                25              25
                            12  12  1             ...       ICI
                        6               6
                    3       3       
                2   1       2   1

Et du coup je te laisserai voir mais je pense que la fonction ci-dessus fais le taf (en gardant la
    fonction multiplication que j'avais fait dans l'autre doc js sans la puissance du coup 





 */

 function multiplication(matrice1, matrice2, puissance, taille){
  text2 =" ";
  let matrice_resultat1 = [];
  for (let ligne=0; ligne<taille; ligne++){
    matrice_resultat1.push([]);
    matrice_resultat1[ligne].push(new Array(taille));
  }
  if(puissance!=1){
    //multiplication(matrice1,matrice2,puissance/2,taille);
  }
  for(let compteur=0; compteur<puissance; compteur++){
    for (let ligne=0; ligne<taille; ligne++){
      for (let colonne=0; colonne<taille; colonne++){
        for(let i=0; i<taille; i++){
          if (i==0){
            matrice_resultat1[ligne][colonne] = matrice1[ligne][i]*matrice2[i][colonne];
          } else {
            matrice_resultat1[ligne][colonne] += matrice1[ligne][i]*matrice2[i][colonne];
          }
          console.log("compteur==0");
        }
      }
    }
    //Ces deux boucles
    /*for(let i=0; i<taille; i++){
      for(let j=0; j<taille; j++){
        matrice1[i][j] = matrice_resultat1[i][j];
      }
    }*/
   
  }
  return matrice_resultat1; //ça ça fonctionne
  //return matrice1; //Avec ça je suis pas sûre ma page web a plantée tellement c'était long
}
  