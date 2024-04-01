const container = document.getElementById('container-games');
const searchInput = document.getElementById('search'); 
const botones = document.getElementsByClassName('platform-button');

const GAMES_LIMIT = 20;
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
  if (tipoDeJuego == "uncrackedGames") {
    
  }
  for (let i = 0; i < GAMES_LIMIT; i++) {
    const { title, cover_url, game_size, status} = gamesToRender[i];
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.innerHTML = `
      <div class="game-card-spotlight"></div>
      <img src="${cover_url}" alt="${title}">
      <h2>${title}</h2>
      <p>${game_size ? game_size : status}</p>
    `;
    container.appendChild(gameCard);
  }

  // Agregar eventos de mousemove a los videojuegos y efecto spotlight
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach((card) => {
    card.onmousemove = (event) => {
      const spotlight = card.firstElementChild
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left + "px";
      const y = event.clientY - rect.top + "px";
      spotlight.style.setProperty('--x', x);
      spotlight.style.setProperty('--y', y);
    };
  });
}

// Función para filtrar los videojuegos
function filterGames() {
  filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderGames(filteredGames); // Renderizar los videojuegos filtrados
}

searchInput.addEventListener('keyup', filterGames);

