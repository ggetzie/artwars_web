import React, {useEffect} from "react";

import {ArtList} from "../../../components";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  filterArtWorks,
  ownsPowerUp,
  selectCity,
  selectPlayer,
} from "../../../reducers/game";
import {setTour} from "../../../reducers/game";
import {setShowBack, setTitle} from "../../../reducers/header";
import {ArtWorkFilter} from "../../../util/awFilter";
import {Artwork} from "../../../util/types";
import {Tour} from "../../../components";

const SellSelect = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(setTitle("Auction"));
    dispatch(setShowBack(true));
    dispatch(setTour("auctionSellSelect"));
  }, [dispatch]);

  return (
    <div className="tab-container">
      <ArtList
        artworks={couldAuction}
        urlBase="/game/auction/sell"
        title="Select a work to sell"
        linkTitleBase="Click to offer at auction"
        emptyMessage="You have no artworks available to sell in this city"
        targetId="auctionSellListItem"
        listTargetId="auctionSellList"
      />
      <Tour section="auctionSellSelect" />
    </div>
  );
};

export default SellSelect;
