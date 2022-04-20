import React, {useState} from "react";
import {useParams} from "react-router-dom";

import {useAppSelector, useAppDispatch} from "../../../hooks";
import {Cities} from "../../../util";
import {
  getDuty,
  selectBalance,
  updateArtwork,
  debitBalance,
  getArtwork,
  ownsPowerUp,
  artworkIdIsValid,
} from "../../../reducers/game";
import {CityName} from "../../../util/types";
import {ScreenHeader} from "../../../components";

const DutyMsg = ({txt}: {txt: string}) => {
  return (
    <>
      {txt.split("\n").map((s, i) => (
        <p key={i} className="m-0">
          {s}
        </p>
      ))}
    </>
  );
};

const Confirm = () => {
  const params = useParams();
  const game = useAppSelector((state) => state.game);

  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  let taxBill = 0;
  let canMove = false;
  const [message, setMessage] = useState("");
  let taxMessage = "";
  const [moved, setMoved] = useState(false);

  const artworkIdStr = params.artworkId;
  const artworkId = parseInt(artworkIdStr as string, 10);
  if (!artworkIdIsValid(game, artworkId)) {
    return <h1 className="Error">Invalid Artwork Id</h1>;
  }
  const artwork = getArtwork(game, artworkId);
  const destination = params.destination as CityName;
  if (!Object.values(Cities).includes(destination)) {
    return <h1 className="error">Invalid Destination</h1>;
  }
  if (ownsPowerUp(game, `Freeport: ${destination}`)) {
    taxMessage = `No import duties required, thanks to your freeport in ${destination}`;
    taxBill = 0;
    canMove = true;
  } else {
    const duty = getDuty(game, destination);
    taxBill = Math.round(duty * artwork.data.currentValue);
    canMove = balance > taxBill;
    if (canMove) {
      taxMessage = `${destination} charges an import duty of ${
        duty * 100
      }% of the value of the artwork.
      $${taxBill.toLocaleString()} will be deducted from your cash balance. Proceed?`;
    } else {
      taxMessage = `${
        duty * 100
      }% import duty at ${destination} amounts to a tax bill of $${taxBill.toLocaleString()}
      You don't have enough cash to pay the tax man! Try selling some artworks to raise capital.`;
    }
  }

  return (
    <div className="tab-container">
      <ScreenHeader showBack={true} title="Confirm Move" />
      <p>
        Confirm moving {artwork.static.title} from {artwork.data.city} to{" "}
        {destination}.
      </p>
      <DutyMsg txt={taxMessage} />
      {canMove && (
        <div className="button-row">
          <button
            className="button secondary"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            title="Confirm"
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
    </div>
  );
};

export default Confirm;
