import React from "react";
import {listPowerUps, selectBalance} from "../../../reducers/game";
import {useAppSelector} from "../../../hooks";
import {ScreenHeader} from "../../../components";
import {Link} from "react-router-dom";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const powerUps = listPowerUps(game).filter((p) => !p.purchased);
  const purchased = listPowerUps(game).filter((p) => p.purchased);
  const balance = selectBalance(game);

  return (
    <div className="tab-container">
      <ScreenHeader showBack={false} title="Power Ups for Sale" />
      <p>Current Balance: ${balance.toLocaleString()}</p>
      {powerUps.length > 0 ? (
        <ul className="art-list-ul">
          {powerUps.map((pu, i) => (
            <li key={i} className="art-list-li">
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
        <p>Looks like you bought everything, Moneybags.</p>
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
    </div>
  );
};

export default List;
