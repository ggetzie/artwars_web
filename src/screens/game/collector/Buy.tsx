import React, {SetStateAction, useState, Dispatch} from "react";
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  currentNPC,
  getArtwork,
  selectBalance,
  selectPlayer,
  transact,
} from "../../../reducers/game";

import {considerSell} from "../../../util";
import {Transaction, Artwork} from "../../../util/types";
import {
  ArtDetail,
  IntegerInput,
  NPCDialog,
  ScreenHeader,
} from "../../../components";

const OfferRow = ({
  setOffer,
  offer,
  submit,
}: {
  setOffer: Dispatch<SetStateAction<number>>;
  offer: number;
  submit: () => void;
}) => {
  return (
    <div className="row offer-input">
      <IntegerInput
        placeholder="Enter an offer amount"
        setNum={setOffer}
        editable={true}
      />
      <button
        title="Make Offer"
        type="button"
        className="br-2"
        disabled={Number.isNaN(offer)}
        onClick={submit}
      >
        Make Offer
      </button>
    </div>
  );
};

const Buy = () => {
  const game = useAppSelector((state) => state.game);
  const player = selectPlayer(game);
  const npc = currentNPC(game);
  const params = useParams();
  const artworkId: string = params.artworkId as string;

  const [offer, setOffer] = useState<number>(0);
  const [dialogue, setDialogue] = useState("Give me your best offer.");
  const [sold, setSold] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  let offerText;
  if (Number.isNaN(offer)) {
    offerText = <p className="error m-0">Enter a valid number.</p>;
  } else {
    offerText = <p className="m-0">Offering ${offer.toLocaleString()}</p>;
  }

  const submitOffer = (artwork: Artwork) => {
    if (offer > balance) {
      setDialogue("You don't have that much money!");
      return;
    }
    const response = considerSell(
      artwork.data.currentValue,
      offer,
      artwork.static.category === npc.data.preference
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
    }
  };

  try {
    const artwork = getArtwork(game, parseInt(artworkId, 10));
    return (
      <div className="collector-container">
        <ScreenHeader showBack={true} title="Make an Offer" />
        <ArtDetail artwork={artwork} />

        {sold ? (
          <div className="text-center mt-6">
            <h4 className="m-0">Congratulations!</h4>
            <p>
              You just purchased {artwork.static.title} for $
              {offer.toLocaleString()}
            </p>
          </div>
        ) : (
          <>
            <p className="text-center text-bold fs-14">{offerText}</p>
            <OfferRow
              offer={offer}
              setOffer={setOffer}
              submit={() => submitOffer(artwork)}
            />
          </>
        )}

        <NPCDialog dialogue={dialogue} image={npc.character.image} />
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
