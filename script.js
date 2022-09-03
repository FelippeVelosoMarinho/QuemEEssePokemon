const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonNext = document.querySelector('.btn-next');

let searchPokemon = Math.floor(Math.random() * 151 + 1);

let pts = 0;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
   /* pokemonName.innerHTML = 'Você acertou :)';*/
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Você errou :c';
    pokemonNumber.innerHTML = '';
  }



  let newText = document.createTextNode(`Acertos: ${pts}`);
  let h2 = document.querySelector('#pts');
  h2.innerHTML="";
  h2.appendChild(newText); 


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(data.name == input.value.toLowerCase()){
      pts += 1;
      //document.getElementById("blur").style.blur = "0px";
      //var delay=3000; //3 segundos
      /*setTimeout(function(){
          renderPokemon(searchPokemon); //location.href = "index.html";
      },delay);*/
    }
  });

  buttonNext.addEventListener('click', () => {
    if(data.name == input.value.toLowerCase()){
      pts += 1;
    }
  });

}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  //renderPokemon(input.value.toLowerCase());
  renderPokemon(Math.floor(Math.random() * 151 + 1));
});

buttonNext.addEventListener('click', () => {
  searchPokemon = Math.floor(Math.random() * 151 + 1);
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
/*
- A cada acerto de pokemon, soma uma pontuação e aparece na tela o pokemon sem o blur por alguns segundos
- Pegar pontuação de acertos e printar na tela
innertextHTML.`Sua pontuação é: $(pts)`
if(pokemon.data==input){
  pts += 1;
  document.getElementById("blur").style.blur = "0px";

  var delay=3000; //3 segundos
  setTimeout(function(){
      renderPokemon(searchPokemon); //location.href = "index.html";
  },delay);
  }
*/