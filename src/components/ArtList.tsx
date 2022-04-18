import React from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks";
import {currentHot} from "../reducers/game";
import {Artwork} from "../util/types";

const ArtListItem = ({
  artwork,
  urlBase,
  linkTitle,
}: {
  artwork: Artwork;
  urlBase: string;
  linkTitle: string;
}) => {
  const game = useAppSelector((state) => state.game);
  const isHot = artwork.static.category === currentHot(game);
  return (
    <li key={artwork.static.id}>
      <Link to={`${urlBase}/${artwork.static.id}`} title={linkTitle}>
        <p>{artwork.static.title}</p>
        <p>by {artwork.static.artist}</p>
        <p>Current value: ${artwork.data.currentValue.toLocaleString()}</p>
        <p>
          Category:{" "}
          <span className={isHot ? "hot" : ""}>{artwork.static.category}</span>
        </p>
      </Link>
    </li>
  );
};

const ArtList = ({
  title,
  artworks,
  urlBase,
  linkTitleBase,
}: {
  title: string;
  artworks: Artwork[];
  urlBase: string;
  linkTitleBase: string;
}) => {
  return (
    <div className="art-list">
      <h3>{title}</h3>
      <ul>
        {artworks.map((value) => (
          <ArtListItem
            key={value.static.id}
            artwork={value}
            urlBase={urlBase}
            linkTitle={linkTitleBase}
          />
        ))}
      </ul>
    </div>
  );
};

export default ArtList;
export {ArtListItem};
