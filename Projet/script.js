/*fetchInject([
  'http://www.iut-fbleau.fr/projet/maths/?f=votes.js'
]).then(() => {
  console.log(`Finish in less than ${moment().endOf('year').fromNow(true)}`)
})


fetchInject([
  'http://www.iut-fbleau.fr/projet/maths/?f=logins.js'
]).then(() => {
  console.log(`Finish in less than ${moment().endOf('year').fromNow(true)}`)
})

ou

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

jsp trop
*/



//Tableau de toutes les matières disponibles
let matieres = ['ACDA', 'ANGL', 'APL', 'ART', 'ASR', 'EC', 'EGOD', 'MAT', 'SGBD', 'SPORT']; 

//Tableau des matières sélectionnées
let mat_check = [];

//Permet de mettre à jour le tableau des matières sélectionnées
//Et les affiche
function clickFunc() { 
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
  }
}

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