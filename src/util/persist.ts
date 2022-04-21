import {gameState} from "../reducers/game";
import {HighScore} from "./types";
const GAME_KEY = "artwars_SavedGames";
const HS_KEY = "artwars_HighScores";

async function saveGame(game: gameState) {
  try {
    const games = await loadGames();
    const res = games.filter((s) => s.id !== game.id); // replace previous save, if it exists
    localStorage.setItem(GAME_KEY, JSON.stringify(res.concat(game)));
    return new Promise<void>((resolve, _) => resolve());
  } catch (e) {
    console.log(`Error saving game - ${game.id} - ${e}`);
  }
}

function deleteGame(gameId: string) {
  const games = loadGames();
  localStorage.setItem(
    GAME_KEY,
    JSON.stringify(games.filter((g) => g.id !== gameId))
  );
}

function deleteAllSavedGames() {
  localStorage.removeItem(GAME_KEY);
}

function loadGames(): gameState[] {
  const games = localStorage.getItem(GAME_KEY);
  const res = games ? JSON.parse(games) : [];
  return res;
}

async function loadGame(gameId: string): Promise<gameState> {
  const gameStr = localStorage.getItem(GAME_KEY);
  const games = gameStr ? JSON.parse(gameStr) : [];
  for (const game of games) {
    if (game.id === gameId) {
      return new Promise((resolve, _) => resolve(game));
    }
  }
  throw new Error(`Game not found: ${gameId}`);
}

function saveHighScores(scores: HighScore[]) {
  localStorage.setItem(HS_KEY, JSON.stringify(scores));
}

function loadHighScores(): HighScore[] {
  const scores = localStorage.getItem(HS_KEY) || "[]";
  return JSON.parse(scores);
}

function deleteAllHighScores() {
  localStorage.removeItem(HS_KEY);
}

export {
  saveGame,
  deleteGame,
  deleteAllSavedGames,
  loadGame,
  loadGames,
  saveHighScores,
  loadHighScores,
  deleteAllHighScores,
};
