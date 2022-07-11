import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Button } from 'react-native';

export default function useFetchDowJonesStocks() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // const [ctx, TextProvider] = createCtx("someText");
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
        try {
            // const response = await fetch(`https://financialmodelingprep.com/api/v3/dowjones_constituent?apikey=7aadf56a06dc47a397e3645e01931d99`)
            // const json = await response.json();
            // setData(json);
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    loadResourcesAndDataAsync();
  }, []);


  return (
    <View style={{ flex: 1, padding: 12 }}>
      {isLoading ? <ActivityIndicator/> : (

        
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            
            <View>
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
        
                    <Text
                      style={styles.getStockPrice}
                      lightColor="rgba(0,0,0,0.8)"
                      darkColor="rgba(255,255,255,0.8)">
                      {item.sector}
                    </Text>
                  </View>
                  <Button
                  title=">"
                    style={styles.getStockPrice}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    
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
  getCardList: {
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  getCard: {
    marginHorizontal: 10,
    borderColor: 'black',
    borderWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  getCardText: {
    alignItems: 'flex-start'
  },
  getCardTitle: {
    color: 'black',
    fontSize: 10,
  },
  getStockName: {
    color: 'black',
    fontSize: 10
  },
  getStockPrice: {
    color: 'black',
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
});
