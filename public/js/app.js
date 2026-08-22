const game = new DominoGame();
const startButton = document.querySelector("#startButton");
const resetButton = document.querySelector("#resetButton");
const playerName = document.querySelector("#playerName");
const setup = document.querySelector(".setup");
const gameView = document.querySelector("#game");
const hand = document.querySelector("#hand");
const board = document.querySelector("#board");
const playerLabel = document.querySelector("#playerLabel");
const turnLabel = document.querySelector("#turnLabel");
const message = document.querySelector("#message");

let localPlayerId = 1;

function tileElement(tile, clickable = false, index = -1) {
  const element = document.createElement("button");
  element.className = "domino";
  element.type = "button";
  element.innerHTML = `<span>${tile[0]}</span><span>${tile[1]}</span>`;
  if (!clickable) element.disabled = true;
  if (clickable) element.addEventListener("click", () => playTile(index));
  return element;
}

function render(state) {
  const player = state.players.find(p => p.id === localPlayerId);
  playerLabel.textContent = player?.name ?? "—";
  turnLabel.textContent = state.players[state.turn]?.name ?? "—";

  board.replaceChildren();
  state.board.forEach(tile => board.appendChild(tileElement(tile)));

  hand.replaceChildren();
  (player?.hand ?? []).forEach((tile, index) => {
    hand.appendChild(tileElement(tile, state.turn === 0 && state.started, index));
  });

  message.textContent = state.started
    ? state.turn === 0 ? "Sua vez. Clique em uma peça válida." : "Aguardando a vez do outro jogador."
    : "Partida encerrada.";
}

function playTile(index) {
  const result = game.play(0, index, game.board.length === 0 ? "right" : "right");
  if (!result.ok) {
    message.textContent = `Jogada inválida: ${result.error}`;
    return;
  }

  if (result.winner) message.textContent = `${result.winner} venceu!`;
  render(result.state);
}

function startGame() {
  const name = playerName.value.trim() || "Jogador 1";
  const state = game.start([name, "Jogador 2"]);
  setup.classList.add("hidden");
  gameView.classList.remove("hidden");
  render(state);
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", () => {
  gameView.classList.add("hidden");
  setup.classList.remove("hidden");
  playerName.focus();
});

playerName.addEventListener("keydown", event => {
  if (event.key === "Enter") startGame();
});
