import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {currentNPC, filterArtWorks, setTour} from "../../../reducers/game";

import {ArtWorkFilter} from "../../../util/awFilter";
import {ArtList, Tour} from "../../../components";
import {Artwork} from "../../../util/types";
import {NPCImages} from "../../../util";
import {setShowBack, setTitle} from "../../../reducers/header";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const npc = currentNPC(game);
  const artworks: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({owner: (o) => o === npc.character.name})
  );

  useEffect(() => {
    dispatch(setTitle(npc.character.name));
    dispatch(setShowBack(false));
    dispatch(setTour("collectorList"));
  }, [npc.character.name, dispatch]);

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
          <p id="collectorLikes">Likes: {npc.data.preference}</p>
        </div>
      </div>
      <Link
        title="Sell"
        className="nav-button"
        to="/game/collector/sell/"
        id="collectorSellButton"
      >
        Sell
      </Link>

      <ArtList
        artworks={artworks}
        title="Collection"
        urlBase="/game/collector/buy"
        linkTitleBase="Click to make an offer"
        emptyMessage={`Oops! ${npc.character.name} ran out of art. How embarrassing!`}
        targetId="collectorArtListItem"
        listTargetId="collectorArtList"
      />
      <Tour section="collectorList" />
    </div>
  );
};

export default List;
