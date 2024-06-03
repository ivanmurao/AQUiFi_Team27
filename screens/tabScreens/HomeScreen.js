import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";

import gaugeReadData from "@hooks/gaugeReadData";

import AlertNotification from "@components/AlertNotification.js";
import PHColorChart from "@components/pHColorChart.js";
import TurbColorChart from "@components/TurbColorChart.js";

import logoIcon from "@assets/images/logos/aquifi-light.png";
import turbidity from "@assets/images/icons/turbidity-meter.png";
import ph from "@assets/images/icons/ph-meter.png";

const HomeScreen = () => {
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [isPHColorChartVisible, setIsPHColorChartVisible] = useState(false);
  const [isTurbColorChartVisible, setIsTurbColorChartVisible] = useState(false);

  const handleAlertButtonPress = () => {
    setIsAlertModalVisible(true);
  };

  const handleAlertModalClose = () => {
    setIsAlertModalVisible(false);
  };

  const handleContainer1Press = () => {
    setIsPHColorChartVisible(true);
  };

  const handleContainer2Press = () => {
    setIsTurbColorChartVisible(true);
  };

  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good Morning!";
  } else if (hour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentTime.toLocaleDateString(undefined, dateOptions);

  const { phValue, turbidityValue } = gaugeReadData();
  console.log(phValue, turbidityValue);

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          {/* Date and Greetings */}
          <View style={styles.dateGreetingsContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.greetings}>{greeting}</Text>
          </View>
          <View style={styles.alertContainer}>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={handleAlertButtonPress}
            >
              <Image
                source={require("@assets/images/icons/alert.png")}
                style={styles.alerticon}
              />
            </TouchableOpacity>
            <AlertNotification
              isVisible={isAlertModalVisible}
              onClose={handleAlertModalClose}
            />
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        {/* Logo Image */}
        <View style={styles.logoImageContainer}>
          <Image source={logoIcon} style={styles.logoImage} />
        </View>
        <Text style={styles.title}>Purified Water</Text>
        <Text style={styles.title}>Monitoring System</Text>
        {/* Container 1 */}
        <TouchableOpacity onPress={handleContainer1Press}>
          <View style={styles.container1}>
            {/* Left Section */}
            <View style={styles.leftSection1}>
              <Image source={ph} style={styles.icon} />
              <Text style={styles.containerTitle1}>pH</Text>
            </View>
            {/* Right Section */}
            <View style={styles.rightSection1}>
              {/* Circular Gauge */}
              <Svg width="100" height="100">
                {/* Background Circle */}
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E1E1E1"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* pH Value Circle */}
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#7EA3CC"
                  strokeWidth="10"
                  strokeDasharray={`${(phValue / 15) * 282.5} 565`}
                  strokeLinecap="butt"
                  fill="transparent"
                />
                {/* Text Displaying pH Value */}
                <SvgText
                  x="50%"
                  y="50%"
                  fontSize="16"
                  textAnchor="middle"
                  fill="#000"
                  dy="8"
                >
                  {phValue.toFixed(1)}
                </SvgText>
              </Svg>
            </View>
          </View>
        </TouchableOpacity>

        {/* Container 2 */}
        <TouchableOpacity onPress={handleContainer2Press}>
          <View style={styles.container2}>
            {/* Left Section */}
            <View style={styles.leftSection2}>
              <Image source={turbidity} style={styles.icon} />
              <Text style={styles.containerTitle2}>TURBIDITY</Text>
            </View>
            {/* Right Section */}
            <View style={styles.rightSection2}>
              {/* Circular Gauge */}
              <Svg width="100" height="100">
                {/* Background Circle */}
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E1E1E1"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* turbidity Value Circle */}
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#7EA3CC"
                  strokeWidth="10"
                  strokeDasharray={`${(turbidityValue / 5) * 282.5} 565`}
                  strokeLinecap="butt"
                  fill="transparent"
                />
                {/* Text Displaying turbidity Value */}
                <SvgText
                  x="50%"
                  y="50%"
                  fontSize="16"
                  textAnchor="middle"
                  fill="#000"
                  dy="8"
                >
                  {turbidityValue.toFixed(1)}
                </SvgText>
              </Svg>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <PHColorChart
        isVisible={isPHColorChartVisible}
        onClose={() => setIsPHColorChartVisible(false)}
      />
      <TurbColorChart
        isVisible={isTurbColorChartVisible}
        onClose={() => setIsTurbColorChartVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    flex: 1,
    paddingHorizontal: 10,
  },
  alertContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 15,
    alignItems: "flex-end",
  },

  alerticon: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },

  accent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#255C99",
    paddingHorizontal: 20,
  },
  dateGreetingsContainer: {
    alignItems: "flex-start",
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  date: {
    color: "white",
    fontSize: 12,
  },
  greetings: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoImageContainer: {
    alignItems: "center",
    bottom: 0,
    paddingTop: 20,
  },
  logoImage: {
    width: 40,
    height: 55,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "10%",
    bottom: "5%",
    left: "7%",
    right: "7%",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  container1: {
    flexDirection: "row",
    backgroundColor: "#7EA3CC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 40,
    borderRadius: 30,
    elevation: 5,
  },
  leftSection1: {
    flexDirection: "column",
    alignItems: "center",
  },
  rightSection1: {
    backgroundColor: "#F0f0f0",
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 35,
    paddingRight: 35,
    left: 20,
    alignItems: "center",
    elevation: 5,
  },
  pHValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#85A0AF",
    marginTop: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 30,
    marginBottom: 20,
    right: 20,
  },
  containerTitle1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    right: 20,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: "#7EA3CC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
    borderRadius: 30,
    elevation: 5,
  },
  leftSection2: {
    flexDirection: "column",
    alignItems: "center",
  },
  rightSection2: {
    backgroundColor: "#F0f0f0",
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 35,
    paddingRight: 35,
    left: 10,
    alignItems: "center",
    elevation: 5,
  },
  containerTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    right: 20,
  },
});

export default HomeScreen;
