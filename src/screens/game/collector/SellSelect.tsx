import React, {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  currentNPC,
  filterArtWorks,
  ownsPowerUp,
  selectCity,
  selectPlayer,
} from "../../../reducers/game";
import {setTour} from "../../../reducers/game";

import {ArtWorkFilter} from "../../../util/awFilter";
import {Artwork} from "../../../util/types";
import {ArtList, NPCDialog, Tour} from "../../../components";
import {setTitle, setShowBack} from "../../../reducers/header";

const SellSelect = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const ownsYacht = ownsPowerUp(game, "Yacht");
  const artFilter = new ArtWorkFilter({
    owner: (o) => o === player,
    destroyed: (d) => !d,
  });
  if (!ownsYacht) {
    artFilter.city = (c) => c === city;
  }
  const forSale: Artwork[] = filterArtWorks(game, artFilter);
  useEffect(() => {
    dispatch(setTitle(npc.character.name));
    dispatch(setShowBack(true));
    dispatch(setTour("collectorSellSelect"));
  }, [npc.character.name, dispatch]);
  return (
    <div className="tab-container">
      <NPCDialog
        dialogue="Oh you want to sell me something? Let's see what you've got."
        image={npc.character.image}
      />
      <ArtList
        title="Available to Sell"
        artworks={forSale}
        urlBase="/game/collector/sell"
        linkTitleBase="Offer to sell this work"
        emptyMessage="You don't have any artwork available to sell."
        listTargetId="collectorSellList"
        targetId="collectorSellListItem"
      />
      <Tour section="collectorSellSelect" />
    </div>
  );
};

export default SellSelect;
