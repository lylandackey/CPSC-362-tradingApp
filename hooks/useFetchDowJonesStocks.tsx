import { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Button, Alert } from 'react-native';

import { StockContext } from '../navigation/Context';
import { RootTabScreenProps } from '../types';
import DOWJSON from '../DOW.json';
import { useNavigation } from '@react-navigation/native';

export default function useFetchDowJonesStocks( ) {
  const { ticker, setTicker } = useContext(StockContext);
    const [isLoading, setLoading] = useState(false);
    const navigation = useNavigation<RootTabScreenProps<'TabOne'>>();

  return (
    <View style={{ flex: 1, padding: 12 }}>
      {isLoading ? <ActivityIndicator/> : (

        
        <FlatList
          data={DOWJSON}
          style={styles.getCardFlatList}
          keyExtractor={({ symbol }, index) => symbol}
          renderItem={({ item }) => (
            
            <View key="{item.symbol}" style={styles.getCardListContainer}>
              <View style={styles.getCardList}>
                <View style={styles.getCard}>
        
                  <View style={styles.getCardText}>
                    <Text
                      style={styles.getStockTicker}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {item.symbol}
                    </Text>
                    <Text
                      style={styles.getStockName}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {item.name} 
                    </Text>
                  </View>
                  <Button
                    title=">"
                    style={styles.getStockPrice}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"
                    onPress={() => {
                      setTicker(item.symbol);
                      navigation.navigate('Modal');
                    }}>
                    
                  </Button>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );;
}

const styles = StyleSheet.create({
  getCardFlatList: {
    width: "100%"
  },
  getCardListContainer: {
    width: "100%"
  },
  getCardList: {
    backgroundColor: 'white'
  },
  getCard: {
    marginHorizontal: 4,
    borderColor: 'navy',
    borderWidth: 2,
    marginVertical: 5,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  getCardText: {
    alignItems: 'flex-start',
    padding: 3
  },
  getCardTitle: {
    color: 'black',
    fontSize: 10,
    width: 100
  },
  getStockName: {
    color: 'black',
    fontSize: 10
  },
  getStockPrice: {
    color: 'black',
    fontSize: 20,
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
});
