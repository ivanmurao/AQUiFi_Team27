import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import AquiFi from "@assets/images/logos/aquifi-tagline-dark.png";
import Status from "@components/StatusBar";

const LandingPage = ({ navigation }) => {
  const [blinkVisible, setBlinkVisible] = useState(0.3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlinkVisible((prevOpacity) => (prevOpacity === 0 ? 0.3 : 0));
    }, 700);

    return () => clearInterval(intervalId);
  }, []);

  const goToLandingPage = () => {
    navigation.navigate("DrawerNavigator");
  };

  return (
    <View style={styles.container} onTouchEnd={goToLandingPage}>
      <Status />
      <Image source={AquiFi} style={styles.logo} />
      <TouchableOpacity style={styles.proceedButton}>
        <Text style={[styles.buttonText, { opacity: blinkVisible }]}>
          Press anywhere to continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 260,
  },
  proceedButton: {
    marginTop: 50,
    marginBottom: 10,
  },
  buttonText: {
    color: "#0B3954",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingPage;
