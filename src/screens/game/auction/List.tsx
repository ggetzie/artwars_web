import React from "react";
import {Link} from "react-router-dom";
import {ArtList, ScreenHeader} from "../../../components";
import {useAppSelector} from "../../../hooks";
import {filterArtWorks, selectCity} from "../../../reducers/game";
import {Artwork} from "../../../util/types";
import {ArtWorkFilter} from "../../../util/awFilter";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const city = selectCity(game);
  const artworks: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({
      auction: (a) => a === true,
      city: (c) => c === city,
      destroyed: (d) => d === false,
    })
  );

  return (
    <div className="tab-container">
      <ScreenHeader showBack={false} title={`Works for auction in ${city}`} />
      <Link
        title="Sell one of your works at auction"
        className="nav-button"
        to="/game/auction/sell/"
      >
        Sell
      </Link>
      <ArtList
        artworks={artworks}
        title="Offerings"
        urlBase="/game/auction/buy"
        linkTitleBase="Click to join the auction"
        emptyMessage="Oops! Looks like no art for auction here"
      />
    </div>
  );
};

export default List;
