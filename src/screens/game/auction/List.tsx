import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {ArtList} from "../../../components";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {filterArtWorks, selectCity} from "../../../reducers/game";
import {Artwork} from "../../../util/types";
import {ArtWorkFilter} from "../../../util/awFilter";
import {setShowBack, setTitle} from "../../../reducers/header";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const artworks: Artwork[] = filterArtWorks(
    game,
    new ArtWorkFilter({
      auction: (a) => a === true,
      city: (c) => c === city,
      destroyed: (d) => d === false,
    })
  );

  useEffect(() => {
    dispatch(setTitle("Auction"));
    dispatch(setShowBack(false));
  }, [dispatch]);

  return (
    <div className="tab-container">
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
