// Protocolo agnóstico de transporte.
// O ESP32 poderá usar os mesmos tipos de mensagens via WebSocket.
const GameProtocol = Object.freeze({
  types: {
    JOIN: "join",
    CREATE_ROOM: "create_room",
    START_GAME: "start_game",
    PLAY: "play",
    DRAW: "draw",
    PASS: "pass",
    STATE: "state",
    ERROR: "error",
    PLAYER_JOINED: "player_joined",
    PLAYER_LEFT: "player_left",
    GAME_OVER: "game_over"
  },

  create(type, payload = {}) {
    return JSON.stringify({ type, payload });
  },

  parse(message) {
    try {
      const data = typeof message === "string" ? JSON.parse(message) : message;
      if (!data || typeof data.type !== "string") return null;
      return data;
    } catch {
      return null;
    }
  }
});
