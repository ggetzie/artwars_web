import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {bidIncrement, otherBidders, initialAsking} from "../../../util";
import {ArtworkData, Transaction} from "../../../util/types";
import {ArtDetail, Tour} from "../../../components";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  currentHot,
  selectBalance,
  selectPlayer,
  transact,
  updateArtwork,
  getArtwork,
  selectCity,
} from "../../../reducers/game";

import {setTour} from "../../../reducers/game";
import {setShowBack, setTitle} from "../../../reducers/header";

const Buy = () => {
  // Auction Logic: Once a player has placed a bid they cannot leave the detail
  // screen unless they win the auction or quit (lose). If they quit with
  // another bid being the current highest bid, the artwork will be sold for the
  // last bid to the anon buyer and removed from auction.
  // If the player keeps placing bids until all other buyers refuse, they win the auction
  // and the artwork is sold to them for the last bid.
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  const hot = currentHot(game);
  const player = selectPlayer(game);
  const {artworkId} = useParams();
  const artwork = getArtwork(game, parseInt(artworkId as string, 10));
  const city = selectCity(game);
  const [sold, setSold] = useState(false);
  if (artwork.data.city !== city || (!artwork.data.auction && !sold)) {
    throw new Error("This is not an artwork that is on auction in this city");
  }
  const [bidStarted, setBidStarted] = useState(false);
  const [asking, setAsking] = useState(
    initialAsking(artwork.data.currentValue, artwork.static.category === hot)
  );
  const [lastBid, setLastBid] = useState(0);
  const [canBid, setCanBid] = useState(asking < balance);
  const [message, setMessage] = useState(
    canBid
      ? "Think you've got the stones to bid, eh?"
      : "You don't have enough money to bid"
  );

  useEffect(() => {
    dispatch(setTitle("Auction"));
    dispatch(setShowBack(true));
    dispatch(setTour("auctionBuy"));
  }, [dispatch]);

  function loseAuction() {
    const updated: ArtworkData = {
      ...artwork.data,
      auction: false,
      currentValue: lastBid,
      owner: "anon",
    };
    dispatch(updateArtwork(updated));
    setBidStarted(false);
    setSold(true);
  }

  const placeBid = () => {
    setBidStarted(true);
    setLastBid(asking);
    const newAsking = asking + bidIncrement(asking);
    const otherBid = otherBidders(
      artwork.data.currentValue,
      newAsking,
      hot === artwork.static.category
    );
    if (otherBid) {
      setLastBid(newAsking);
      setAsking(newAsking + bidIncrement(newAsking));
      setMessage(
        `Another buyer bid $${newAsking.toLocaleString()}! Bid again?`
      );

      if (asking > balance) {
        setMessage("Another buyer bid more money than you have!");
        loseAuction();
        setCanBid(false);
        setBidStarted(false);
      }
    } else {
      setMessage(`You won the auction! Now you own ${artwork.static.title}`);
      const t: Transaction = {
        id: artwork.data.id,
        price: -1 * asking,
        newOwner: player,
      };
      dispatch(transact(t));
      setBidStarted(false);
      setCanBid(false);
      setSold(true);
    }
  };

  return (
    <div className="tab-container">
      <ArtDetail artwork={artwork} />
      <div className="row mt-10">
        <div className="col">
          <p className="m-0 fs-12 text-bold text-center" id="currentAsking">
            Asking: ${asking.toLocaleString()}
          </p>
        </div>
        <div className="col">
          <p className="m-0 fs-12 text-bold text-center">
            Last Bid: ${lastBid.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="button-row">
        <button
          id="giveUp"
          title="Stop bidding and concede"
          type="button"
          className="button secondary"
          disabled={!bidStarted}
          onClick={() => {
            setMessage("Too rich for your blood, eh?");
            loseAuction();
            setCanBid(false);
            setBidStarted(false);
          }}
        >
          Give Up
        </button>

        <button
          id="placeBid"
          title="Place Bid"
          type="button"
          className="button primary"
          disabled={!canBid}
          onClick={placeBid}
        >
          Place Bid
        </button>
      </div>
      <div id="auctionMessages" className="mt-4">
        {message.length > 0 && <p className="text-center">{message}</p>}
      </div>
      <Tour section="auctionBuy" />
    </div>
  );
};

export default Buy;
