import { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button, TouchableOpacity } from 'react-native';

import { StockContext } from '../navigation/Context';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
    const appContext = useContext(StockContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdvancedLoading, setIsAdvancedLoading] = useState(true);
    const [data, setData] = useState([]);
    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
      const loadResourcesAndDataAsync = async () => {
          try {
            if (appContext.ticker) {
              // const responsePrice = await fetch('https://financialmodelingprep.com/api/v3/historical-price-full/' + appContext.ticker + '?apikey=7aadf56a06dc47a397e3645e01931d99')
              // const jsonPrice = await responsePrice.json();
              // const PriceTargetUrl = "https://finnhub.io/api/v1/stock/recommendation?symbol=" + appContext.ticker + "&token=cb9mdj2ad3i97kdr02o0";
              // const responsePriceTarget = await fetch(PriceTargetUrl, {
              //   headers: {
              //     'Accept': 'application/json',  // It can be used to overcome cors errors
              //     'Content-Type': 'application/json; charset=utf-8'
              //   },
              // })
              // const jsonPriceTarget = await responsePriceTarget.json();
              // const responseMetrics = await fetch('https://financialmodelingprep.com/api/v3/key-metrics-ttm/' + appContext.ticker + '?limit=40&apikey=7aadf56a06dc47a397e3645e01931d99')
              // const jsonMetrics = await responseMetrics.json();
              const responseYahoo = await fetch('https://query1.finance.yahoo.com/v6/finance/quote?symbols=' + appContext.ticker);
              const jsonYahoo = await responseYahoo.json();
              
              // setData({ ...jsonPrice.historical[0], recommendations: jsonPriceTarget, ...jsonMetrics[0] });
              setData({ ...jsonYahoo.quoteResponse.result[0]});
              setIsLoading(false);

              const responseLocal50 = await fetch('https://localhost:5000/backtest/50DayMovingAverage/' + appContext.ticker);
              const jsonLocal50 = await responseLocal50.json();

              const responseLocal200 = await fetch('https://localhost:5000/backtest/200DayMovingAverage/' + appContext.ticker);
              const jsonLocal200 = await responseLocal200.json();
              
              // setData({ ...jsonPrice.historical[0], recommendations: jsonPriceTarget, ...jsonMetrics[0] });
              setData({ ...jsonLocal50 , ...jsonLocal200 });
              setIsAdvancedLoading(false);
              console.log('jsonLocal50', jsonLocal50);
              console.log('jsonLocal200', jsonLocal200);
              console.log(data)
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
          {/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}
    
          {/* <Button
            title="*Add To Watchlist*"
            style={styles.title}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            onPress={() => {
              let watchList = appContext.user?.watchList;
              if (watchList.indexOf(appContext.ticker) == -1) {
                watchList.push(appContext.ticker);
                appContext.setUser({...appContext.user, watchList: watchList});
              }
            }}>
            
          </Button> */}
          <Text style={styles.title}> Ticker: {appContext.ticker}</Text>
          <Text style={styles.title}>  Open: {data.regularMarketOpen}</Text>
          <Text style={styles.title}> Close: {data.regularMarketPreviousClose}</Text>
          <Text style={styles.title}> High: {data.regularMarketDayHigh}</Text>
          <Text style={styles.title}> Low: {data.regularMarketDayLow}</Text> 
          <Text style={styles.title}> Volume: {data.regularMarketVolume}</Text>
          <Text style={styles.title}> PE ratio: {data.trailingPE}</Text>
          <Text style={styles.title}> EPS: {data.epsTrailingTwelveMonths}</Text>
          {/* <Text style={styles.title}>  Open: {data.open}</Text>
          <Text style={styles.title}> Close: {data.close}</Text>
          <Text style={styles.title}> High: {data.high}</Text>
          <Text style={styles.title}> Low {data.low}</Text> */}
          
          {/* <Text style={styles.title}> Volume {data.volume}</Text> */}
          {/* <Text style={styles.title}> PE ratio: {data.peRatioTTM}</Text>
          <Text style={styles.title}> EPS: {data.netIncomePerShareTTM}</Text> */}
          {/* <Text style={styles.analystTitle}> Analyst's recommendations as of : {data?.recommendations[0].period}</Text>
          <View style={styles.analystContainer}>
            <Text style={styles.title}> Strong Buy: {data?.recommendations[0].strongBuy}</Text>
            <Text style={styles.title}> Buy: {data?.recommendations[0].buy}</Text>
            <Text style={styles.title}> Hold: {data?.recommendations[0].hold}</Text>
            <Text style={styles.title}> Sell: {data?.recommendations[0].sell}</Text>
            <Text style={styles.title}> Strong Sell: {data?.recommendations[0].strongSell}</Text>
          </View> */}
          <View style={styles.stratagyContainer}>
            <Text style={styles.title}> Buy/Sell Stratagies </Text>
            <Text style={styles.title}> 200-day moving average strategy </Text>

            <View style={styles.stratagyContainer}>
              <Text>Annualized  return: {data.analysis200DayMovingAverage.profit/data.analysis200DayMovingAverage.startingCapital * 100}%</Text>
              <Text>% profitability: {data.analysis200DayMovingAverage.percentProfitable.toFixed(2)}%</Text>
              <Text>Win/Loss ratio: {data.analysis200DayMovingAverage.profitFactor}</Text>
              <Text>Average Profit per Trade: {data.analysis200DayMovingAverage.averageProfitPerTrade}</Text>
            </View>
            
            <TouchableOpacity 
                style={styles.buyButton}
                onPress={() => {
                  console.log('appContext.user,', appContext.user)
                  let watchList = appContext.user?.watchList200Day;
                  if (watchList.indexOf(appContext.ticker) == -1) {
                    watchList.push(appContext.ticker);
                    appContext.setUser({...appContext.user, watchList200Day: watchList});
                  }
                }}> 
                <Text>Add to watchlist</Text>  
            </TouchableOpacity>

            {/* <Text style={styles.title}> 200-day moving average strategy </Text>
            {data.twoHundredDayAverageChange < 0 ? (
                <View style={styles.stratagyItemContainer}>
                  <TouchableOpacity style={styles.sellButton}>
                    <Text>Spinner</Text>   
                  </TouchableOpacity>
                </View>
            ) : (
              <TouchableOpacity style={styles.sellButton}>
                <Text>Spinner</Text>   
              </TouchableOpacity>
            ) }
            <View style={styles.stratagyContainer}>

            </View>
            {data.twoHundredDayAverageChange < 0 ? (
              <TouchableOpacity 
                style={styles.buyButton}
                onPress={() => {
                  console.log('appContext.user,', appContext.user)
                  let watchList = appContext.user?.watchList200Day;
                  if (watchList.indexOf(appContext.ticker) == -1) {
                    watchList.push(appContext.ticker);
                    appContext.setUser({...appContext.user, watchList200Day: watchList});
                  }
                }}> 
                <Text>Use this strategy</Text>  
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.sellButton}>
                <Text>Sell</Text>   
              </TouchableOpacity>
            ) }
            
            <Text style={styles.title}> mean reversion strategy </Text> */}
            
            <Text style={styles.title}> 50-day moving average strategy </Text>
            
            <View style={styles.stratagyContainer}>
              <Text>Annualized  return: {data.analysis50DayMovingAverage.profit/data.analysis50DayMovingAverage.startingCapital * 100}%</Text>
              <Text>% profitability: {data.analysis50DayMovingAverage.percentProfitable.toFixed(2)}%</Text>
              <Text>Win/Loss ratio: {data.analysis50DayMovingAverage.profitFactor}</Text>
              <Text>Average Profit per Trade: {data.analysis50DayMovingAverage.averageProfitPerTrade}</Text>
            </View>

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
          <EditScreenInfo path="/screens/ModalScreen.tsx" />
    
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
    backgroundColor: 'gray',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '70%'
  },
  analystContainer: {
    backgroundColor: 'gray',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    width: '70%'
  },
  buyButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20
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
