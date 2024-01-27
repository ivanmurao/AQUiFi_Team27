import React, { useState, useRef } from 'react'; 
import { View, Text, StyleSheet, Image, Pressable, Animated,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import turbidity from '../assets/turbidity.png';
import ph from '../assets/ph.png';
import next from '../assets/next.png';

const MonitorScreen = () => {
  const navigation = useNavigation();

    const goToTurbidity = () => {
      navigation.navigate('TurbidityScreen');
    };
    const goTopH = () => {
      navigation.navigate('PHScreen');
    };
  const [selectedValveControl, setSelectedValveControl] = useState(null);
  const translateX = useRef(new Animated.Value(0)).current;

  const toggleValve = () => {
    const newValue =
      selectedValveControl === 'Close Valve' ? 'Open Valve' : 'Close Valve';
    setSelectedValveControl(newValue);
    Animated.timing(translateX, {
      toValue: newValue === 'Open Valve' ? 30 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.fillOut}>
        {/* Top container for parameter selection */}
        <View style={styles.topContainer}>
          <Text style={styles.description}>Select a parameter you want to monitor</Text>
          {/* Turbidity Button */}
          <TouchableOpacity style={styles.button} onPress={goToTurbidity}>
            <Image source={turbidity} style={styles.icon} />
            <Text style={styles.buttonText}>Turbidity</Text>
            <Image source={next} style={styles.icon2} />
          </TouchableOpacity>
          {/* pH Button */}
          <TouchableOpacity style={styles.button} onPress={goTopH}>
            <Image source={ph} style={styles.icon} />
            <Text style={styles.buttonText}>pH</Text>
            <Image source={next} style={styles.icon3} />
          </TouchableOpacity>
        </View>

        {/* Bottom container for solenoid valve control */}
        <View style={styles.bottomContainer}>
          <Text style={styles.switchDescription}>Control Solenoid Valve</Text>
          <View style={styles.switchContainer}>
            <Pressable style={styles.switchButton} onPress={toggleValve}>
              <Animated.View
                style={[
                  styles.switchKnob,
                  {
                    transform: [
                      {
                        translateX: translateX.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, 50],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
              />
            </Pressable>
          </View>
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0B3954', 
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  fillOut: {
    flex: 1,
    position: 'absolute', 
    top: '5%', 
    bottom: '3%',
    left: '7%',
    right: '7%',
    paddingHorizontal: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 30,
  },
  description: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#85A0AF',
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    borderColor: 'black',
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  icon2: {
    width: 30,
    height: 30,
    marginLeft: 65,
  },
  icon3: {
    width: 30,
    height: 30,
    marginLeft: 120,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10, 
    marginRight: 10,
  },



  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#85A0AF',
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 100,
    paddingRight: 100,
  },
  switchDescription: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  switchButton: {
    width: 100,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 7,
  },
  switchKnob: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#0B3954',
  },

});

export default MonitorScreen;
