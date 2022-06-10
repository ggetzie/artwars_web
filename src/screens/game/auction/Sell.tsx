import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {bidIncrement, otherBidders} from "../../../util";
import {Transaction} from "../../../util/types";

import {ArtDetail, OfferRow, OfferText, Tour} from "../../../components";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  currentHot,
  getArtwork,
  selectCity,
  selectPlayer,
  transact,
  ownsPowerUp,
} from "../../../reducers/game";
import {setTour} from "../../../reducers/game";
import {initialAsking} from "../../../util";
import {setShowBack, setTitle} from "../../../reducers/header";

type AuctionStatus =
  | "notStarted"
  | "firstBid"
  | "calledForBid"
  | "bidMade"
  | "finished";

const Sell = () => {
  // Auction Sell Logic:
  // Player sets asking price
  // roll to decide if a bid
  // if no bids at initial asking - update message to lower asking price and restart
  // if a bid, keep rolling until no new bids
  // sold to highest bidder
  const game = useAppSelector((state) => state.game);
  const player = selectPlayer(game);
  const city = selectCity(game);
  const dispatch = useAppDispatch();
  const hot = currentHot(game);
  const [status, setStatus] = useState<AuctionStatus>("notStarted");

  const [lastBid, setLastBid] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  const {artworkId} = useParams();
  const artwork = getArtwork(game, parseInt(artworkId as string, 10));
  const isHot = hot === artwork.static.category;
  const starting = initialAsking(artwork.data.currentValue, isHot);
  const [asking, setAsking] = useState(starting);
  if (
    status !== "finished" &&
    (artwork.data.owner !== player ||
      (artwork.data.city !== city && !ownsPowerUp(game, "Yacht")))
  ) {
    throw new Error("You can't sell this artwork");
  }

  function callForBids() {
    const newAsking = asking + bidIncrement(asking);
    setAsking(newAsking);
    setMessages(
      [
        `Do I hear $${newAsking.toLocaleString()}?`,
        `Fabulous! We have a bid for $${lastBid.toLocaleString()}.`,
      ].concat(messages)
    );
    setStatus("calledForBid");
  }

  function checkBids() {
    const nextBid = otherBidders(artwork.data.currentValue, asking, isHot);
    if (nextBid) {
      setLastBid(asking);
      setStatus("bidMade");
    } else {
      if (status === "firstBid") {
        setMessages(["No bidders! Try lowering the asking price."]);
        setStatus("notStarted");
      } else {
        setMessages(
          [`Sold! for $${lastBid.toLocaleString()}`].concat(messages)
        );
        const t: Transaction = {
          id: artwork.data.id,
          newOwner: "anon",
          price: lastBid,
        };
        dispatch(transact(t));
        setStatus("finished");
      }
    }
  }

  useEffect(() => {
    dispatch(setShowBack(status === "notStarted" || status === "finished"));
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(setTitle("Auction"));
    dispatch(setTour("auctionSell"));
  });

  useEffect(() => {
    switch (status) {
      case "firstBid":
      case "calledForBid":
        checkBids();
        break;
      case "bidMade":
        callForBids();
        break;
      default:
        break;
    }
  });
  return (
    <div className="tab-container">
      <ArtDetail artwork={artwork} />
      <OfferText value={asking} prefix="Asking price:" id="currentAsking" />
      <OfferRow
        placeholder="Enter an asking price."
        setOutput={setAsking}
        buttonTitle="Start Auction"
        submit={() => {
          const askingText = asking.toLocaleString();
          setMessages([
            `Bidding starts at $${askingText}. Do I have any bids?`,
            `Ladies and Gentlemen we have ${artwork.static.title} for sale.`,
          ]);
          setStatus("firstBid");
        }}
        value={asking}
        disabled={status === "finished"}
        inputId="askingInput"
        buttonId="startAuction"
      />
      <ul className="auction-messages" id="auctionMessages">
        {messages.length > 0 ? (
          messages.map((m, i) => <li key={i}>{m}</li>)
        ) : (
          <li>Enter an initial asking price and press "Start Auction"</li>
        )}
      </ul>
      <Tour section="auctionSell" />
    </div>
  );
};

export default Sell;
