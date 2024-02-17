import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LineGraph from "../components/LineGraph";
import data from "../services/firebase/readData";
import backIcon from "../assets/Back.png";
import ContainerBG from "../assets/ContainerBG.png";
import sidebarIcon from "../assets/menu.png";
import SidebarMenu from "../menu/SideBar.js";
import forecastedData from "../services/firebase/readForecastedData";
import ForecastedLineGraph from "../components/ForecastedLineGraph";

const TurbidityScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("1 hr");

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const turbidityData = data(
    "Turbidity_Level/Timestamp",
    "Turbidity_Level/Turbidity_Level_Values", selectedInterval
  );
  const forecastedTurbidityData = forecastedData(
    "Turbidity_Level/Timestamp",
    "Turbidity_Level/Turbidity_Level_Values"
  );

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);`123`
    
  };

  console.log(selectedInterval)

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
      <ImageBackground source={ContainerBG} style={styles.containerBG} />
        <View style={styles.accent}>
          
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack} style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          {/* Side Bar Icon */}
          <TouchableOpacity
            style={styles.sidebarIconContainer}
            onPress={toggleSidebar}
          >
            <Image source={sidebarIcon} style={styles.sidebarIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Turbidity</Text>
          {/* Interval Buttons */}
          <View style={styles.intervalButtons}>
            <TouchableOpacity onPress={() => handleIntervalChange(6)} style={selectedInterval === 6 ? styles.selectedButton : styles.intervalButton}>
              <Text style={styles.buttonText}>1 hr</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIntervalChange(24)} style={selectedInterval === 24 ? styles.selectedButton : styles.intervalButton}>
              <Text style={styles.buttonText}>1 day</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIntervalChange(168)} style={selectedInterval === 168 ? styles.selectedButton : styles.intervalButton}>
              <Text style={styles.buttonText}>1 week</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIntervalChange("All")} style={selectedInterval === "All" ? styles.selectedButton : styles.intervalButton}>
              <Text style={styles.buttonText}>All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.fillOut}>
        <LineGraph
          data={turbidityData}
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          domain={[0, 6]}
          xlabel="Date"
          ylabel="Turbidity Level"
          time="x"
          value="y"
        />
        <ForecastedLineGraph
          data={forecastedTurbidityData}
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          domain={[0, 6]}
          xlabel="Hours"
          ylabel="Turbidity Level"
          time="x"
          value="y"
        />
      </View>
      <SidebarMenu isVisible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: "0%",
  },
  containerBG: {
    flex: 1,
    height: 850,
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
    flexDirection: "column",
    alignItems: "center",
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
  sidebarIconContainer: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  sidebarIcon: {
    width: 30,
    height: 30,
  },
  intervalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  intervalButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 2,
  },
  selectedButton: {
    backgroundColor: "#7EA3CC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 2,
  },
  buttonText: {
    color: "#000",
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "2%",
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TurbidityScreen;
