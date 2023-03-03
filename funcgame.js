let cardShuffel = ['<span>🥔</span>', '<span>🍒</span>', '<span>🥑</span>', '<span>🌽</span>', '<span>🥕</span>', '<span>🍇</span>', '<span>🍉</span>', '<span>🍌</span>','<span>🥔</span>', '<span>🍒</span>', '<span>🥑</span>', '<span>🌽</span>', '<span>🥕</span>', '<span>🍇</span>', '<span>🍉</span>', '<span>🍌</span>']
const winSound = new Audio("sounds/winningSound.mp3");  // audio priekš uzvarēšanas
let stats = 0;       // nosaka cik kārtis apgrieztas noteiktajā brīdī
let firstCard = 0;   // saglabā pirmās apgrieztās pogas numuru 
let moves = 0;       // saglab.ā cik pogas pagrieztas
let winCount = 0;    // saglabā katru reizi, kad viens komplekts atrasts. Visu laiku ka apgriež, caur šo mainīgo pārbauda vai uzvarējis.


function newGame() { // sāk jaunu spēli, visu seto uz deafult values un samaisa masīvu
    moves = 0
    stats = 0
    buttonStatus(false)
    document.getElementById('movesm').innerHTML = "You made "+moves+" moves";
    winCount = 0
    shuffleCards()
}

function shuffleCards() {                                          // samaisa kārtis un izprinto "?"
    cardShuffel = cardShuffel.sort((a, b) => 0.5 - Math.random()); // samaisa masīvu cardShuffel[]
    for (let i = 1; i<cardShuffel.length+1; i++) {                 // for ciks, lai izietu aur visam masīvam
        document.getElementById("bilde"+i).innerHTML = '?';        // ieraksta "?" uz katras pogas 
        doAnimation(1, "bilde"+i)                                  // uztaisa animāciju visam pogām, kuras ir apgrieztas, lai aizgrieztu atpakaļ
    }
}

function doAnimation(anim, elem) { // pagriež kartiņu uz otru pusi caur css pievienojot flipped class
    var elem = document.getElementById(elem); // saglabā elementu, kuram vajag uzlikt class.
    if (anim == 0) {
        elem.classList.add("flipped");
    } else if (anim == 1) {
        elem.classList.remove("flipped");
    }
}

function showCard(num) {                                                            // main funkcija, kad nospiež pogu (kārti)
    stats++                                                                         
    if (stats == 1) {                                                               // pārbauda vai pirmā poga nospiesta
        doAnimation(0, "bilde"+num)                                                 /// pagriež pogu
        document.getElementById("bilde"+num).innerHTML = cardShuffel[num-1];        // parāda emoji uz pogas
        firstCard = num                                                             // saglabā kārts numuru
        moves++                                                                     // pieskaita kustības
        document.getElementById('movesm').innerHTML = "You made "+moves+" moves";   // izprinot cik kustības izdarītas
        document.getElementById("bilde"+num).disabled = true;                       // uzspiestā poga paliek diasabled
    } else if (stats == 2) {                                                        // pārbauda vai nospiesta otrā poga
        doAnimation(0, "bilde"+num)                      
        document.getElementById("bilde"+num).innerHTML = cardShuffel[num-1];        // parāda emoji uz pogas
        document.getElementById("bilde"+num).disabled = true;                        
        moves++
        if (cardShuffel[num-1] == cardShuffel[firstCard-1]){                        // pārbauda vai pirmās pogas emoji vienāds ar otrās pogas emoji. ja ir atstāj apgrieztas abas pogas.
            document.getElementById('movesm').innerHTML = "You made "+moves+" moves";
            stats = 0                                                               // reseto skaitu cik kārtis pagrieztas
            checkWin()                                                              // pārbauda vai uzvarējis. (vai visas pogas apgrieztas pareizi)
            return                                                                  // returno funkciju, lai tā neturpinās, jo kārtis atrastas.
        }
        document.getElementById('movesm').innerHTML = "You made "+moves+" moves";
        setTimeout(() => {                                                          // izpilda darbības un tad uzliek 1.5s timeout
            document.getElementById("bilde"+num).innerHTML = '?';                   // Uzliek abam poam "?" atpakaļ, jo nav pareizi atrastas.
            document.getElementById("bilde"+firstCard).innerHTML = '?';             
            document.getElementById("bilde"+num).disabled = false;                  // Pogu uzliek uz 'false', un to atkal var izmantot.
            document.getElementById("bilde"+firstCard).disabled = false;
            doAnimation(1, "bilde"+num);                                            // izpilda abām pogām aizgriešanas animāciju
            doAnimation(1, "bilde"+firstCard);                                          
            stats = 0
        }, 1500);
    }
}

function buttonStatus(status) { // disablo vai enablo visas pogas
    var allButtons = document.getElementsByClassName("button");
    for(var i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = status;
    }
}

function checkWin() { // pārbauda vai spēlētajs apgriezis visas kartiņas pareizi un uzvarējis.
    winCount++
    setTimeout(() => { 
        if (winCount == 8) {
            alert("Apsveicu, Tu Uzvareji! Spied pogu START, lai spēlētu vēlreiz!") //Parādas ALERT, kad uzvarēji.
            winSound.play(); 
            winCount = 0
        }
    }, 1500);
}

