import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {
  currentHot,
  getArtwork,
  isUnderInvestigation,
  ownsPowerUp,
} from '../../../reducers/game';
import {useLinkTo} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';
import {Cities, NPCImages} from '../../../util';
import {CityName} from '../../../util/types';
import {Dropdown} from '../../../components';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Detail'>;

const Investigation = () => {
  return (
    <>
      <Image style={InvestigationStyle.image} source={NPCImages.irsAgent} />
      <Text>The IRS is investigating your nefarious dealings!</Text>
      <Text>You can't move art between cities until you're cleared.</Text>
    </>
  );
};

const InvestigationStyle = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
  },
});

const Detail = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const linkTo = useLinkTo();
  const {artworkId} = route.params;
  const artwork = getArtwork(game, artworkId);
  const hot = currentHot(game);
  const investigated = isUnderInvestigation(game);
  const value = Math.round(artwork.data.currentValue).toLocaleString();
  const ownsYacht = ownsPowerUp(game, 'Yacht');

  useEffect(() => {
    navigation.setOptions({title: artwork.static.title});
  }, [artwork, navigation]);
  const otherCities = Object.values(Cities).filter(
    c => c !== artwork.data.city,
  ) as CityName[];
  const [dest, setDest] = useState<CityName>(otherCities[0]);

  return (
    <View style={BaseStyle.container}>
      <Text>Artist: {artwork.static.artist}</Text>
      <Text>Value: ${value}</Text>
      <Text>
        Category:{' '}
        <Text style={hot === artwork.static.category ? BaseStyle.hot : {}}>
          {artwork.static.category}
        </Text>
      </Text>
      {investigated ? (
        <Investigation />
      ) : (
        <>
          <Dropdown
            selectedValue={dest}
            onValueChange={(itemValue: CityName, _: number) => {
              setDest(itemValue);
            }}
            itemList={otherCities.map(c => [c, c])}
            label="Move to City"
          />
          <Button
            title="Move"
            onPress={() => linkTo(`/game/portfolio/${artworkId}/${dest}/`)}
            disabled={ownsYacht}
          />
          {ownsYacht && (
            <Text>
              No need to schlep your art from city to city, Commodore. You can
              sell anywhere from your Yacht!
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Detail;
