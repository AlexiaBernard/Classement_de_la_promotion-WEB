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