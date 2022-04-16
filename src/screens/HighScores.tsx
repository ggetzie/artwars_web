import React, {useEffect, useState} from "react";

import {ScoreList, ScreenHeader} from "../components";
import {loadHighScores} from "../util/persist";
import {HighScore} from "../util/types";

const HighScores = () => {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setLoading(true);
    loadHighScores()
      .then((s) => setScores(s))
      .catch((err) => console.log(`Error loading high scores: ${err}`))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <ScreenHeader showBack={true} title="High Scores" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ScoreList scores={scores} highlight={-1} />
      )}
    </>
  );
};

export default HighScores;
