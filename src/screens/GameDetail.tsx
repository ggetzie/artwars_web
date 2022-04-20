import React, {MouseEventHandler, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {setGame, portfolioValue} from "../reducers/game";
import {deleteGame, loadGame} from "../util/persist";
import {gameState} from "../reducers/game";
import {ScreenHeader} from "../components";

const GameInfo = ({
  game,
  onConfirm,
  onDelete,
}: {
  game: gameState;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <p>{game.player}</p>
      <p>Started: {new Date(game.started).toLocaleString()}</p>
      <p>
        Turn {game.turn} of {game.maxTurns}
      </p>
      <p>Balance: ${game.balance.toLocaleString()}</p>
      <p>Portfolio Value: ${portfolioValue(game).toLocaleString()}</p>
      <div className="button-row">
        <button
          type="button"
          className="button danger"
          title="Delete"
          onClick={onDelete}
        >
          Delete
        </button>

        <button
          type="button"
          className="button primary"
          title="Load"
          onClick={onConfirm}
        >
          Load
        </button>
      </div>
    </>
  );
};

const GameDetail = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedGame, setLoadedGame] = useState<gameState>(game);

  useEffect(() => {
    setLoading(true);
    loadGame(params.gameId as string)
      .then((game) => {
        setLoadedGame(game);
        console.log(game.id);
        console.log(game.player);
      })
      .catch((e) => console.log(`Error loading game ${e}`))
      .finally(() => setLoading(false));
  }, [params.gameId]);

  return (
    <div>
      <ScreenHeader showBack={true} title="Load Game" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GameInfo
          game={loadedGame}
          onConfirm={() => {
            dispatch(setGame(loadedGame as gameState));
            navigate("/game/city");
          }}
          onDelete={() => {
            deleteGame(loadedGame?.id).then(() => navigate("/continue"));
          }}
        />
      )}
    </div>
  );
};

export default GameDetail;
