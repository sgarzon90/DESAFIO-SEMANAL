let button = document.querySelector(".presentar");

function presentar(){

let character = prompt("¿Quién se presenta hoy? (Mario, Luigi, Bowser, Peach, Yoshi, Toad, Toadette, Daisy)");
let character_Fullname = document.querySelector("#character");
let setIDLowerCase = character.toLowerCase();
let elementFound = document.getElementById(setIDLowerCase);
let elementSaved = elementFound;

console.log(character);

    if (setIDLowerCase == "mario") {

    character_Fullname.innerHTML = ("Mario");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "luigi") {

    character_Fullname.innerHTML = ("Luigi");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "bowser") {

    character_Fullname.innerHTML = ("Bowser Morton Koopa");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "peach") {

    character_Fullname.innerHTML = ("Princesa Peach Toadstool");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "yoshi") {

    character_Fullname.innerHTML = ("T. Yoshisaur Munchakoopas");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "toad") {

    character_Fullname.innerHTML = ("Toad");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "toadette") {

    character_Fullname.innerHTML = ("Toadette");
    elementSaved.setAttribute('title', 'Presentado');

    } else if (setIDLowerCase == "daisy") {

    character_Fullname.innerHTML = ("Princesa Daisy");
    elementSaved.setAttribute('title', 'Presentado');

} else {
    character_Fullname.innerHTML = ("(Desconocido)");
}

    button.setAttribute("style", "display:none");
}

button.onclick = presentar;
