const button = document.querySelector(".button");
const pokemon = document.querySelector(".pokemon");

// button.addEventListener("click", (e) => {
//     e.preventDefault();
//     const pokeRequest = new XMLHttpRequest();
//     pokeRequest.onreadystatechange = function () {
//         if (pokeRequest.readyState === 4 && pokeRequest.status === 200) {
//             console.log("test");
//             const pokeResponse = JSON.parse(pokeRequest.responseText);
//             console.log(pokeResponse);
//             // const pokeHTML = `
//             //     <h1>${pokeResponse.species.name}</h1>
//             //     <img src="${pokeResponse.sprites.front_default}" />
//             // `;
//             // pokemon.innerHTML = pokeHTML;
//         }
//     };
//     pokeRequest.open("GET","http://pokeapi.co/api/v2/pokemon/?limit=151");
//     pokeRequest.send();
// });
// const axios = require('axios');

axios.get('http://pokeapi.co/api/v2/pokemon/?limit=151')
  .then (response => {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

  axios.get('http://pokeapi.co/api/v2/pokemon/squirtle')
    .then (response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
