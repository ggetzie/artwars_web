import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {gameState} from "../reducers/game";
import {loadGames, deleteAllSavedGames} from "../util/persist";
import {ScreenHeader} from "../components";

const GameList = ({games}: {games: gameState[]}) => {
  if (games.length === 0) {
    return <p>No saved games</p>;
  }
  return (
    <ul className="bare-list">
      {games.map((g) => (
        <li key={g.id}>
          <Link to={`/continue/${g.id}`}>
            <p>
              {g.player} - {new Date(g.started).toLocaleString()}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Continue = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<gameState[]>([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadGames()
      .then((gameList) => {
        setGames(gameList);
        console.log(`loading ${gameList.length} games`);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [updated]);

  return (
    <>
      <ScreenHeader showBack={true} title="Load Saved Game" />
      <div>
        <button
          type="button"
          className="button danger"
          onClick={() => {
            const confirmed = window.confirm(
              "This will delete all saved games. Are you sure?"
            );
            if (confirmed) {
              deleteAllSavedGames();
              setUpdated(true);
            }
          }}
        >
          Clear saved Games
        </button>
      </div>
      {loading ? <p>Loading</p> : <GameList games={games} />}
    </>
  );
};

export default Continue;
