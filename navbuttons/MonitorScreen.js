import React, { useState, useRef } from "react";
import {View,Text,StyleSheet,Image,Pressable,Animated,TouchableOpacity,Modal,Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import turbidity from "../assets/turbidity.png";
import ph from "../assets/ph.png";
import next from "../assets/next.png";
import sidebarIcon from "../assets/menu.png";
import sidebarLogo from "../assets/sidebarIcon.png";
import aboutus from '../assets/aboutus.png';
import toc from '../assets/toc.png';
import faqs from '../assets/faqs.png';
import app from "../services/firebase/firebaseConfig.js";
import { getDatabase, ref, set } from "firebase/database";

const MonitorScreen = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const goToTurbidity = () => {
    navigation.navigate("TurbidityScreen");
  };
  const goTopH = () => {
    navigation.navigate("PHScreen");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const [selectedValveControl, setSelectedValveControl] = useState(null);
  const translateX = useRef(new Animated.Value(0)).current;

  const db = getDatabase(app);
  const buttonRef = ref(db, "Sensor/Button/");

  const toggleValve = () => {
    const newValue =
      selectedValveControl === "Close Valve" ? "Open Valve" : "Close Valve";
    setSelectedValveControl(newValue);
    Animated.timing(translateX, {
      toValue: newValue === "Open Valve" ? 30 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    newValue == "Open Valve"
      ? set(buttonRef,  "H" )
      : set(buttonRef,  "L" );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fillOut}>
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
        {/* Top container for parameter selection */}
        <View style={styles.topContainer}>
          <Text style={styles.description}>
            Select a parameter you want to monitor
          </Text>
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
                          extrapolate: "clamp",
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#255C99",
    justifyContent: "space-between",

  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: "3%",
    left: "3%",
    right: "3%",
    paddingHorizontal: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    marginTop: 50,
  },
  sidebarIconContainer: {
    position: "absolute",
    top: 30,
    right: 8,
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
    marginRight: 10,
  },
  sidebarExit: {
    marginTop: 10,
  },
  description: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 130,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7EA3CC",
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
    borderColor: "black",
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  icon2: {
    width: 30,
    height: 30,
    marginLeft: 100,
  },
  icon3: {
    width: 30,
    height: 30,
    marginLeft: 155,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
    marginRight: 10,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#7EA3CC",
    borderRadius: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 130,
    paddingRight: 130,
  },
  switchDescription: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    paddingBottom: 20,
  },
  switchButton: {
    width: 100,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    paddingHorizontal: 7,
  },
  switchKnob: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#255C99",
  },
});

export default MonitorScreen;
