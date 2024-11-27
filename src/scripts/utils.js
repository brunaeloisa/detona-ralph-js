export function generateStartScreen() {
  return `
    <div class="start-screen">
      <h1>Start game</h1>
      <input id="easy" type="radio" value="easy" name="mode" checked><label for="easy">Easy mode</label>
      <input id="hard" type="radio" value="hard" name="mode"><label for="hard">Hard mode</label>
      <button id="start-button">Press start...</button>
    </div>
  `;
}

export function generateGameScreen() {
  return `
    <div class="panel-row">
      <div class="square" id="0"></div>
      <div class="square" id="1"></div>
      <div class="square" id="2"></div>
    </div>
    <div class="panel-row">
      <div class="square" id="3"></div>
      <div class="square" id="4"></div>
      <div class="square" id="5"></div>
    </div>
    <div class="panel-row">
      <div class="square" id="6"></div>
      <div class="square" id="7"></div>
      <div class="square" id="8"></div>
    </div>
  `;
}

export function generateEndingScreen(score) {
  return `
    <div class="end-screen">
      <h1>Game over!</h1>
      <p>Final score: ${score}</p>
      <button id="restart-button">Restart</button>
      <button id="menu-button">Menu</button>
    </div>
  `;
}