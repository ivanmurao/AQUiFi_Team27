import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import backIcon from "../assets/Back.png";


const AboutUsScreen = () => {
  const navigation = useNavigation();
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack} style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>The Team</Text>
        </View>
      </View>

      <View style={styles.fillOut}>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
  frame: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  accent: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "70%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#255C99",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  backIconContainer: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    top: 80,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "15%",
    bottom: "5%",
    left: "5%",
    right: "5%",
    elevation: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 40,
  },
});

export default AboutUsScreen;
