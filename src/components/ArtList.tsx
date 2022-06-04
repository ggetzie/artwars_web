import React from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks";
import {currentHot} from "../reducers/game";
import {Artwork} from "../util/types";

const ArtListItem = ({
  artwork,
  urlBase,
  linkTitle,
  className,
  id,
}: {
  artwork: Artwork;
  urlBase: string;
  linkTitle: string;
  className: string;
  id?: string;
}) => {
  const game = useAppSelector((state) => state.game);
  const isHot = artwork.static.category === currentHot(game);
  return (
    <li className={className} id={id}>
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
  emptyMessage,
  divClass = "art-list",
  headerClass = "art-list-h3",
  ulClass = "art-list-ul",
  liClass = "art-list-li",
  emptyClass = "m-0",
  targetId,
  listTargetId,
}: {
  title: string;
  artworks: Artwork[];
  urlBase: string;
  linkTitleBase: string;
  emptyMessage: string;
  divClass?: string;
  headerClass?: string;
  ulClass?: string;
  liClass?: string;
  emptyClass?: string;
  targetId?: string;
  listTargetId?: string;
}) => {
  return (
    <div className={divClass} id={listTargetId}>
      <h3 className={headerClass}>{title}</h3>
      {artworks.length > 0 ? (
        <ul className={ulClass}>
          {artworks.map((value, i) => (
            <ArtListItem
              key={value.static.id}
              artwork={value}
              urlBase={urlBase}
              linkTitle={linkTitleBase}
              className={liClass}
              id={i === 0 ? targetId : ""}
            />
          ))}
        </ul>
      ) : (
        <p className={emptyClass}>{emptyMessage}</p>
      )}
    </div>
  );
};

export default ArtList;
export {ArtListItem};
