import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {useAppSelector, useAppDispatch} from "../../../hooks";
import {Cities} from "../../../util";
import {Tour} from "../../../components";
import {
  getDuty,
  selectBalance,
  updateArtwork,
  debitBalance,
  getArtwork,
  ownsPowerUp,
  artworkIdIsValid,
} from "../../../reducers/game";
import {setTour} from "../../../reducers/game";
import {CityName} from "../../../util/types";
import {setShowBack, setTitle} from "../../../reducers/header";

const DutyMsg = ({txt}: {txt: string}) => {
  return (
    <div id="dutyMsg">
      {txt.split("\n").map((s, i) => (
        <p key={i} className="m-0">
          {s}
        </p>
      ))}
    </div>
  );
};

const Confirm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  // get destination city from params and make sure it's valid
  const destination = params.destination as CityName;
  if (!Object.values(Cities).includes(destination)) {
    throw new Error("Invalid destination city");
  }

  const game = useAppSelector((state) => state.game);

  // get artwork from params and make sure it's valid
  const artworkIdStr = params.artworkId;
  const artworkId = parseInt(artworkIdStr as string, 10);
  if (!artworkIdIsValid(game, artworkId)) {
    throw new Error("Invalid Artwork Id");
  }
  const artwork = getArtwork(game, artworkId);

  const balance = selectBalance(game);
  const hasFreeport = ownsPowerUp(game, `Freeport: ${destination}`);
  const duty = getDuty(game, destination);
  const taxBill = hasFreeport
    ? 0
    : Math.round(duty * artwork.data.currentValue);
  const canMove = hasFreeport || balance > taxBill;

  const [message, setMessage] = useState("");
  const [moved, setMoved] = useState(false);
  let taxMessage;

  if (hasFreeport) {
    taxMessage = `No import duties required, thanks to your freeport in ${destination}`;
  } else {
    if (canMove) {
      taxMessage = `${destination} charges an import duty of ${(
        duty * 100.0
      ).toFixed(2)}% of the value of the artwork.
      $${taxBill.toLocaleString()} will be deducted from your cash balance. Proceed?`;
    } else {
      taxMessage = `${
        duty * 100
      }% import duty at ${destination} amounts to a tax bill of $${taxBill.toLocaleString()}
      You don't have enough cash to pay the tax man! Try selling some artworks to raise capital.`;
    }
  }

  useEffect(() => {
    dispatch(setTitle("Portfolio"));
    dispatch(setShowBack(true));
    dispatch(setTour("portfolioConfirm"));
  }, [dispatch]);

  return (
    <div className="tab-container">
      <div className="text-center">
        <h3>Confirm Move</h3>
        <p>
          Confirm moving {artwork.static.title} from {artwork.data.city} to{" "}
          {destination}.
        </p>
        <DutyMsg txt={taxMessage} />
      </div>
      {canMove && (
        <div className="button-row">
          <button
            className="button secondary"
            id="cancelMove"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            title="Confirm"
            id="confirmMove"
            className="button primary"
            onClick={() => {
              dispatch(
                updateArtwork({
                  ...artwork.data,
                  city: destination,
                })
              );
              dispatch(debitBalance(taxBill));
              setMoved(true);
              setMessage("Move complete!");
            }}
            disabled={moved}
          >
            Confirm
          </button>
        </div>
      )}

      {message.length > 0 && <p>{message}</p>}
      <Tour section="portfolioConfirm" />
    </div>
  );
};

export default Confirm;
