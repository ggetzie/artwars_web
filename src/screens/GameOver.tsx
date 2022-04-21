import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {useAppSelector} from "../hooks";

import {
  getMaxTurns,
  portfolioValue,
  selectBalance,
  selectPlayer,
} from "../reducers/game";
import {insertNewHS, sortScoresDescending} from "../util";
import {deleteGame, loadHighScores, saveHighScores} from "../util/persist";
import {ScoreList, ScreenHeader} from "../components";
import {v4 as uuid} from "uuid";
import {HighScore} from "../util/types";

const GameOver = () => {
  const game = useAppSelector((state) => state.game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);
  const value = portfolioValue(game);
  const maxTurns = getMaxTurns(game);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [hsIndex, setHsIndex] = useState(-1);

  useEffect(() => {
    deleteGame(game.id);
  }, [game.id]);

  useEffect(() => {
    const score = Math.round((balance + value) / maxTurns);
    const oldScores = loadHighScores().sort(sortScoresDescending);
    const [highScores, newHSIndex] = insertNewHS(oldScores, {
      id: uuid(),
      player: player,
      score: score,
      date: game.started,
    });
    saveHighScores(highScores);
    setScore(score);
    setHighScores(highScores);
    setHsIndex(newHSIndex);
  }, [balance, value, maxTurns, game.started, player]);

  return (
    <div>
      <ScreenHeader showBack={false} title="Game Over" />
      <p>Score: {score.toLocaleString()}</p>
      {hsIndex > -1 && <p>Congratulations! You achieved a new high score!</p>}
      {highScores.length > 0 && (
        <>
          <h3>High Scores</h3>
          <ScoreList scores={highScores} highlight={hsIndex} />
        </>
      )}
      <div className="button-row">
        <Link to="/" title="Home" className="button primary">
          Home
        </Link>
        <Link to="/new-game" title="New Game" className="button primary">
          New Game
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
