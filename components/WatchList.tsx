import * as WebBrowser from 'expo-web-browser';
import { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import useFetchDowJonesStocks from '../hooks/useFetchDowJonesStocks';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { StockContext } from '../navigation/Context';

export default function WatchList() {
    const { user, setUser } = useContext(StockContext);
    console.log('user', user)
    return (
      <View style={styles.getCardList}>
        {user?.watchList.length > 0 ? user?.watchList.map(stock => {
            return (
                <View style={styles.getCard} key={stock}>
                    <View>
                        <Text
                            style={styles.getStockTicker}
                            lightColor="rgba(0,0,0,0.8)"
                            darkColor="rgba(255,255,255,0.8)">
                            {stock}
                        </Text>
                        <Text
                            style={styles.getStockName}
                            lightColor="rgba(0,0,0,0.8)"
                            darkColor="rgba(255,255,255,0.8)">
                            Tesla 
                        </Text>
                    </View>
      
                    <Text
                        style={styles.getStockPrice}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)">
                        $750.00
                    </Text>
                    <TouchableOpacity
                        style={styles.getRemoveButton}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"
                        onPress={() => {
                          let watchList = user?.watchList;
                          watchList = watchList.filter((symbol) => {
                            if (stock == symbol) return false;
                            return true;
                          });
                          setUser({...user, watchList: watchList});
                        }}>
                        <Text style={styles.getRemoveButtonText} lightColor={Colors.light.tint}>
                            Remove from watch list
                        </Text>
                    </TouchableOpacity>
                    
              </View>
            )
        }) : (
          <Text
              style={styles.getNothing}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
              Nothing on Your WatchList
          </Text>
        )}
      </View>
    );

}

function handleRemoveFromWatchList(user, setUser, ticker:String) {
  let watchList = user?.watchList;
  watchList.slice(user?.watchList.indexOf(ticker), user?.watchList.indexOf(ticker)+1);
    setUser({...user, watchList: watchList});
}

const styles = StyleSheet.create({
  getNothing: {
    color: 'white'
  },
  getCardList: {
    marginHorizontal: 50
  },
  getCard: {
    marginHorizontal: 50,
    borderColor: 'black',
    borderWidth: 5,
    backgroundColor: 'white'
  },
  getCardTitle: {
    color: 'black',
    fontSize: 10
  },
  getStockName: {
    color: 'white',
    fontSize: 10
  },
  getStockPrice: {
    color: 'white',
    fontSize: 10
  },
  getRemoveButton: {
    backgroundColor: 'red',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getRemoveButtonText: {
    color: 'white',
    fontSize: 10,
  },
  getStockTicker: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
