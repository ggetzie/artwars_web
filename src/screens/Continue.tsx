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
    <div className="mt-30">
      <ul className="bare-list">
        {games.map((g) => (
          <li key={g.id} className="art-list-li mb-6 text-center">
            <Link to={`/continue/${g.id}`}>
              <p>
                {g.player} - {new Date(g.started).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Continue = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [games, setGames] = useState<gameState[]>([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setLoading(true);
    const gameList = loadGames();
    setGames(gameList);
    setLoading(false);
  }, [updated]);

  return (
    <>
      <ScreenHeader showBack={true} title="Load Saved Game" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          className="button danger"
          title="Delete all saved games"
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
          Clear
        </button>
      </div>
      {loading ? <p>Loading</p> : <GameList games={games} />}
    </>
  );
};

export default Continue;
