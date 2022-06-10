import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {listPowerUps, setTour} from "../../../reducers/game";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {setShowBack, setTitle} from "../../../reducers/header";
import {Tour} from "../../../components";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const powerUps = listPowerUps(game).filter((p) => !p.purchased);
  const purchased = listPowerUps(game).filter((p) => p.purchased);

  useEffect(() => {
    dispatch(setTitle("Shop"));
    dispatch(setShowBack(false));
    dispatch(setTour("shopList"));
  }, [dispatch]);

  return (
    <div className="tab-container">
      <h3 className="mt-0 mb-6">Select a Power Up to purchase</h3>
      {powerUps.length > 0 ? (
        <ul className="art-list-ul" id="shopList">
          {powerUps.map((pu, i) => (
            <li key={i} className="art-list-li" id={`shopListItem${i}`}>
              <Link to={`/game/shop/buy/${pu.name}`}>
                <div className="shop-row mb-6">
                  <p>{pu.name}</p>
                  <p>${pu.price.toLocaleString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Looks like you bought everything, MoneyBags.</p>
      )}
      {purchased.length > 0 && (
        <>
          <h3 className="m-0">Purchased</h3>
          <ul className="art-list-ul">
            {purchased.map((pu, i) => (
              <li key={i} className="art-list-li mb-6">
                <p>{pu.name}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      <Tour section="shopList" />
    </div>
  );
};

export default List;
