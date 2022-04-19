import React from "react";

import {ArtList, ScreenHeader} from "../../../components";
import {useAppSelector} from "../../../hooks";
import {
  filterArtWorks,
  ownsPowerUp,
  selectCity,
  selectPlayer,
} from "../../../reducers/game";
import {ArtWorkFilter} from "../../../util/awFilter";
import {Artwork} from "../../../util/types";

const SellSelect = () => {
  const game = useAppSelector((state) => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const ownsYacht = ownsPowerUp(game, "Yacht");
  const artFilter = new ArtWorkFilter({
    owner: (o) => o === player,
    destroyed: (d) => !d,
  });
  if (!ownsYacht) {
    artFilter.city = (c) => c === city;
  }

  const couldAuction: Artwork[] = filterArtWorks(game, artFilter);

  return (
    <div className="tab-container">
      <ScreenHeader
        showBack={true}
        title="Select an artwork to sell at auction"
      />
      <ArtList
        artworks={couldAuction}
        urlBase="/game/auction/sell"
        title="Available"
        linkTitleBase="Click to offer at auction"
        emptyMessage="You have no artworks available to sell in this city"
      />
    </div>
  );
};

export default SellSelect;
