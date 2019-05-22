function byPass() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
}
byPass();

function getRandomPokemon() {
    let randomPokemon = Math.floor((Math.random()*150)+1);
    return randomPokemon;
}

function capitalizeFirst(word) {
  let firstLetter = word.charAt(0);
  let uppercaseFirstLetter = word.charAt(0).toUpperCase();
  let stringWithoutFirstLetter = word.slice(1)
  let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalizedWord;
}

const pokeGenInfo = document.querySelector(".poke__general-info");
const pokeViewer = document.querySelector(".poke-viewer__item--poke-image-container");
const pokeImage = document.querySelector(".poke-viewer__item--poke-image");
const getRandomizedPokemon = document.querySelector(".poke-controls__item--enter");
const pokeDescShort = document.querySelector(".poke-controls__item--description-short");
const synth = window.speechSynthesis;
const pokedexAlertsAlert = document.querySelector(".pokedex-alerts--alert");
const speakButton = document.querySelector(".poke-viewer__item--poke-speak");

getRandomizedPokemon.addEventListener("click", function() {
  const pokeRequest = new XMLHttpRequest();
  pokeRequest.onreadystatechange = function () {
      if (pokeRequest.readyState === 4 && pokeRequest.status === 200) {
          const pokeResponse = JSON.parse(pokeRequest.responseText);
          console.log(pokeResponse);
          pokeViewer.innerHTML = `<img src="${pokeResponse.sprites.front_default}" class="poke-viewer__item--poke-image"/>`;
          // pokeImage.src = pokeResponse.sprites.front_default;
          let pokeName = capitalizeFirst(pokeResponse.name);
          let pokeNumber = pokeResponse.id;
          let pokeHeight = `${Math.ceil(pokeResponse.height/3.048)}'`;
          let pokeWeight = `${Math.ceil(pokeResponse.weight/4.5359237)} lbs.`;
          let attack1 = pokeResponse.moves[0].move.name;
          let attack2 = pokeResponse.moves[1].move.name;
          let pokeType1 = capitalizeFirst(pokeResponse.types[0].type.name);
          let pokeType2 = "";
          let type1 = document.querySelector(".poke__type-1");
          let type2 = document.querySelector(".poke__type-2");

          function getType2() {
            pokeResponse.types.length > 1 ?
              pokeType2 = capitalizeFirst(pokeResponse.types[1].type.name)
              :
              pokeType2 = "Null"
          }
          getType2();
          pokeDescShort.innerHTML = `<p>${pokeName}</p>`;

          let genInfoHTML =
              `<div class="poke__general-info--number-name">
                    <p><img src="http://www.pokeapi-how.appspot.com/favicon.ico" class="poke-ball"/> # ${pokeNumber} ${pokeName}</p>
                </div>
                <div class="poke__general-info--height">
                    <p>Height:</p>
                    <p>${pokeHeight}</p>
                </div>
                <div class="poke__general-info--weight">
                    <p>Weight:</p>
                    <p>${pokeWeight}</p>
                </div>
                <div class="poke__general-info--poke-description">
                    <p>${pokeName} is a ${pokeType1} type Pok&eacute;mon. A few of it's attacks are ${attack1} and ${attack2}.</p>
                </div>`
            ;
            pokeGenInfo.innerHTML = genInfoHTML;
            type1.textContent =  pokeType1;
            type2.textContent = pokeType2;
            speakButton.addEventListener("click", function(e) {
              setTimeout(function(){
                var textToSpeak = document.querySelector(".poke__general-info").textContent;
                // responsiveVoice.speak(textToSpeak, "US English Male", {rate: 1.1});
                var utterThis = new SpeechSynthesisUtterance(textToSpeak);
                utterThis.pitch = 1.2;
                utterThis.rate = 1.1;
                utterThis.onstart = function(e) {
                  pokedexAlertsAlert.classList.add("flashing");
                }
                utterThis.onend = function(e) {
                  pokedexAlertsAlert.classList.remove("flashing");
                }
                synth.speak(utterThis);
                // setTimeout(function(){
                //   if(responsiveVoice.isPlaying()) {
                //     console.log("is playing");
                //       pokedexAlertsAlert.classList.add("flashing");
                //   } else {
                //     console.log("isn't playing");
                //       pokedexAlertsAlert.classList.remove("flashing");
                //   }
                // }, 100);
              }, 100);
            });
      }
      else {
        console.log("loading");
        pokeViewer.innerHTML = `<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f53f8d8c-df75-4175-9b3f-686a11dd0a84/dcxk9tz-8a0cd888-96d6-4fed-bc3d-dcb369b7a1bb.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y1M2Y4ZDhjLWRmNzUtNDE3NS05YjNmLTY4NmExMWRkMGE4NFwvZGN4azl0ei04YTBjZDg4OC05NmQ2LTRmZWQtYmMzZC1kY2IzNjliN2ExYmIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OVQitgP1JAkcRV-5p22lW2JYlY_xlgM4FoVEMKjH-XM" height="100" width="100"/>`;
      }
  };
  pokeRequest.open("GET","http://pokeapi.co/api/v2/pokemon/" + getRandomPokemon());
  pokeRequest.send();
});

// speakButton.addEventListener("click", function(e) {
//   setTimeout(function(){
//     var textToSpeak = document.querySelector(".poke__general-info").textContent;
//     var utterThis = new SpeechSynthesisUtterance(textToSpeak);
//     utterThis.pitch = 1.2;
//     utterThis.rate = 1.1;
//     utterThis.onstart = function(e) {
//       pokedexAlertsAlert.classList.add("flashing");
//     }
//     utterThis.onend = function(e) {
//       pokedexAlertsAlert.classList.remove("flashing");
//     }
//     synth.speak(utterThis);
//   }, 100);
//
// });
