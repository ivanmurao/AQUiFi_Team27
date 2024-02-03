import React from "react";
import { View, StyleSheet } from "react-native";
import LineGraph from "../components/LineGraph";
import data from "../services/firebase/readData";

const PHScreen = () => {
  const pHData = data("pH_Level/ph_Level_Values");

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}></View>
      </View>

      <View style={styles.fillOut}>
        <LineGraph data={pHData} tickValues={[7, 8, 9, 10]} domain={[7, 10]} />
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    borderRadius: 40,
  },
});

export default PHScreen;
