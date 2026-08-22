class DominoGame {
  constructor() {
    this.reset();
  }

  reset() {
    this.tiles = [];
    for (let a = 0; a <= 6; a++) {
      for (let b = a; b <= 6; b++) this.tiles.push([a, b]);
    }

    this.players = [];
    this.board = [];
    this.turn = 0;
    this.started = false;
  }

  shuffle() {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
  }

  start(playerNames = ["Jogador 1"]) {
    this.reset();
    this.shuffle();
    this.players = playerNames.map((name, index) => ({
      id: index + 1,
      name,
      hand: this.tiles.splice(0, playerNames.length === 2 ? 7 : 5)
    }));
    this.started = true;
    this.turn = 0;
    return this.stateFor(1);
  }

  canPlay(tile, side = "right") {
    if (this.board.length === 0) return true;
    const first = this.board[0][0];
    const last = this.board[this.board.length - 1][1];
    return side === "left"
      ? tile[0] === first || tile[1] === first
      : tile[0] === last || tile[1] === last;
  }

  orient(tile, side) {
    if (side === "left") {
      const target = this.board[0][0];
      return tile[1] === target ? tile : [tile[1], tile[0]];
    }
    const target = this.board[this.board.length - 1][1];
    return tile[0] === target ? tile : [tile[1], tile[0]];
  }

  play(playerIndex, tileIndex, side = "right") {
    if (!this.started) return { ok: false, error: "game_not_started" };
    if (playerIndex !== this.turn) return { ok: false, error: "not_your_turn" };

    const hand = this.players[playerIndex].hand;
    const tile = hand[tileIndex];
    if (!tile || !this.canPlay(tile, side)) return { ok: false, error: "invalid_move" };

    const placed = this.orient(tile, side);
    hand.splice(tileIndex, 1);

    if (side === "left") this.board.unshift(placed);
    else this.board.push(placed);

    if (hand.length === 0) {
      this.started = false;
      return { ok: true, winner: this.players[playerIndex].name, state: this.stateFor(1) };
    }

    this.turn = (this.turn + 1) % this.players.length;
    return { ok: true, state: this.stateFor(1) };
  }

  stateFor(playerId) {
    return {
      started: this.started,
      board: this.board.map(tile => [...tile]),
      turn: this.turn,
      players: this.players.map((player, index) => ({
        id: player.id,
        name: player.name,
        tiles: player.hand.length,
        hand: player.id === playerId ? player.hand.map(tile => [...tile]) : undefined,
        index
      }))
    };
  }
}
