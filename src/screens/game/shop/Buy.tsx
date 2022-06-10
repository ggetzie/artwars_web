import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getPowerUp, buyPowerUp, selectBalance} from "../../../reducers/game";
import {useAppSelector, useAppDispatch} from "../../../hooks";
import {setShowBack, setTitle} from "../../../reducers/header";
import {setTour} from "../../../reducers/game";
import {Tour} from "../../../components";

const Buy = () => {
  const game = useAppSelector((state) => state.game);
  const balance = selectBalance(game);
  const params = useParams();
  const powerUp = getPowerUp(game, params.name as string);
  const tooExpensive = balance < powerUp.price;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle("Shop"));
    dispatch(setShowBack(true));
    dispatch(setTour("shopBuy"));
  }, [dispatch]);

  return (
    <div className="tab-container">
      <div className="text-center">
        <h3 className="fs-16 mt-0 mb-4">{powerUp.name}</h3>
        <p className="text-bold m-0">${powerUp.price.toLocaleString()}</p>
        <p className="text-center">{powerUp.description}</p>
        {tooExpensive && !powerUp.purchased && (
          <p>
            You don't have enough cash to buy this item. Try not being poor.
          </p>
        )}
        {powerUp.purchased && <p>You own this.</p>}
      </div>

      <div className="button-row">
        <button
          id="cancelButton"
          className="button secondary"
          title="Cancel"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          id="buyButton"
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
      <Tour section="shopBuy" />
    </div>
  );
};

export default Buy;
