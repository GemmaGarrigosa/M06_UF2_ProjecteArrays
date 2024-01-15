// TODO  BUSCA ASC DESC DE RESTA DE TAULES, BUSCA GENERAL DE MOVIES I CONSTRUÏR TAULA MOVIES


/* PART 0: Accedir al JSON i començar a llistar dades */
let myChart;
let info = [];
let pokemons=[];
let municipis =[];
let meteos =[];
let pelis =[];
let chartPokemon="";

// POKEMONS
fetch("js/data/pokemon.json")
    .then((response) => response.json())
    .then((data) => {
        let nomsPokemon = data.pokemon;
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
            meteos.push([meteorit.id, meteorit.name, meteorit.year.slice(0,4)]);
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
            pelis.push([movie.url, movie.title,movie.year, movie.rating]);
            
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
function orderList(ordre,valor){  // FER EL ORDRE SEGONS CAMP I SEGONS TIPUS
    
    let llista = getTipusLlista();
    if (llista == "pokemon"){
        if (ordre=="ASC"){
            pokemons.sort();
        }   
        if (ordre =="DESC") {
            pokemons.sort().reverse();
        }
        printList();
        
    }else if (llista == "municipis"){
        if (ordre=="ASC"){
            municipis.sort();
        }   
        if (ordre =="DESC") {
            municipis.sort().reverse();
        }
    printList();

    }else if (llista == "meteorit"){
        if (ordre=="ASC"){
            meteos.sort();
        }   
        if (ordre =="DESC") {
            meteos.sort().reverse();
        }   
        printList(); 
    }else if (llista == "movies"){
        if (ordre=="ASC"){
            pelis.sort();
        }   
        if (ordre =="DESC") {
            pelis.sort().reverse();
        }
        printList();
    }

	
}

// Funció que fa de buscador, per llògica he decidit que busqui pel nom 
function searchList(value){

    let valor = value.toLowerCase();
    let llista = document.querySelector('select[name="llistes"]');
    let tipus = llista.value; // agafem quina llista ha escollit l'usuari per buscar només en aquesta

    // console.log(`Aquest es el valor ${valor} i aquest és el tipus ${tipus}`);

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
        municipis.forEach((municipi,index) => {
            if (municipis[index][2].toLowerCase().includes(valor)){
                let ineMunicipi = municipis[index][0];
                let escutMunicipi = municipis[index][1];
                let nomsMunicipi = municipis[index][2];
                let nombreHabitantsMunicipi= municipis[index][3];
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
        taula += "<th>Id</th><th>Nom</th><th>Any</th>";
        meteos.forEach((meteorit,index) => {
            if (meteos[index][1].toLowerCase().includes(valor)){
                let idMeteorit = meteos[index][0];
                let nomMeteorit = meteos[index][1];
                let anyMeteorit = meteos[index][2];
                
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
        taula += "<th>Titol</th><th>Imatge</th><th>Any</th><th>Puntuació</th>";
        pelis.forEach((movie,index) => {
            if (pelis[index][1].toLowerCase().includes(valor)){
            let imatgePeli = pelis[index][0];
            let titolPeli = pelis[index][1];
            let anyPeli = pelis[index][2];
            let puntuacioPeli = pelis[index][3];
            
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
        let taula = "<table class>";
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
        showChart(); // Mostrem el Chart
    } else if (valor == "municipis") {
        destrueixChart();
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>INE</th><th>Escut</th><th>Nom</th><th>NºHabitants</th>";
        municipis.forEach((municipi,index) => {
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
        destrueixChart();
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>Id</th><th>Nom</th><th>Any</th>";
        meteos.forEach((meteorit,index) => {
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
        destrueixChart();
        let div = document.getElementById("taulaDades");
        let taula = "<table>";
        taula += "<th>Imatge</th><th>Titol</th><th>Any</th><th>Puntuació</th>";
        pelis.forEach((movie,index) => {
            
            let imatgePeli = pelis[index][0];
            let titolPeli = pelis[index][1];
            let anyPeli = pelis[index][2];
            let puntuacioPeli = pelis[index][3];
            
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

function destrueixChart (){
    if (myChart){
        myChart.destroy();
    }
}

function getTipusLlista(){
    let llista = document.querySelector('select[name="llistes"]');
    let tipus = llista.value;
    return tipus;
}