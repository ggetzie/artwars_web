import React from "react";
import {getPowerUp, buyPowerUp, selectBalance} from "../../../reducers/game";
import {useAppSelector, useAppDispatch} from "../../../hooks";
import {useParams} from "react-router-dom";
import {ScreenHeader} from "../../../components";

const Buy = () => {
  const game = useAppSelector((state) => state.game);
  const balance = selectBalance(game);
  const params = useParams();
  const powerUp = getPowerUp(game, params.name as string);
  const tooExpensive = balance < powerUp.price;
  const dispatch = useAppDispatch();

  return (
    <div className="tab-container">
      <ScreenHeader showBack={true} title={powerUp.name} />
      <p>{powerUp.description}</p>
      {tooExpensive && !powerUp.purchased && (
        <p>You don't have enough cash to buy this item. Try not being poor.</p>
      )}
      {powerUp.purchased && <p>You own this.</p>}

      <div className="button-row">
        <button
          className="button secondary"
          title="Cancel"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          title="Buy"
          className="button primary"
          disabled={tooExpensive || powerUp.purchased}
          onClick={() => {
            dispatch(buyPowerUp(powerUp.name));
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Buy;
