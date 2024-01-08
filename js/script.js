/* PART 0: Accedir al JSON i començar a llistar dades */

let info = [];
let pokemons=[];
let municipis =[];
let meteos =[];
let pelis =[];

// POKEMONS
fetch("js/data/pokemon.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsPokemon = data.pokemon;
        console.log(`Resultat del data.pokemon: ${JSON.stringify(data.pokemon)}`);
        nomsPokemon.forEach((pokemon) => {
            pokemons.push([pokemon.name,pokemon.img,pokemon.weight.slice(0,-2),pokemon.id]);
            info.push({ pokemon: pokemon.name, municipi: " ", meteorit: " ", movie: ""  }); 
            
        });
    });

// MUNICIPIS
fetch("js/data/municipis.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsMunicipis = data.elements;
        nomsMunicipis.forEach((municipi, index) => {
            municipis.push([municipi.ine, municipi.municipi_escut, municipi.municipi_nom, municipi.nombre_habitants]);
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
            meteos.push([meteorit.id, meteorit.name, meteorit.year]);
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
	location.reload();
    
}

function orderList(ordre){
	if (ordre=="ASC"){
		pokemons.sort();
    }   
    if (ordre =="DESC") {
		pokemons.sort().reverse();
	}

    printList();
}

//Funció que fa de buscador
function searchList(){

    let valor = document.getElementById('buscador').value.toLowerCase();
    let llista = document.querySelector('select[name="llistes"]');
    let tipus = llista.value; // agafem quina llista ha escollit l'usuari per buscar només en aquesta

    console.log(`Aquest es el valor ${valor} i aquest és el tipus ${tipus}`);
    
    if (tipus == "pokemon"){

        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th>";
        pokemons.forEach((pokemon,index) => {
            
            if (pokemons[index][0].toLowerCase().includes(valor)){
            let nomPokemon = pokemons[index][0];
            let imatgePokemon = pokemons[index][1];
            let pesPokemon = pokemons[index][2];
            let idPokemon = pokemons[index][3];
            taula+= "<tr>";
            taula += `<td> ${idPokemon} </td> <td><img src="${imatgePokemon}"><td> ${nomPokemon} </td></td><td>${pesPokemon}kg</td>`;
            taula += "</tr>";
            }
        });
        taula += "</table>";
        div.innerHTML = taula;

    }else if (tipus == "municipis"){

        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>INE</th><th>Escut</th><th>Nom</th><th>NºHabitants</th>";
        pokemons.forEach((municipi,index) => {
            let ineMunicipi = municipis[index][0];
            let escutMunicipi = municipis[index][1];
            let nomsMunicipi = municipis[index][2];
            let nombreHabitantsMunicipi= municipis[index][3];
            taula+= "<tr>";
            taula += `<td> ${ineMunicipi} </td> <td><img src="${escutMunicipi}"><td> ${nomsMunicipi} </td></td><td>${nombreHabitantsMunicipi}</td>`;
            taula += "</tr>";
        });
                
        taula += "</table>";
        div.innerHTML = taula;
    }else if (tipus == "meteorit"){
        
    }else if (tipus == "movies"){
        
    }
	
}

function calcMitjana(){
    let comptador = 0;
    let totalPes = 0;
    pokemons.forEach((pokemon,index) => {
        comptador++; // comptem el total de pokemons 
        totalPes += parseInt(pokemons[index][2]);
        
        
    });
    let mitjana = document.getElementById("mitjanaPes");
    mitjana.innerHTML = `${(totalPes/comptador).toFixed(2)}kg`;
  


    //fer servir toFixed()
}

function printList(){

    let llista = document.querySelector('select[name="llistes"]'); //obtenim el valor de la opció escollida
    let valor = llista.value;

    if (valor == "pokemon"){
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>#</th><th>Imatge</th><th>Nom</th><th>Pes</th>";
        pokemons.forEach((pokemon,index) => {
            let nomPokemon = pokemons[index][0];
            let imatgePokemon = pokemons[index][1];
            let pesPokemon = pokemons[index][2];
            let idPokemon = pokemons[index][3];
            taula+= "<tr>";
            taula += `<td> ${idPokemon} </td> <td><img src="${imatgePokemon}"><td> ${nomPokemon} </td></td><td>${pesPokemon}kg</td>`;
            taula += "</tr>";
        });
                
        taula += "</table>";
        div.innerHTML = taula;
    } else if (valor == "municipis") {
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>INE</th><th>Escut</th><th>Nom</th><th>NºHabitants</th>";
        pokemons.forEach((municipi,index) => {
            let ineMunicipi = municipis[index][0];
            let escutMunicipi = municipis[index][1];
            let nomsMunicipi = municipis[index][2];
            let nombreHabitantsMunicipi= municipis[index][3];
            taula+= "<tr>";
            taula += `<td> ${ineMunicipi} </td> <td><img src="${escutMunicipi}"><td> ${nomsMunicipi} </td></td><td>${nombreHabitantsMunicipi}</td>`;
            taula += "</tr>";
        });
                
        taula += "</table>";
        div.innerHTML = taula;
       
    } else if (valor == "meteorit") {
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>Id</th><th>Nom</th><th>Any</th>";
        pokemons.forEach((meteorit,index) => {
            let idMeteorit = meteos[index][0];
            let nomMeteorit = meteos[index][1];
            let anyMeteorit = meteos[index][2];
            
            taula+= "<tr>";
            taula += `<td> ${idMeteorit} </td><td> ${nomMeteorit} </td></td><td>${anyMeteorit}</td>`;
            taula += "</tr>";
        });

        taula += "</table>";
        div.innerHTML = taula;
        
    } else if (valor == "movies") {
        document.write("movies");
    }
}
