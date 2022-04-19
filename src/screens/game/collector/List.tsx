import React from "react";
import {Link} from "react-router-dom";

import {useAppSelector} from "../../../hooks";
import {currentNPC, filterArtWorks} from "../../../reducers/game";

import {ArtWorkFilter} from "../../../util/awFilter";
import {ArtList} from "../../../components";
import {Artwork} from "../../../util/types";
import {NPCImages} from "../../../util";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const npc = currentNPC(game);
  const artworks: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({owner: (o) => o === npc.character.name})
  );
  return (
    <div className="tab-container">
      <div className="collector-bio">
        <div className="collector-bio-image">
          <img
            className="pic-large"
            src={NPCImages[npc.character.image]}
            alt={`${npc.character.name}`}
          />
        </div>
        <div className="collector-bio-text">
          <p>{npc.character.bio}</p>
          <p>Likes: {npc.data.preference}</p>
        </div>
      </div>
      <Link title="Sell" className="nav-button" to="/game/collector/sell/">
        Sell
      </Link>
      <ArtList
        artworks={artworks}
        title="Collection"
        urlBase="/game/collector/buy"
        linkTitleBase="Click to make an offer"
        emptyMessage={`Oops! ${npc.character.name} ran out of art. How embarrassing!`}
      />
    </div>
  );
};

export default List;
