import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LineGraph from "../components/LineGraph";
import data from "../services/firebase/readData";
import backIcon from "../assets/Back.png";
import sidebarIcon from "../assets/menu.png";
import sidebarLogo from "../assets/sidebarIcon.png";
import aboutus from '../assets/aboutus.png';
import toc from '../assets/toc.png';
import faqs from '../assets/faqs.png';
import forecastedData from "../services/firebase/readForecastedData";
import ForecastedLineGraph from "../components/ForecastedLineGraph";

const TurbidityScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const turbidityData = data("pH_Level/Timestamp", "pH_Level/ph_Level_Values");
  const forecastedTurbidityData = forecastedData(
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
          {/* Sidebar */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isSidebarVisible}
            onRequestClose={toggleSidebar}
          >
            <View style={styles.sidebarContainer}>
              {/* Sidebar Logo */}
              <View style={styles.sidebarHeader}>
                <Image source={sidebarLogo} style={styles.sidebarLogo} />
              </View>

              {/* Sidebar Items */}
              <View style={styles.sidebarItems}>
                <TouchableOpacity style={styles.sidebarItem}>
                  <Image source={aboutus} style={styles.sbicon} />
                  <Text style={styles.sidebarItemText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <Image source={toc} style={styles.sbicon} />
                  <Text style={styles.sidebarItemText}>Terms & Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <Image source={faqs} style={styles.sbicon} />
                  <Text style={styles.sidebarItemText}>FAQs</Text>
                </TouchableOpacity>
              </View>

              {/* Exit Button */}
              <View style={styles.sidebarExit}>
                <Button title="Close" color="#255C99" onPress={toggleSidebar} />
              </View>
            </View>
          </Modal>
          <Text style={styles.title}>Turbidity</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default TurbidityScreen;
