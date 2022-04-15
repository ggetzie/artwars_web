import React from "react";
import {HighScore} from "../util/types";

const ScoreList = ({
  scores,
  highlight,
}: {
  scores: HighScore[];
  highlight: number;
}) => {
  return (
    <div>
      <ul>
        {scores.map((v, i) => (
          <li key={i} className={i === highlight ? "highlight" : ""}>
            {v.player} - {v.score} - {v.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreList;
