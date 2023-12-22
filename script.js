const APIPOKEMON = "https://pokeapi.co/api/v2/pokemon/";

const pokemon_count = 150;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

async function selectNumPokemons(num) {
    for (let id = 1; id <= num; id++) {
        await showPokeDex(id);
    }
}
async function showPokeDex(id){
    
    try {
        const response = await fetch(APIPOKEMON + id);
        const responseJson = await response.json();
        printPokemonHTML(responseJson);
    } 
    catch (error) {
        alert(`Error al obtener datos del Pokémon para el ID ${id}: ${error.message}`);
        console.error(`Error al obtener datos del Pokémon para el ID ${id}:`, error);
    }
}

function printPokemonHTML(data){
    const poke_container = document.getElementById('poke-container');

   const pokemonCard = document.createElement("div");
   pokemonCard.classList.add("pokemon");
   pokemonCard.style.background = colors[data.types[0].type.name];

   const imgContainer = document.createElement("div");
   imgContainer.classList.add("img-container");

   const pokeImg = document.createElement("img");
   pokeImg.src = data.sprites.other['official-artwork'].front_default;
   pokeImg.alt = data.name;

   const pokeInfo = document.createElement("div");
   pokeInfo.classList.add("info");

   const pokeId = document.createElement("span");
   pokeId.classList.add("number");
   pokeId.innerHTML = `#${String(data.id).padStart(3, '0')}`;

   const pokeName = document.createElement("h3");
   pokeName.classList.add("name");
   pokeName.innerHTML = (data.name).charAt(0).toUpperCase() + (data.name).slice(1);;

   const pokeType = document.createElement("small");
   pokeType.classList.add("type");
   pokeType.innerHTML = `Type: <span>${data.types[0].type.name}</span>`;

   imgContainer.appendChild(pokeImg);

   pokeInfo.appendChild(pokeId);
   pokeInfo.appendChild(pokeName);
   pokeInfo.appendChild(pokeType);

   pokemonCard.appendChild(imgContainer);
   pokemonCard.appendChild(pokeInfo);

   poke_container.appendChild(pokemonCard);
}

selectNumPokemons(pokemon_count);
