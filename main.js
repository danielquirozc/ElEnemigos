const container = document.getElementById('container-games');
const searchInput = document.getElementById('search'); 

const GAMES_LIMIT = 12;
let games = [];
let filteredGames = []; 

// Función para obtener los datos de los videojuegos
async function fetchGames() {
  try {
    const httpResponse = await fetch('games.json');
    if (!httpResponse.ok) {
      throw new Error(`HTTP error! status: ${httpResponse.status}`);
    }
    const jsonData = await httpResponse.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

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

fetchGames()
  .then((data) => {
    games = data;
    renderGames(games);
  })
  .catch((error) => {
    console.error('Error fetching games:', error);
  });

searchInput.addEventListener('keyup', filterGames);
