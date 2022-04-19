import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {bidIncrement, otherBidders, initialAsking} from "../../../util";
import {ArtworkData, Transaction} from "../../../util/types";
import {ArtDetail, ScreenHeader} from "../../../components";
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
    canBid ? "" : "You don't have enough money to bid"
  );

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
      <ScreenHeader showBack={!bidStarted} title="Auction" />
      <ArtDetail artwork={artwork} />
      <p className="m-0">Last Bid: ${lastBid.toLocaleString()}</p>
      <p className="m-0">Asking: ${asking.toLocaleString()}</p>
      <div className="row">
        {bidStarted && (
          <button
            title="Give Up"
            type="button"
            onClick={() => {
              setMessage("Too rich for your blood, eh?");
              loseAuction();
              setCanBid(false);
              setBidStarted(false);
            }}
          >
            Give Up
          </button>
        )}
        {canBid && (
          <button
            title="Place Bid"
            type="button"
            disabled={!canBid}
            onClick={placeBid}
          >
            Place Bid
          </button>
        )}
      </div>
      {message.length > 0 && <p>{message}</p>}
    </div>
  );
};

export default Buy;
