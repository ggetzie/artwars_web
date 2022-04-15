import React, {MouseEventHandler} from "react";
import {useAppSelector} from "../hooks";
import {currentHot} from "../reducers/game";
import {Artwork} from "../util/types";

const ArtItem = ({
  artwork,
  onClick,
  location = false,
}: {
  artwork: Artwork;
  onClick?: MouseEventHandler<HTMLDivElement>;
  location?: boolean;
}) => {
  const value = Math.round(artwork.data.currentValue).toLocaleString();
  const game = useAppSelector((state) => state.game);
  const hot = currentHot(game);
  return (
    <div className="card" onClick={onClick}>
      <p>{artwork.static.title}</p>
      <p>by {artwork.static.artist}</p>
      <p>Value: ${value}</p>
      <p>
        Category:{" "}
        <span className={hot === artwork.static.category ? "hot" : "normal"}>
          {artwork.static.category}
        </span>
      </p>
      {location && <p>Location: {artwork.data.city}</p>}
    </div>
  );
};

export default ArtItem;
