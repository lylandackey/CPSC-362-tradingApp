import { StyleSheet } from 'react-native';

import useFetchDowJonesStocks from '../hooks/useFetchDowJonesStocks';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    //**Decorator**
    //View is the main interface with already predefined/default style properties
    //the style property points to an object that adjust the default styles
    <View style={styles.container}>
      <Text style={styles.title}>Dow Jones Index</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      { useFetchDowJonesStocks()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
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
