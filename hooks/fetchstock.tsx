import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function useFetchStock(stocks:string[]) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    var stockquery = '';
    stocks.forEach(stock => {
      stockquery = stockquery + ',' + stock;
    });
    

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
        try {
            const response = await fetch(`https://api.worldtradingdata.com/api/v1/stock?symbol=${stockquery}&api_token=UzV3PJAFNejLh0lKz5hM6u14VXljJ5vZ5QCedmb57pFOd2dElnOesMyXoF33`)
            const json = await response.json();
            setData(json.movies);
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
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.title}, {item.releaseYear}</Text>
          )}
        />
      )}
    </View>
  );;
}
