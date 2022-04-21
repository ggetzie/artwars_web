import React, {useEffect, useState} from "react";

import {ScoreList, ScreenHeader} from "../components";
import {deleteAllHighScores, loadHighScores} from "../util/persist";
import {HighScore} from "../util/types";

const HighScores = () => {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<HighScore[]>([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setLoading(true);
    setScores(loadHighScores());
    setLoading(false);
  }, [updated]);
  return (
    <>
      <ScreenHeader showBack={true} title="High Scores" />
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
          title="Delete all high scores"
          onClick={() => {
            const confirmed = window.confirm(
              "This will delete all high scores. Are you sure?"
            );
            if (confirmed) {
              deleteAllHighScores();
              setUpdated(true);
            }
          }}
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ScoreList scores={scores} highlight={-1} />
      )}
    </>
  );
};

export default HighScores;
