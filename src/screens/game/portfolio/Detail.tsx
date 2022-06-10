import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {
  getArtwork,
  isUnderInvestigation,
  artworkIdIsValid,
  ownsPowerUp,
  selectPlayer,
  setTour,
} from "../../../reducers/game";

import {Cities, NPCImages} from "../../../util";
import {CityName} from "../../../util/types";
import {ArtDetail, Dropdown, Tour} from "../../../components";
import {setShowBack, setTitle} from "../../../reducers/header";

const Investigation = () => {
  return (
    <>
      <img
        height={75}
        width={75}
        src={NPCImages.irsAgent}
        alt="Veteran IRS Agent Marshall Wallace stares at you. He dares you to defy him."
      />
      <p className="m-0">The IRS is investigating your nefarious dealings!</p>
      <p className="m-0">
        You can't move art between cities until you're cleared.
      </p>
    </>
  );
};

const DestinationSelect = ({
  to,
  onValueChange,
  dest,
  cities,
}: {
  to: string;
  onValueChange: React.ChangeEventHandler<HTMLSelectElement>;
  dest: CityName;
  cities: CityName[];
}) => {
  return (
    <div className="mt-10 button-row">
      <Dropdown
        onValueChange={onValueChange}
        selectedValue={dest}
        name="move-destination"
        itemList={cities.map((c) => [c, c])}
        labelText="Move to City"
        labelClass="sr-only"
        placeHolder="Select a City"
        controlClass="city-select"
        id="cityMoveSelect"
      />
      <Link
        className="primary"
        style={{
          width: "10em",
          padding: "1em",
          borderRadius: "0.2em",
          textAlign: "center",
        }}
        title="Move"
        to={to}
        id="moveConfirm"
      >
        Move
      </Link>
    </div>
  );
};

const Detail = () => {
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const investigated = isUnderInvestigation(game);
  const ownsYacht = ownsPowerUp(game, "Yacht");

  const params = useParams();
  const artworkIdStr = params.artworkId;
  const artworkId = parseInt(artworkIdStr as string, 10);
  if (!artworkIdIsValid(game, artworkId)) {
    throw new Error("Invalid Artwork Id");
  }
  const artwork = getArtwork(game, artworkId);

  if (artwork.data.owner !== selectPlayer(game)) {
    throw new Error("This is not an artwork in your portfolio");
  }
  const otherCities = Object.values(Cities).filter(
    (c) => c !== artwork.data.city
  ) as CityName[];
  const [dest, setDest] = useState<CityName>(otherCities[0]);

  if (artwork.data.owner !== selectPlayer(game)) {
    throw new Error("Invalid destination");
  }

  useEffect(() => {
    dispatch(setTitle("Portfolio"));
    dispatch(setShowBack(true));
    dispatch(setTour("portfolioDetail"));
  });
  return (
    <div className="tab-container">
      <ArtDetail artwork={artwork} />
      {investigated ? (
        <Investigation />
      ) : (
        <>
          {ownsYacht ? (
            <p>
              No need to schlep your art from city to city, Commodore. You can
              sell anywhere from your Yacht!
            </p>
          ) : (
            <>
              <p className="fs-12 text-center mt-10 mb-0">
                Move this artwork to a different city?
              </p>
              <DestinationSelect
                onValueChange={(e) => setDest(e.target.value as CityName)}
                dest={dest as CityName}
                cities={otherCities}
                to={`/game/portfolio/${artworkId}/${dest}`}
              />
            </>
          )}
        </>
      )}
      <Tour section="portfolioDetail" />
    </div>
  );
};

export default Detail;
