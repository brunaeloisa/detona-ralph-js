import { generateStartScreen, generateGameScreen, generateEndingScreen } from "./utils.js";

const state = {
  view: {
    timeLeft: document.getElementById('time-left'),
    score: document.getElementById('score'),
    lives: document.getElementById('lives'),
    display: document.getElementById('display')
  },
  values: {
    moveInterval: 900,
    movementId: null,
    scorePoints: 0,
    startingTime: 60,
    currentTime: 0,
    countdownId: null,
    currentLives: 3
  }
};

function initGame() {
  state.values.scorePoints = 0;
  state.values.currentLives = 3;
  state.values.moveInterval = (state.values.mode === 'easy') ? 900 : 600;
  state.values.startingTime = (state.values.mode === 'easy') ? 60 : 10;
  state.values.currentTime = state.values.startingTime;

  updateTimer();
  updateLives();
  updateScore();

  displayGameScreen();
  addListenerHitBox();
  startCountdown();
  randomMove();
  startEnemyMovement();
}

function gameOver() {
  playSound('gameover.mp3');

  // para o jogo
  stopEnemyMovement();
  stopCountdown();

  // exibe tela de game over
  displayEndingScreen(state.values.scorePoints);
}

function displayStartScreen() {
  state.values.scorePoints = 0;
  state.values.currentTime = 0;
  state.values.currentLives = 0;

  updateTimer();
  updateScore();
  updateLives();
  
  state.view.display.innerHTML = generateStartScreen();
  document.getElementById("start-button").addEventListener('click', () => {
    // armazena o modo de jogo escolhido
    state.values.mode = document.querySelector('input[name="mode"]:checked').value;
    initGame();
  });
}

function displayGameScreen() {
  state.view.display.innerHTML = generateGameScreen();
  state.view.squares = document.querySelectorAll('.square');
}

function displayEndingScreen() {
  state.view.display.innerHTML = generateEndingScreen(state.values.scorePoints);
  document.getElementById("restart-button").addEventListener('click', initGame);
  document.getElementById("menu-button").addEventListener('click', displayStartScreen);
}

function clearPanel() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });
}

function randomMove() {
  // sorteia nova posição do inimigo
  const squareId = Math.floor(9 * Math.random());
  state.view.squares[squareId].classList.add('enemy');
}

function startEnemyMovement() {
  if (state.values.movementId) {
    stopEnemyMovement();
  }
  state.values.movementId = setInterval(() => {
    clearPanel();
    randomMove();

    if (state.values.mode === 'hard') {
      state.values.currentTime--;
      state.view.timeLeft.textContent = state.values.currentTime;
      playSound('time.mp3');

      if (state.values.currentTime == 0) {
        gameOver();
      }
    }
  }, state.values.moveInterval);
}

function stopEnemyMovement() {
  if (state.values.movementId) {
    clearInterval(state.values.movementId);
    state.values.movementId = null;
  }
}

function addListenerHitBox() {
  // adiciona click event para cada quadrado
  state.view.squares.forEach((square) => {
    square.addEventListener('click', () => {
      if (square.classList.contains('enemy')) {
        playSound('hit.mp3');
        clearPanel();

        // atualiza score
        state.values.scorePoints++;
        updateScore();

        if (state.values.mode === 'hard') {
          // gera nova posição do inimigo
          randomMove();

          // reinicia o movimento
          startEnemyMovement();

          // a cada 20 pontos ganha +10segs
          if (state.values.scorePoints % 20 === 0) {
            state.values.currentTime += 10;
            updateTimer();
          }
        }
      } else {
        playSound('wrong.mp3');

        // ao clicar no quadrado errado diminui uma vida
        state.values.currentLives--;
        state.view.lives.innerText = `x${state.values.currentLives}`;

        // encerra o jogo se acabarem as vidas
        if (state.values.currentLives <= 0) {
          gameOver();
        }
      }
    });
  });
}

function updateScore() {
  state.view.score.innerHTML = state.values.scorePoints;
}

function updateLives() {
  state.view.lives.innerHTML = `x${state.values.currentLives}`;
}

function updateTimer() {
  state.view.timeLeft.textContent = state.values.currentTime;
}

function countdown() {
  state.values.currentTime--;
  updateTimer();

  // encerra o jogo se acabar o tempo
  if (state.values.currentTime == 0) {
    gameOver();
  }
}

function startCountdown() {
  state.values.countdownId = setInterval(countdown, 1000);
}

function stopCountdown() {
  clearInterval(state.values.countdownId);
  state.values.countdownId = null;
}

function playSound(fileName) {
  let audio = new Audio(`./src/audios/${fileName}`);
  audio.volume = 0.1;
  audio.play();
}

displayStartScreen();