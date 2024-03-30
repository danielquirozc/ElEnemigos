const container = document.getElementById('container-games')

// Limite del numero de juegos a mostrar
const GAMES_LIMIT = 12

// Funcion para traer los datos
async function fetchGames() {
  const httpResponse = await fetch('games.json')
  const DataJson = await httpResponse.json()
  return DataJson
}

// Funcion para mostrar los datos
function mapGames(game) {
  game.map((element, index) => {
    if (index < GAMES_LIMIT) {
      const gameCard = document.createElement('div')
      gameCard.classList.add('game-card')
      gameCard.innerHTML = `
      <img src="${element.cover_url}" alt="">
      <h2>${element.title}</h2>
      <p>${element.game_size}</p>
      `
      container.appendChild(gameCard)
    }
  })
}


fetchGames().then((data) => {
  mapGames(data)
})