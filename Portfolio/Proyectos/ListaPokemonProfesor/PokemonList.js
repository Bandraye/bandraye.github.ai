const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#defde0",
  electric: "#fcf7de",
  water: "#def3fd",
  ground: "#f4e7da",
  rock: "#d5d5d5",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaea",
  flying: "#f5f5f5",
  fighting: "#E6E0D4",
  normal: "#f5f5f5",
};
const main_types = Object.keys(colors);

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const pokemonData = await response.json();
  createPokemonCard(pokemonData);
};

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("li");
  pokemonEl.classList.add(
    "pokemon",
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start"
  );
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const poke_types = pokemon.types.map((type) => type.type.name);

  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;
  const pokemonInnerHTML = `
             
                 
    <div class="ms-2 me-auto">
    <div class="img-container">
                 <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="">
                </div>
      <div class="fw-bold">${name} -  ${type}</div>
     
    </div>
    <span class="badge bg-primary rounded-pill">${id}</span>
  
        `;
  pokemonEl.innerHTML = pokemonInnerHTML;
  console.log(pokemonEl);
  poke_container.appendChild(pokemonEl);
};

// const createPokemonCard = (pokemon) => {
//   const pokemonEl = document.createElement("div");
//   pokemonEl.classList.add("pokemon");
//   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
//   const id = pokemon.id.toString().padStart(3, "0");
//   const poke_types = pokemon.types.map((type) => type.type.name);
//   const type = main_types.find((type) => poke_types.indexOf(type) > -1);
//   const color = colors[type];
//   pokemonEl.style.backgroundColor = color;
//   const pokemonInnerHTML = `
//             <div class="img-container">
//                 <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
//                   pokemon.id
//                 }.png" alt="">
//                 </div>
//                 <div class="info">
//                     <span class="number">
//                         #${id}
//                     </span>
//                     <h3 class="name">
//                         ${name}
//                     </h3>
//                     <small class="type">Type: <span>${
//                       type[0].toUpperCase() + type.slice(1)
//                     }</span></small>
//                 </div>
//             </div>
//         </div>`;

//   pokemonEl.innerHTML = pokemonInnerHTML;

//   poke_container.appendChild(pokemonEl);
// };

fetchPokemons();
