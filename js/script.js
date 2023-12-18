/* PART 0: Accedir al JSON i començar a llistar dades */

let info = [];
let pokemons=[];
// POKEMONS
fetch("js/data/pokemon.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsPokemon = data.pokemon;
        console.log(`Resultat del data.pokemon: ${JSON.stringify(data.pokemon)}`);
        nomsPokemon.forEach((pokemon) => {
            pokemons.push([pokemon.name,pokemon.img,pokemon.weight]);
            info.push({ pokemon: pokemon.name, municipi: " ", meteorit: " ", movie: ""  }); 
            
        });
    });

// MUNICIPIS
fetch("js/data/municipis.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsMunicipis = data.elements;
        nomsMunicipis.forEach((municipi, index) => {
            if (info[index]) {
                info[index].municipi = municipi.municipi_nom;
            } else {
                info[index] = { pokemon: " ", municipi: municipi.municipi_nom, meteorit: " ", movie: " " }; 
            }
        });
    });

// METEORITS
fetch("js/data/earthMeteorites.json")
    .then((response) => response.json())
    .then((data) => {
        let nomMeteorits = data;
        nomMeteorits.forEach((meteorit, index) => {
            if (info[index]) {
                info[index].meteorit = meteorit.name;
            } else {
                info[index] = { pokemon: " ", municipi: " ", meteorit: meteorit.name, movie: " " }; 
            }
        });
    });

// MOVIES
fetch("js/data/movies.json")
    .then((response) => response.json())
    .then((data) => {
        let nomMovies = data.movies;
        nomMovies.forEach((movie, index) => {
            if (info[index]) {
                info[index].movie = movie.title;
            } else {
                info[index] = { pokemon: " ", municipi: " ", meteorit: " ", movie: movie.title }; 
            }
        });
        
        // Mostra les dades en una taula
        console.table(info);
    });


/* PART 1 Funcions i arrays */


function iniciar(){
	// location.reload();
    printList();
}

// function orderList(ordre){
// 	if (ASC){
// 		pokemons.sort();
// 	}else {
// 		pokemons.reverse();
// 	}
// }

// function searchList(){
// 	//torna posicio donat un prompt0
// }

// function calcMitjana(){
//     //fer servir toFixed()
// }

function printList(){
    
   let div = document.getElementById("taulaPokemons");
   let taula = "<table>";
//     for (let i = 0; i < pokemons.length; i++){
//         taula += "<tr>";
//         for (let j = 0; j < pokemons.length; j++){
//             taula += `<td> ${pokemons[i][j]}</td>`;
            
//         }
//         taula += "</tr>";
//     }
//     taula += "</table>";
//     div.innerHTML = taula;
        taula += "<th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th>";
        pokemons.forEach((pokemon,index) => {
            let nomPokemon = pokemons[index][0];
            let imatgePokemon = pokemons[index][1];
            let pesPokemon = pokemons[index][2];
            taula+= "<tr>";
            taula += `<td> ${index} </td> <td><img src="${imatgePokemon}"><td> ${nomPokemon} </td></td><td>${pesPokemon}</td>`;
            taula += "</tr>";
        });
        
        taula += "</table>";
        div.innerHTML = taula;
}
