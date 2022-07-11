import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';

import useFetchDowJonesStocks from '../hooks/useFetchDowJonesStocks';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function StockCardList({ path }: { path: string }) {
  
  // const isLoadingComplete = useFetchDowJonesStocks();
  return useFetchDowJonesStocks();
  // if (!isLoadingComplete) {
  //   return null;
  // } else {
    // return (
      // <View>
      //   <View style={styles.getCardList}>
      //     <View style={styles.getCard}>
  
      //       <View>
      //         <Text
      //           style={styles.getStockTicker}
      //           lightColor="rgba(0,0,0,0.8)"
      //           darkColor="rgba(255,255,255,0.8)">
      //           TSLA
      //         </Text>
      //         <Text
      //           style={styles.getStockName}
      //           lightColor="rgba(0,0,0,0.8)"
      //           darkColor="rgba(255,255,255,0.8)">
      //           Tesla 
      //         </Text>
      //       </View>
  
      //       <Text
      //         style={styles.getStockPrice}
      //         lightColor="rgba(0,0,0,0.8)"
      //         darkColor="rgba(255,255,255,0.8)">
      //         $750.00
      //       </Text>
      //     </View>
      //   </View>
      // </View>
    // );
  // }

}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  getCardList: {
    marginHorizontal: 50,
    backgroundColor: 'white'
  },
  getCard: {
    marginHorizontal: 50,
    borderColor: 'black',
    borderWidth: 5
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
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
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
