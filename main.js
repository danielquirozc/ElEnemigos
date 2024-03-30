const container = document.getElementById('container-games');
const searchInput = document.getElementById('search'); 
const botones = document.getElementsByClassName('platform-button');

const GAMES_LIMIT = 12;
let games = [];
let filteredGames = []; 

let tipoDeJuego = "pcGames";

Object.values(botones).forEach((boton) => {
  boton.addEventListener(('click'), (event) => {
    tipoDeJuego = event.target.value
    fetchGames()
  })
})


// Función para obtener los datos de los videojuegos
async function fetchGames() {
  try {
    const httpResponse = await fetch(`gamesData/${tipoDeJuego}.json`);
    if (!httpResponse.ok) {
      throw new Error(`HTTP error! status: ${httpResponse.status}`);
    }
    const jsonData = await httpResponse.json();
    games = jsonData;
    renderGames(games);
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

fetchGames();

// Función para renderizar los videojuegos
function renderGames(gamesToRender) {
  container.innerHTML = ''; 
  for (let i = 0; i < GAMES_LIMIT; i++) {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.innerHTML = `
      <img src="${gamesToRender[i].cover_url}" alt="">
      <h2>${gamesToRender[i].title}</h2>
      <p>${gamesToRender[i].game_size}</p>
    `;
    container.appendChild(gameCard);
  }
}

// Función para filtrar los videojuegos
function filterGames() {
  filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderGames(filteredGames); // Renderizar los videojuegos filtrados
}

searchInput.addEventListener('keyup', filterGames);