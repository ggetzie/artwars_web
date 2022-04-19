import React, {MouseEventHandler} from "react";
import {useAppSelector} from "../hooks";
import {currentHot} from "../reducers/game";
import {Artwork} from "../util/types";
import {getArtworkImageUrl} from "../util";

const ArtDetail = ({
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
  const imgUrl = getArtworkImageUrl(artwork);
  return (
    <div className="row" onClick={onClick}>
      <div className="col">
        <p>{artwork.static.title}</p>
        <p>by {artwork.static.artist}</p>
        <p>Value: ${value}</p>
        <p>
          Category:{" "}
          <span className={hot === artwork.static.category ? "hot" : "normal"}>
            {artwork.static.category}
          </span>
        </p>
        <p>Location: {artwork.data.city}</p>
        <p>Owner: {artwork.data.owner || "Anon"}</p>
      </div>
      <div className="col">
        <img
          style={{maxWidth: "100%"}}
          src={imgUrl}
          alt={artwork.static.title}
        />
      </div>
    </div>
  );
};

export default ArtDetail;
