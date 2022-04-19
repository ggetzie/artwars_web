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

async function deleteGame(gameId: string) {
  try {
    const games = await loadGames();
    localStorage.setItem(
      GAME_KEY,
      JSON.stringify(games.filter((g) => g.id !== gameId))
    );
  } catch (e) {
    console.log(`Error deleting game ${gameId} - ${e}`);
  }
}

async function loadGames(): Promise<gameState[]> {
  try {
    const games = localStorage.getItem(GAME_KEY);
    const res = games ? JSON.parse(games) : [];
    return new Promise((resolve, _) => resolve(res));
  } catch (e) {
    console.log(`Error loading game list - ${e}`);
    return [];
  }
}

async function loadGame(gameId: string): Promise<gameState | undefined> {
  try {
    const gameStr = localStorage.getItem(GAME_KEY);
    const games = gameStr ? JSON.parse(gameStr) : [];
    for (const game of games) {
      if (game.id === gameId) {
        return new Promise((resolve, _) => resolve(game));
      }
    }
    throw new Error(`Game not found: ${gameId}`);
  } catch (e) {
    console.log(`Error loading game - ${gameId} - ${e}`);
  }
}

async function saveHighScores(scores: HighScore[]) {
  try {
    localStorage.setItem(HS_KEY, JSON.stringify(scores));
    return new Promise<void>((resolve, _) => resolve());
  } catch (e) {
    console.log(`Error saving high scores - ${e}`);
  }
}

async function loadHighScores(): Promise<HighScore[]> {
  try {
    const scores = localStorage.getItem(HS_KEY) || "[]";
    return new Promise((resolve, _) => resolve(JSON.parse(scores)));
  } catch (e) {
    console.log(`Error loading high scores - ${e}`);
    return [];
  }
}

export {
  saveGame,
  deleteGame,
  loadGame,
  loadGames,
  saveHighScores,
  loadHighScores,
};
