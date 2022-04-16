import React from "react";
import {Link} from "react-router-dom";
import {HighScore} from "../util/types";

const ScoreList = ({
  scores,
  highlight,
}: {
  scores: HighScore[];
  highlight: number;
}) => {
  let content;
  if (scores.length > 0) {
    content = scores.map((v, i) => (
      <li key={i} className={i === highlight ? "highlight" : ""}>
        {v.player} - {v.score} - {v.date}
      </li>
    ));
  } else {
    content = (
      <>
        <li>No High Scores found.</li>
        <li>
          Try starting a{" "}
          <Link to="/new-game" title="New Game">
            New Game
          </Link>
        </li>
      </>
    );
  }
  return <ul className="score-list">{content}</ul>;
};

export default ScoreList;
