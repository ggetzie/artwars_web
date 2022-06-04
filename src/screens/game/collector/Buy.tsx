import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  currentNPC,
  getArtwork,
  selectBalance,
  selectPlayer,
  transact,
} from "../../../reducers/game";

import {setTour} from "../../../reducers/game";

import {considerSell} from "../../../util";
import {Transaction, Artwork} from "../../../util/types";
import {
  ArtDetail,
  OfferRow,
  OfferText,
  NPCDialog,
  Congrats,
  Tour,
} from "../../../components";
import {setShowBack, setTitle} from "../../../reducers/header";

// player is buying from NPC
// NPC is selling to player
const Buy = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const params = useParams();
  const artworkId: string = params.artworkId as string;

  const [offer, setOffer] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>("Give me your best offer.");
  const [sold, setSold] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);

  const balance = selectBalance(game);

  useEffect(() => {
    dispatch(setTitle(npc.character.name));
    dispatch(setShowBack(true));
    dispatch(setTour("collectorBuy"));
  }, [npc.character.name, dispatch]);

  const submitOffer = (artwork: Artwork) => {
    if (offer > balance) {
      setDialogue("You don't have that much money!");
      return;
    }
    const response = considerSell(
      artwork.data.currentValue,
      offer,
      artwork.static.category === npc.data.preference,
      limit
    );
    setDialogue(npc.character.dialogue.selling[response]);
    if (response === "accept" || response === "enthusiasm") {
      const t: Transaction = {
        id: artwork.data.id,
        price: -1 * offer,
        newOwner: player,
      };
      dispatch(transact(t));
      setSold(true);
    } else {
      setLimit(offer);
    }
  };

  try {
    const artwork = getArtwork(game, parseInt(artworkId, 10));
    return (
      <div className="tab-container">
        <ArtDetail artwork={artwork} />

        {sold ? (
          <Congrats>
            <p>
              You just purchased {artwork.static.title} for $
              {offer.toLocaleString()}
            </p>
          </Congrats>
        ) : (
          <>
            <OfferText value={offer} prefix="Offering:" />
            <OfferRow
              value={offer}
              setOutput={setOffer}
              submit={() => submitOffer(artwork)}
              placeholder="Enter an offer amount"
              buttonTitle="Make Offer"
              inputId="offerInput"
              buttonId="offerButton"
            />
          </>
        )}

        <NPCDialog
          dialogue={dialogue}
          image={npc.character.image}
          id="collectorDialogue"
        />
        <Tour section="collectorBuy" />
      </div>
    );
  } catch (e) {
    console.log(e);
    return (
      <NPCDialog
        dialogue="That ain't no artwork I ever heard of!"
        image={npc.character.image}
      />
    );
  }
};

export default Buy;
