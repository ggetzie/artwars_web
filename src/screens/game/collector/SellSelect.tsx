import React from "react";

import {useAppSelector} from "../../../hooks";
import {
  currentNPC,
  filterArtWorks,
  ownsPowerUp,
  selectCity,
  selectPlayer,
} from "../../../reducers/game";

import {ArtWorkFilter} from "../../../util/awFilter";
import {Artwork} from "../../../util/types";
import {ArtList, NPCDialog, ScreenHeader} from "../../../components";

const SellSelect = () => {
  const game = useAppSelector((state) => state.game);
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
  return (
    <div className="tab-container">
      <ScreenHeader showBack={true} title={`Sell to ${npc.character.name}`} />
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
      />
    </div>
  );
};

export default SellSelect;
