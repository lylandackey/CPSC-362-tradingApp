import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, StyleSheet, Button, TouchableOpacity } from 'react-native';

import { StockContext } from '../navigation/Context';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
    //*Strategy*
    //The modal can read that context and use it
    const appContext = useContext(StockContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdvancedLoading, setIsAdvancedLoading] = useState(true);
    const [data, setData] = useState([]);
    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
      const loadResourcesAndDataAsync = async () => {
          try {
            if (appContext.ticker) {
              let headers = {
                "Access-Control-Allow-Origin": "*",
                "accepts":"application/json"
              }
              const responseYahoo = await fetch('http://localhost:5000/yahoo/' + appContext.ticker, {
                headers: headers
              });
              const jsonYahoo = await responseYahoo.json();

              const responseLocal50 = await fetch('http://localhost:5000/backtest/50DayMovingAverage/' + appContext.ticker);
              const jsonLocal50 = await responseLocal50.json();

              const responseLocal200 = await fetch('http://localhost:5000/backtest/200DayMovingAverage/' + appContext.ticker);
              const jsonLocal200 = await responseLocal200.json();
            
              setData({  
                ...jsonLocal50 , 
                ...jsonLocal200, 
                ...jsonYahoo.quoteResponse.result[0]
              });
              setIsLoading(false);
              setIsAdvancedLoading(false);
            }
          }
          catch (error) {
              console.error(error);
          }
      }
      loadResourcesAndDataAsync();

    }, [isLoading, isAdvancedLoading])

    try {
      // try something exceptional here
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Stock Details</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <Text style={styles.title}> Ticker: {appContext.ticker}</Text>
          <View style={styles.basicStatContainer}>
            <View>
              <Text style={styles.title}>  Open: {data.regularMarketOpen}</Text>
              <Text style={styles.title}> Close: {data.regularMarketPreviousClose}</Text>
              <Text style={styles.title}> High: {data.regularMarketDayHigh}</Text>
              <Text style={styles.title}> Low: {data.regularMarketDayLow}</Text> 
            </View>
            <View>
              <Text style={styles.title}> Volume: {data.regularMarketVolume}</Text>
              <Text style={styles.title}> PE ratio: {data.trailingPE}</Text>
              <Text style={styles.title}> EPS: {data.epsTrailingTwelveMonths}</Text>
            </View>
          </View>

          <View style={styles.stratagyContainer}>
            <Text style={styles.title}> Buy/Sell Stratagies </Text>
            <Text style={styles.title}> 200-day moving average strategy </Text>

            {data.analysis200DayMovingAverage ?
              <>
              <View style={styles.analystContainer}>
                <Text>Annualized  return: {data?.analysis200DayMovingAverage.profit/data?.analysis200DayMovingAverage.startingCapital * 100}%</Text>
                <Text>% profitability: {data?.analysis200DayMovingAverage.percentProfitable.toFixed(2)}%</Text>
                <Text>Win/Loss ratio: {data?.analysis200DayMovingAverage.profitFactor}</Text>
                <Text>Average Profit per Trade: {data?.analysis200DayMovingAverage.averageProfitPerTrade}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.buyButton}
                    onPress={() => {
                      let watchList = appContext.user?.watchList200Day;
                      if (watchList.indexOf(appContext.ticker) == -1) {
                        watchList.push(appContext.ticker);
                        appContext.setUser({...appContext.user, watchList200Day: watchList});
                      }
                    }}> 
                    <Text>Add to watchlist</Text>  
                </TouchableOpacity>
              </View>
              </>
            : 

            <ActivityIndicator size="large" color="#00ff00" />
            }

            <Text style={styles.title}> 50-day moving average strategy </Text>
            
            {data.analysis50DayMovingAverage ?
              <>
              <View style={styles.analystContainer}>
                <Text>Annualized  return: {data?.analysis50DayMovingAverage.profit/data?.analysis50DayMovingAverage.startingCapital * 100}%</Text>
                <Text>% profitability: {data?.analysis50DayMovingAverage.percentProfitable.toFixed(2)}%</Text>
                <Text>Win/Loss ratio: {data?.analysis50DayMovingAverage.profitFactor}</Text>
                <Text>Average Profit per Trade: {data?.analysis50DayMovingAverage.averageProfitPerTrade}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.buyButton}
                    onPress={() => {
                      let watchList = appContext.user?.watchList50Day;
                      if (watchList.indexOf(appContext.ticker) == -1) {
                        watchList.push(appContext.ticker);
                        appContext.setUser({...appContext.user, watchList50Day: watchList});
                      }
                    }}> 
                    <Text>Add to watchlist</Text>  
                </TouchableOpacity>
              </View>
              </>
              : 
              <ActivityIndicator size="large" color="#00ff00" />
            }

          </View>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
      )
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
  
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Modal</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <ActivityIndicator size="large" color="#00ff00" />
    
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
      )
    };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stratagyContainer: {
    backgroundColor: 'lightgray',
    padding: 20,
    paddingVertical: 30,
    marginTop: 10,
    borderRadius: 10,
    width: '70%'
  },
  analystContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    width: '70%'
  },
  basicStatContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
    marginVertical: 10,
    textAlign: 'left'
  },
  buttonContainer: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    marginBottom: 30
  },
  buyButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  sellButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  analystTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
    width: '70%'
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
