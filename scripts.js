// const button = document.querySelector(".poke-viewer__item--poke-speak");
// const pokemon = document.querySelector(".pokemon");
//
// function byPass() {
//     var cors_api_host = 'cors-anywhere.herokuapp.com';
//     var cors_api_url = 'https://' + cors_api_host + '/';
//     var slice = [].slice;
//     var origin = window.location.protocol + '//' + window.location.host;
//     var open = XMLHttpRequest.prototype.open;
//     XMLHttpRequest.prototype.open = function() {
//         var args = slice.call(arguments);
//         var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//         if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//             targetOrigin[1] !== cors_api_host) {
//             args[1] = cors_api_url + args[1];
//         }
//         return open.apply(this, args);
//     };
// }
// byPass();
//
// button.addEventListener("click", (e) => {
//     e.preventDefault();
//     const pokeRequest = new XMLHttpRequest();
//     pokeRequest.onreadystatechange = function () {
//         if (pokeRequest.readyState === 4 && pokeRequest.status === 200) {
//             console.log("test");
//             const pokeResponse = JSON.parse(pokeRequest.responseText);
//             console.log(pokeResponse);
//         }
//     };
//     pokeRequest.open("GET","http://pokeapi.co/api/v2/pokemon/?limit=151");
//     pokeRequest.send();
// });
// const axios = require('axios');
//
// axios.get('http://pokeapi.co/api/v2/pokemon/?limit=151')
//   .then (response => {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//
//   axios.get('http://pokeapi.co/api/v2/pokemon/squirtle')
//     .then (response => {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
