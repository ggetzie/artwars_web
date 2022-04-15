import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {bidIncrement, otherBidders, initialAsking} from '../../../util';
import {ArtworkData, Transaction} from '../../../util/types';
import {AuctionStackParamList} from '.';
import {ArtItem} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentHot,
  selectBalance,
  selectPlayer,
  transact,
  updateArtwork,
  getArtwork,
} from '../../../reducers/game';

import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<AuctionStackParamList, 'Buy'>;

const Buy = ({navigation, route}: Props) => {
  // Auction Logic: Once a player has placed a bid they cannot leave the detail
  // screen unless they win the auction or quit (lose). If they quit with
  // another bid being the current highest bid, the artwork will be sold for the
  // last bid to the anon buyer and removed from auction.
  // If the player keeps placing bids until all other buyers refuse, they win the auction
  // and the artwork is sold to them for the last bid.
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const balance = selectBalance(game);
  const hot = currentHot(game);
  const player = selectPlayer(game);
  const artworkId = route.params.artworkId;
  const artwork = getArtwork(game, artworkId);

  const [bidStarted, setBidStarted] = useState(false);
  const [asking, setAsking] = useState(
    initialAsking(artwork.data.currentValue, artwork.static.category === hot),
  );
  const [lastBid, setLastBid] = useState(0);
  const [canBid, setCanBid] = useState(asking < balance);
  const [message, setMessage] = useState(
    canBid ? '' : "You don't have enough money to bid",
  );

  function loseAuction() {
    const updated: ArtworkData = {
      ...artwork.data,
      auction: false,
      currentValue: lastBid,
      owner: 'anon',
    };
    dispatch(updateArtwork(updated));
    setBidStarted(false);
  }
  useEffect(() => {
    navigation.setOptions({headerBackVisible: !bidStarted});
    const parent = navigation.getParent();
    parent?.setOptions({tabBarStyle: {display: bidStarted ? 'none' : 'flex'}});
  }, [bidStarted, navigation]);

  return (
    <View style={BaseStyle.container}>
      <ArtItem artwork={artwork} />
      <Text>Last Bid: ${lastBid.toLocaleString()}</Text>
      <Text>Asking: ${asking.toLocaleString()}</Text>
      <View style={BaseStyle.buttonRow}>
        {bidStarted && (
          <Button
            title="Give Up"
            color="grey"
            onPress={() => {
              setMessage('Too rich for your blood, eh?');
              loseAuction();
              setCanBid(false);
              setBidStarted(false);
            }}
          />
        )}
        {canBid && (
          <Button
            title="Place Bid"
            disabled={!canBid}
            onPress={() => {
              setBidStarted(true);
              setLastBid(asking);
              const newAsking = asking + bidIncrement(asking);
              const otherBid = otherBidders(
                artwork.data.currentValue,
                newAsking,
                hot === artwork.static.category,
              );
              if (otherBid) {
                setLastBid(newAsking);
                setAsking(newAsking + bidIncrement(newAsking));
                setMessage(
                  `Another buyer bid $${newAsking.toLocaleString()}! Bid again?`,
                );

                if (asking > balance) {
                  setMessage('Another buyer bid more money than you have!');
                  loseAuction();
                  setCanBid(false);
                  setBidStarted(false);
                }
              } else {
                setMessage(
                  `You won the auction! Now you own ${artwork.static.title}`,
                );
                const t: Transaction = {
                  id: artwork.data.id,
                  price: -1 * asking,
                  newOwner: player,
                };
                dispatch(transact(t));
                setBidStarted(false);
                setCanBid(false);
              }
            }}
          />
        )}
      </View>
      {message.length > 0 && <Text>{message}</Text>}
    </View>
  );
};

export default Buy;
