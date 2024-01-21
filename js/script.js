let myChart;
let info = [];
let pokemons =[];
let municipis =[];
let meteos =[];
let pelis =[];
let chartPokemon="";
let ascendent = false;
let pokemonsCercats = [];

// POKEMONS
fetch("js/data/pokemon.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsPokemon = data.pokemon;
        nomsPokemon.forEach((poke) => {
            let pokemon = {
                num: poke.num,
                img: poke.img,
                name: poke.name,
                weight: parseFloat(poke.weight),
                type: poke.type,
            }
            pokemons.push(pokemon);
            info.push({ pokemon: pokemon.name, municipi: " ", meteorit: " ", movie: ""  });   
            
        });
    });

    console.log(pokemons);

// MUNICIPIS
fetch("js/data/municipis.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsMunicipis = data.elements;
        nomsMunicipis.forEach((muni, index) => {
            let municipi ={
                ine: muni.ine,
                escut: muni.municipi_escut,
                nom: muni.municipi_nom,
                habitants: parseInt(muni.nombre_habitants),
            }
            municipis.push(municipi);

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
            let meteorits = {
                id: parseInt(meteorit.id),
                nom: meteorit.name,
                any: meteorit.year.slice(0,4)
            }
            
            meteos.push(meteorits);

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
            let pelicula = {
                img: movie.url,
                titol: movie.title,
                any: movie.year,
                puntuacio: movie.rating
            }
            pelis.push(pelicula);
            
            if (info[index]) {
                info[index].movie = movie.title;
            } else {
                info[index] = { pokemon: " ", municipi: " ", meteorit: " ", movie: movie.title }; 
            }
        });
        
        // Mostra les dades en una taula
        // console.table(info);
    });


function iniciar(){
	location.reload();
    
}

// Funció que rep com es vol ordenar i la llista que es vol ordenar 
function orderList(column){  

    let llista = getTipusLlista();
    let llistaAOrdenar= []; // creem un array on guardarem el array del tipus de llista que voldrem ordenar
    if (llista == "pokemon") {
        llistaAOrdenar = pokemons;

    } else if (llista == "municipis") {
        llistaAOrdenar = municipis;
    } else if (llista == "meteorit") {
        llistaAOrdenar = meteos;
    } else if (llista == "movies") {
        llistaAOrdenar = pelis;
    }
    
    console.log(typeof llistaAOrdenar[0][column]);
   
    if (ascendent){
        
        llistaAOrdenar.sort(function(a,b){
            if (typeof llistaAOrdenar[0][column] == "string"){
                return a[column] > b[column];
            } else {
                return a[column] - b[column];
            }
        });
        ascendent = false;
        printList();
 
    } else {
        llistaAOrdenar.sort(function(a,b){
            if (typeof llistaAOrdenar[0][column] == "string"){
                return a[column] < b[column];
             } else {    
                return b[column] - a[column];
            }
        });
        ascendent = true;
        printList();
     
    }
        
}



// Funció que fa de buscador, per llògica he decidit que busqui pel nom 
function searchList(value){

    let valor = value.toLowerCase();
    let tipus = getTipusLlista();
    
    // console.log(`Aquest es el valor ${valor} i aquest és el tipus ${tipus}`);

    if (tipus == "pokemon"){
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += getHeaderByLlista();
        pokemons.forEach((pokemon,index) => {
            
            if (pokemons[index].name.toLowerCase().includes(valor)){
            
            let nomPokemon = pokemons[index].name;
            let imatgePokemon = pokemons[index].img;
            let pesPokemon = pokemons[index].weight;
            let idPokemon = pokemons[index].num;

            pokemonsCercats.push(pokemons[index]); //guardo els resultats de la cerca

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
        taula += getHeaderByLlista();
        municipis.forEach((municipi,index) => {
            if (municipis[index].nom.toLowerCase().includes(valor)){
                let ineMunicipi = municipis[index].ine;
                let escutMunicipi = municipis[index].escut;
                let nomsMunicipi = municipis[index].nom;
                let nombreHabitantsMunicipi= municipis[index].habitants;
                taula+= "<tr>";
                taula += `<td> ${ineMunicipi} </td> <td><img src="${escutMunicipi}"><td> ${nomsMunicipi} </td></td><td>${nombreHabitantsMunicipi}</td>`;
                taula += "</tr>";
            }
        });
                
        taula += "</table>";
        div.innerHTML = taula;
    }else if (tipus == "meteorit"){
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += getHeaderByLlista();
        meteos.forEach((meteorit,index) => {
            if (meteos[index].nom.toLowerCase().includes(valor)){
                let idMeteorit = meteos[index].id;
                let nomMeteorit = meteos[index].nom;
                let anyMeteorit = meteos[index].any;
                
                taula+= "<tr>";
                taula += `<td> ${idMeteorit} </td><td> ${nomMeteorit} </td><td>${anyMeteorit}</td>`;
                taula += "</tr>";
            }
        });

        taula += "</table>";
        div.innerHTML = taula;
        
    }else if (tipus == "movies"){
        console.log(pelis);
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += getHeaderByLlista();
        pelis.forEach((movie,index) => {
            if (pelis[index].titol.toLowerCase().includes(valor)){
            let imatgePeli = pelis[index].img;
            let titolPeli = pelis[index].titol;
            let anyPeli = pelis[index].any;
            let puntuacioPeli = pelis[index].puntuacio;
            
            taula+= "<tr>";
            taula += `<td> <img src="${imatgePeli}"> </td><td> ${titolPeli} </td><td>${anyPeli}</td><td>${puntuacioPeli}</td>`;
            taula += "</tr>";
            }
        });

        taula += "</table>";
        div.innerHTML = taula;
    }
	
}

function calcMitjana(){
    let comptador = 0;
    let totalPes = 0;
    pokemons.forEach((pokemon,index) => {
        comptador++; // comptem el total de pokemons 
        totalPes += parseInt(pokemons[index].weight);
        
        
    });
    let mitjana = document.getElementById("mitjanaPes");
    mitjana.innerHTML = `${(totalPes/comptador).toFixed(2)}kg`;
    
}

function printList(){
    let valor = getTipusLlista();
    
    if (valor == "pokemon"){
        let div = document.getElementById("taulaDades");
        let taula = "<table class>";
        taula += getHeaderByLlista();
        pokemons.forEach((pokemon,index) => {
            let nomPokemon = pokemons[index].name;
            let imatgePokemon = pokemons[index].img;
            let pesPokemon = pokemons[index].weight;
            let idPokemon = pokemons[index].num;
            taula+= "<tr>";
            taula += `<td> ${idPokemon} </td> <td><img src="${imatgePokemon}"><td> ${nomPokemon} </td></td><td>${pesPokemon}kg</td>`;
            taula += "</tr>";
        });
                
        taula += "</table>";
        div.innerHTML = taula;
        showChart(); // Mostrem el Chart
    } else if (valor == "municipis") {
        destrueixChart();
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += getHeaderByLlista();
        municipis.forEach((municipi,index) => {
            let ineMunicipi = municipis[index].ine;
            let escutMunicipi = municipis[index].escut;
            let nomsMunicipi = municipis[index].nom;
            let nombreHabitantsMunicipi= municipis[index].habitants;
            taula+= "<tr>";
            taula += `<td> ${ineMunicipi} </td> <td><img src="${escutMunicipi}"><td> ${nomsMunicipi} </td></td><td>${nombreHabitantsMunicipi}</td>`;
            taula += "</tr>";
        });
                
        taula += "</table>";
        div.innerHTML = taula;
       
    } else if (valor == "meteorit") {
        destrueixChart();
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += getHeaderByLlista();
        meteos.forEach((meteorit,index) => {
            let idMeteorit = meteos[index].id;
            let nomMeteorit = meteos[index].nom
            let anyMeteorit = meteos[index].any;
            
            taula+= "<tr>";
            taula += `<td> ${idMeteorit} </td><td> ${nomMeteorit} </td></td><td>${anyMeteorit}</td>`;
            taula += "</tr>";
        });

        taula += "</table>";
        div.innerHTML = taula;
        
    } else if (valor == "movies") {
        destrueixChart();
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += getHeaderByLlista();
        pelis.forEach((movie,index) => {
            
            let imatgePeli = pelis[index].img;
            let titolPeli = pelis[index].titol;
            let anyPeli = pelis[index].any;
            let puntuacioPeli = pelis[index].puntuacio;
            
            taula+= "<tr>";
            taula += `<td> <img src="${imatgePeli}"> </td><td> ${titolPeli} </td><td>${anyPeli}</td><td>${puntuacioPeli}</td>`;
            taula += "</tr>";
        });

        taula += "</table>";
        div.innerHTML = taula;
    }
    
}

// Funció que activa un event listener per al input de cerca 

function cerca() {
    let inputSearch = document.getElementById('txtSearch');
    inputSearch.addEventListener('input', (e) => {
    searchList(inputSearch.value);
    });
}
// Funció que mostra el Chart
function showChart(){ 

   destrueixChart();

    let arrayLabels=["Grass","Poison","Fire","Flying","Water","Bug","Normal","Electric","Ground","Fighting","Psychic","Rock","Ice","Ghost","Dragon"];
    let arrayDadesGraf=[14,33,12,19,32,12,24,9,14,8,14,11,5,3,3];
    let backgroundColor = [];
    let borderColor = [];

    arrayLabels.forEach(() => {
        let r = Math.floor(Math.random() * 256).toString();
        let g = Math.floor(Math.random() * 256).toString();
        let b = Math.floor(Math.random() * 256).toString();
        
        borderColor.push(`rgba(${r},${g},${b})`);
        backgroundColor.push(`rgba(${r},${g},${b}, 0.5)`);
    });

    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: arrayLabels,
        datasets: [{
          label: '# of Pokemons',
          data: arrayDadesGraf,
          borderWidth: 1,
          backgroundColor: backgroundColor,
          borderColor: borderColor
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}
//Elimina el chart
function destrueixChart (){
    if (myChart){
        myChart.destroy();
    }
}

f
//Passa el thead segons el valor de la llista seleccionada
function getHeaderByLlista(){
   
let headerPokemon = "<th onclick='orderList(\"num\")'>#</th><th>Imatge</th><th onclick='orderList(\"name\")'>Nom</th><th onclick='orderList(\"weight\")'>Pes</th>";
let headerMunicipis = "<th onclick='orderList(\"ine\")'>INE</th><th>Escut</th><th onclick='orderList(\"nom\")'>Nom</th><th onclick='orderList(\"habitants\")'>NºHabitants</th>"; 
let headerMeteorits = "<th onclick='orderList(\"id\")'>Id</th><th onclick='orderList(\"nom\")'>Nom</th><th onclick='orderList(\"any\")'>Any</th>";
let headerMovies = "<th>Imatge</th><th onclick='orderList(\"titol\")'>Titol</th><th onclick='orderList(\"any\")'>Any</th><th onclick='orderList(\"puntuacio\")'>Puntuació</th>";

let tipus = getTipusLlista();
    if (tipus == "pokemon"){
        return headerPokemon;
  
    }else if (tipus == "municipis"){
        return headerMunicipis;

    }else if (tipus == "meteorit"){
       return headerMeteorits;

    }else if (tipus == "movies"){
        return headerMovies;
    }
}

//Mira el valor de la llista seleccionada 
function getTipusLlista(){
    let llista = document.querySelector('select[name="llistes"]');
    let tipus = llista.value;
    return tipus;
}

