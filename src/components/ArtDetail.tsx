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
      <div className="col art-info">
        <p className="mt-0 mb-2 fs-12 text-bold">{artwork.static.title}</p>
        <p className="m-0">
          <em>{artwork.static.artist}</em>
        </p>
        <p className="mt-0 mb-6">
          <span className={hot === artwork.static.category ? "hot" : "normal"}>
            {artwork.static.category}
          </span>
        </p>
        <p className="m-0">Location: {artwork.data.city}</p>
        <p className="m-0">Owner: {artwork.data.owner || "Anon"}</p>
        <p className="m-0" id="artValue">
          Value: ${value}
        </p>
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
