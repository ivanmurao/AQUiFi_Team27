import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LineGraph from "../components/LineGraph";
import data from "../services/firebase/readData";
import backIcon from "../assets/Back.png";
import sidebarIcon from "../assets/menu.png";
import SidebarMenu from '../menu/SideBar.js';
import forecastedData from "../services/firebase/readForecastedData";
import ForecastedLineGraph from "../components/ForecastedLineGraph";

const PHScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const pHData = data("pH_Level/Timestamp", "pH_Level/ph_Level_Values");
  const forecastedPHData = forecastedData(
    "pH_Level/Timestamp",
    "pH_Level/ph_Level_Values"
  );

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack} style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          {/* Side Bar Icon */}
          <TouchableOpacity style={styles.sidebarIconContainer} onPress={toggleSidebar}>
            <Image source={sidebarIcon} style={styles.sidebarIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>pH</Text>
        </View>
      </View>

      <View style={styles.fillOut}>
        <LineGraph
          data={pHData}
          tickValues={[2, 4, 6, 8, 10, 12]}
          domain={[0, 12]}
          xlabel="Time"
          ylabel="pH Level"
          time="x"
          value="y"
        />
        <ForecastedLineGraph
          data={forecastedPHData}
          tickValues={[2, 4, 6, 8, 10, 12]}
          domain={[0, 12]}
          xlabel="Time"
          ylabel="pH Level"
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
  sidebarContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarLogo: {
    width: 100,
    height: 120, 
  },
  sidebarItems: {
    flex: 1,
    justifyContent: 'center',
  },
  sidebarItem: {
    marginBottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderBottomWidth: 2,
    borderColor: "#A0A0A0",
    flexDirection: 'row', 
  },
  sidebarItemText: {
    fontSize: 16,
  },
  sbicon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  sidebarExit: {
    marginTop: 10,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
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
    borderRadius: 40,
  },
});

export default PHScreen;
