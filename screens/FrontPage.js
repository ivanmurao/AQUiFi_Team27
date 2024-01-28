import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Updates from 'expo-updates';
import AquiFi from '../assets/pd-logo-1.png';

const FrontPage = ({ navigation }) => {
  const goToLandingPage = () => {
    navigation.navigate('TabNavigator');
  };

  const goToExit = async () => {
    await Updates.reloadAsync(); 
  };
  

  return (
    <View style={styles.container}>
      <Image source={AquiFi} style={styles.logo} />
      <TouchableOpacity
        style={styles.proceedbutton}
        onPress={goToLandingPage} 
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          style={styles.exitbutton}
          onPress={goToExit} 
      >
        <Text style={styles.buttonText}>Exit</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 245,
  },
  proceedbutton: {
    backgroundColor: '#0B3954',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 50, 
    marginTop: 50,
    marginBottom: 10,
  },
  exitbutton: {
    backgroundColor: '#0B3954',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 50, 
    margin: 10,
  },  
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FrontPage;