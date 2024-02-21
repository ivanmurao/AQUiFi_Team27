import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import backIcon from "../assets/Back.png";
import ContainerBG from "../assets/ContainerBG.png";
import policy from "../assets/policy.png";

const DataPrivacyScreen = () => {
  const navigation = useNavigation();
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
      <ImageBackground source={ContainerBG} style={styles.containerBG} />
        <View style={styles.accent}>
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack} style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Data Privacy Policy</Text>
        </View>
      </View>

      <ScrollView style={styles.fillOut}>
        <Image source={policy} style={styles.policyLogo} />
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
  containerBG: {
    flex: 1,
    height: 870,
    width: 420,
  },
  frame: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
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
    bottom: "2%",
    left: "5%",
    right: "5%",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 30,
  },
  policyLogo: {
    alignSelf: 'center',
    height: 250,
    width: 170,
    resizeMode: "contain",
  },
});

export default DataPrivacyScreen;
