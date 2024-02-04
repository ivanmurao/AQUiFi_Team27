import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LineGraph from "../components/LineGraph";
import data from "../services/firebase/readData";
import backIcon from "../assets/Back.png";
import forecastedData from "../services/firebase/readForecastedData";

const TurbidityScreen = () => {
  const navigation = useNavigation();
  const turbidityData = data("Turbidity_Level/Turbidity_Level_Values");
  const forecastedTurbidityData = forecastedData(
    "Turbidity_Level/Turbidity_Level_Values"
  );

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
          <Text style={styles.title}>Turbidity</Text>
        </View>
      </View>

      <View style={styles.fillOut}>
        <LineGraph
          data={turbidityData}
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          domain={[0, 6]}
        />
        <LineGraph
          data={forecastedTurbidityData}
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          domain={[0, 6]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: "0%",
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
    alignItems: "center",
  },
  backIconContainer: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "10%",
    left: "5%",
    right: "5%",
    elevation: 5,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default TurbidityScreen;
