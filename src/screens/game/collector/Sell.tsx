import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  currentNPC,
  getArtwork,
  selectPlayer,
  transact,
} from "../../../reducers/game";
import {setTour} from "../../../reducers/game";

import {considerBuy} from "../../../util";
import {Artwork, Transaction} from "../../../util/types";
import {
  ArtDetail,
  Congrats,
  NPCDialog,
  OfferRow,
  OfferText,
  Tour,
} from "../../../components";
import {setShowBack, setTitle} from "../../../reducers/header";

const Sell = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const {artworkId} = useParams();
  const npc = currentNPC(game);
  const [asking, setAsking] = useState<number>(0);
  const [dialogue, setDialogue] = useState<string>("");
  const [sold, setSold] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(Number.MAX_VALUE);

  useEffect(() => {
    dispatch(setTitle(npc.character.name));
    dispatch(setShowBack(true));
    dispatch(setTour("collectorSell"));
  }, [npc.character.name, dispatch]);

  const setPrice = (artwork: Artwork) => {
    const decision = considerBuy(
      artwork.data.currentValue,
      asking,
      artwork.static.category === npc.data.preference,
      limit
    );
    setDialogue(npc.character.dialogue.buying[decision]);
    if (decision === "accept" || decision === "enthusiasm") {
      const t: Transaction = {
        id: artwork.data.id,
        price: asking,
        newOwner: npc.character.name,
      };
      dispatch(transact(t));
      setSold(true);
    } else {
      setLimit(asking);
    }
  };
  try {
    const artwork = getArtwork(game, parseInt(artworkId as string, 10));
    const player = selectPlayer(game);
    if (artwork.data.owner !== player && !sold) {
      throw new Error("That ain't your art!");
    }
    return (
      <div className="tab-container">
        <ArtDetail artwork={artwork} />
        {sold ? (
          <Congrats>
            <p>
              You just sold {artwork.static.title} for $
              {asking.toLocaleString()}
            </p>
          </Congrats>
        ) : (
          <>
            <OfferText value={asking} prefix="Asking price:" />
            <OfferRow
              value={asking}
              setOutput={setAsking}
              submit={() => setPrice(artwork)}
              placeholder="Enter an asking price"
              buttonTitle="Set Price"
              inputId="askingInput"
              buttonId="askingButton"
            />
          </>
        )}
        <NPCDialog
          dialogue={dialogue}
          image={npc.character.image}
          id="npcDialogue"
        />
        <Tour section="collectorSell" />
      </div>
    );
  } catch (e) {
    console.log(e);
    return (
      <div className="tab-container">
        <NPCDialog
          dialogue="Hmm, trouble finding your art? Poor thing."
          image={npc.character.image}
        />
      </div>
    );
  }
};

export default Sell;
