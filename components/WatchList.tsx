import * as WebBrowser from 'expo-web-browser';
import { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import useFetchDowJonesStocks from '../hooks/useFetchDowJonesStocks';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { StockContext } from '../navigation/Context';
import { RootTabScreenProps } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function WatchList(props) {
    const { user, setUser, ticker, setTicker } = useContext(StockContext);
    console.log('user', user)
    console.log('type', props)
    const navigation = useNavigation<RootTabScreenProps<'WatchList'>>();
    return (
      <View style={styles.getWatchList}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.type.replace(/([A-Z1-9])/g, " $1").charAt(0).toUpperCase() + props.type.replace(/([A-Z1-9])/g, " $1").slice(1)}</Text>
        </View>

        <View style={styles.getCardList}>
          {props.list.length > 0 ? props.list.map(stock => {
              return (
                  <View style={styles.getCard} key={stock}>
                    <TouchableOpacity
                        style={styles.getModalButton}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"
                        onPress={() => {
                          setTicker(stock);
                          navigation.navigate('Modal');
                        }}>
                        <View style={styles.getCardText}>
                            <Text
                                style={styles.getStockTicker}
                                lightColor="rgba(0,0,0,0.8)"
                                darkColor="rgba(255,255,255,0.8)">
                                {stock}
                            </Text>
                        </View>
                      </TouchableOpacity>
        
                      <TouchableOpacity
                          style={styles.getRemoveButton}
                          lightColor="rgba(0,0,0,0.8)"
                          darkColor="rgba(255,255,255,0.8)"
                          onPress={() => {
                            let watchList = props?.list;
                            watchList = watchList.filter((symbol) => {
                              if (stock == symbol) return false;
                              return true;
                            });
                            setUser({...user, [props.type]: watchList});
                          }}>
                          <Text style={styles.getRemoveButtonText} lightColor={Colors.light.tint}>
                              X
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
      </View>
    );

}

function handleRemoveFromWatchList(user, setUser, ticker:String) {
  let watchList = user?.watchList;
  watchList.slice(user?.watchList.indexOf(ticker), user?.watchList.indexOf(ticker)+1);
    setUser({...user, watchList: watchList});
}

const styles = StyleSheet.create({
  getWatchList: {
    flexDirection: 'column',
    width: '50%'
  },
  getNothing: {
    color: 'black',
    textAlign: 'center'
  },
  titleContainer: {
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  },
  getCardList: {
    marginHorizontal: 50
  },
  getCard: {
    textAlign: 'left',
    // marginHorizontal: 50,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  getCardText: {
    marginHorizontal: 10,
    marginVerical: 10
  },
  getCardTitle: {
    color: 'black',
    fontSize: 10
  },
  getStockName: {
    color: 'white',
    fontSize: 10,
  },
  getStockPrice: {
    color: 'white',
    fontSize: 10
  },
  getRemoveButton: {
    backgroundColor: 'red',
    // borderRadius: 3,
    paddingHorizontal: 6,
    height: '100%',
    justifyContent: 'center'
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
