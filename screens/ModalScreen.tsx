import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import AppCtx from '../navigation/index';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
    const appContext = useContext(AppCtx);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
      const loadResourcesAndDataAsync = async () => {
          try {
            
              // const responsePrice = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/1min/{stockSymbol}?apikey=7aadf56a06dc47a397e3645e01931d99`)
              // const jsonPrice = await responsePrice.json();
              // const responsePriceTarget = await fetch(`https://financialmodelingprep.com/api/v4/price-target-consensus?symbol={stockSymbol}&apikey=7aadf56a06dc47a397e3645e01931d99`)
              // const jsonPriceTarget = await responsePriceTarget.json();
              // const responseMetrics = await fetch(`https://financialmodelingprep.com/api/v3/key-metrics-ttm/{stockSymbol}?limit=40&apikey=7aadf56a06dc47a397e3645e01931d99`)
              // const jsonMetrics = await responseMetrics.json();
              
              // setData({...jsonPrice[0], ...jsonPriceTarget[0], ...jsonMetrics[0] });
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
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
