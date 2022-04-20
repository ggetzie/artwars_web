import React from "react";

import {useAppSelector} from "../../../hooks";
import {filterArtWorks, selectCity, selectPlayer} from "../../../reducers/game";
import {ArtWorkFilter} from "../../../util/awFilter";
import {Cities} from "../../../util";
import {ArtByCityItem, Artwork} from "../../../util/types";
import {ArtList, ScreenHeader} from "../../../components";
import {portfolioValue} from "../../../reducers/game";

const List = () => {
  const game = useAppSelector((state) => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const ownedFilter = new ArtWorkFilter({owner: (o) => o === player});

  const otherCities = Object.values(Cities)
    .filter((c) => c !== city)
    .sort();
  const citiesSorted = [city].concat(otherCities);

  const ownedArt: Artwork[] = filterArtWorks(game, ownedFilter);
  const artByCity: ArtByCityItem[] = citiesSorted.map((c) => ({
    title: c,
    data: [],
  }));
  for (const aw of ownedArt) {
    const index = citiesSorted.indexOf(aw.data.city);
    artByCity[index].data.push(aw);
  }

  const totalValue = portfolioValue(game);

  return (
    <div className="tab-container">
      <ScreenHeader
        showBack={false}
        title={`Your Portfolio - $${totalValue.toLocaleString()}`}
      />
      {artByCity.map((v, i) => (
        <ArtList
          artworks={v.data}
          title={v.title}
          key={i}
          urlBase="/game/portfolio"
          linkTitleBase="Click to view detail"
          emptyMessage="No artworks in this city"
          divClass="art-list mb-6"
          headerClass={`m-0 text-upper ${i % 2 === 0 ? "aw-red" : "aw-blue"}`}
          ulClass="bare-list"
          emptyClass="mt-2 mb-0"
        />
      ))}
    </div>
  );
};

export default List;
