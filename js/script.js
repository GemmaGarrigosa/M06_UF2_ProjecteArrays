			
// POKEMONS

let dades;
let nomsPokemon = [];
let nomsMunicipis = [];
let nomMeteorits = [];
let nomMovies = [];


// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dades = data.pokemon;
	console.log(dades)
	console.log(dades[0].name)

	for (let i= 0; i < dades.length; i++){
		nomsPokemon.push(dades[i].name);

	}


});



// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	
	console.log(dades)
	console.log(dades[0].municipi_nom)

	for (let i = 0; i < dades.length; i++){
		nomsMunicipis.push(dades[i].municipi_nom);

	}
	
	
	
});



// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	
	// console.log(dades)
	// console.log(dades[0].name)
	for (let i = 0; i < dades.length; i++){
		nomMeteorits.push(dades[i].name);

	}
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;		
	
	// console.log(dades)
	// console.log(dades[0].title)
	for (let i = 0; i < dades.length; i++){
		nomMovies.push(dades[i].title);

	}
	
});

// Mostrem les dades 

let info = nomsPokemon.map((pokemon, municipis,meteorits,movies) => {
	return { pokemon: pokemon, municipi: nomsMunicipis[municipis],meteorit: nomMeteorits[meteorits], movie: nomMovies[movies] };
});


console.table(info);