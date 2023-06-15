


import React from 'react';
import { View, TouchableOpacity, Text,StyleSheet,Button,ImageBackground} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HistoryScreen from './screens/HistoryScreen';
import ScienceScreen from './screens/ScienceScreen';
import { NavigationContainer } from '@react-navigation/native';
import ComputerScreen from './screens/ComputerScreen';
import MythodologyScreen from './screens/MythodologyScreen';
import SportsScreen from './screens/Sports';
import Mathematics from './screens/Mathematics';
import PoliticsScreen from './screens/PoliticsScreen';




const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
  const handleHistoryPress = () => {
    navigation.navigate('History');
  };


  const handleSciencePress = () => {
    navigation.navigate('Science');
  };
  const handleComputerPress = () => {
    navigation.navigate('Computer');
  };
  const handleMythodologyPress = () => {
    navigation.navigate('Mythodology');
  };
  const handleSportsPress = () => {
    navigation.navigate('Sports');
  };
  const handleMathematicsPress = () => {
    navigation.navigate('Mathematics');
  };
  const handlePoliticsPress = () => {
    navigation.navigate('Politics');
  };




  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
    
      <Text style={{ fontWeight: 'bold',textAlign:'center',marginTop:50,fontSize:40,color:'white'}}>QuizWhiz</Text>
      <View style={styles.overlay} />
      <TouchableOpacity onPress={handleHistoryPress}>
        <Text style ={styles.button}>Go to History Quiz</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={handleSciencePress}>
        <Text style ={styles.button}>Go to Science Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleComputerPress}>
        <Text style ={styles.button}>Go to Computer Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMythodologyPress}>
        <Text style ={styles.button}>Go to Mythodology Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSportsPress}>
        <Text style ={styles.button}>Go to Sports Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMathematicsPress}>
        <Text style ={styles.button}>Go to Mathematics Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePoliticsPress}>
        <Text style ={styles.button}>Go to Politics Quiz</Text>
      </TouchableOpacity>
    
    </View>
  );
};


const App = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ header: () => null }} />
      <Drawer.Screen name="Science" component={ScienceScreen} options={{ header: () => null }} />
      <Drawer.Screen name="Computer" component={ComputerScreen} options={{ header: () => null }} />
      <Drawer.Screen name="Mythodology" component={MythodologyScreen} options={{ header: () => null }} />
      <Drawer.Screen name="Sports" component={SportsScreen} options={{ header: () => null }} />
      <Drawer.Screen name="Mathematics" component={Mathematics} options={{ header: () => null }} />
      <Drawer.Screen name="Politics" component={PoliticsScreen} options={{ header: () => null }} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    fontSize:20,
    fontWeight: 'bold',
    color: 'grey',
    marginVertical: 40,
    textAlign:'center',
    marginBottom:60,
    marginTop:40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  
});

export default App;
