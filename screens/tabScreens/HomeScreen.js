import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";

import useGaugeData from "@hooks/readGaugeData";

import AlertNotification from "@components/AlertNotification.js";
import PHColorChart from "@components/pHColorChart.js";
import TurbColorChart from "@components/TurbColorChart.js";

import phColorSelector from "@utils/phColorSelector";
import turbidityColorSelector from "@utils/turbidityColorSelector";

import logoIcon from "@assets/images/logos/aquifi-light.png";
import turbidity from "@assets/images/icons/turbidity-meter.png";
import ph from "@assets/images/icons/ph-meter.png";

const HomeScreen = () => {
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [isNotStandard, setIsNotStandard] = useState(false);
  const [warnedParameter, setWarnedParameter] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
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

  const { phValue, turbidityValue } = useGaugeData();

  useEffect(() => {
    let alert = false;
    let parameter = "";
    let alertMessage = "None";

    const isPhOutOfRange = phValue < 8 || phValue > 10;
    const isTurbidityHigh = turbidityValue > 5;

    if (isPhOutOfRange && isTurbidityHigh) {
      alert = true;
      parameter = "pH and turbidity";
      alertMessage = "neither clean nor alkaline";
    } else if (isPhOutOfRange) {
      alert = true;
      parameter = "pH";
      alertMessage = "not alkaline";
    } else if (isTurbidityHigh) {
      alert = true;
      parameter = "turbidity";
      alertMessage = "not clean";
    }

    setIsAlertModalVisible(alert);
    setIsNotStandard(alert);
    setWarnedParameter(parameter);
    setAlertMessage(alertMessage);
  }, [phValue, turbidityValue]);

  const phColor = phColorSelector(phValue);
  const turbidityColor = turbidityColorSelector(turbidityValue);

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        {/* Date and Greetings */}
        <View style={styles.dateGreetingsContainer}>
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.greetings}>{greeting}</Text>
        </View>
        {isNotStandard && (
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
              parameter={warnedParameter}
              message={alertMessage}
              isVisible={isAlertModalVisible}
              onClose={handleAlertModalClose}
            />
          </View>
        )}
      </View>

      <View style={styles.headerContainer}>
        {/* Logo Image */}
        <Image source={logoIcon} style={styles.logoImage} />

        <Text style={styles.title}>Alkaline Water</Text>
        <Text style={styles.title}>Monitoring System</Text>
      </View>

      <View style={styles.fillOut}>
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
                  stroke={phColor}
                  strokeWidth="10"
                  strokeDasharray={`${(phValue / 15) * 282.5} 565`}
                  strokeLinecap="round"
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
                  stroke={turbidityColor}
                  strokeWidth="10"
                  strokeDasharray={`${(turbidityValue / 5) * 282.5} 565`}
                  strokeLinecap="round"
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

      {/* Parameter Chart Modal */}
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
  // Main Container
  container: {
    flex: 1,
    backgroundColor: "#255C99",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },

  // Alert Button
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
  },

  // Date and Greetings Container
  frame: {},
  // Date and Greetings
  dateGreetingsContainer: {
    alignItems: "flex-start",
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

  // Header
  headerContainer: {
    alignItems: "center",
  },
  // Logo Image
  logoImage: {
    width: 40,
    height: 55,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },

  // Parameter Gauge
  // Main Gauge Container
  fillOut: {
    paddingHorizontal: 20,
    gap: 40,
  },
  // pH Gauge
  container1: {
    flexDirection: "row",
    backgroundColor: "#7EA3CC",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
  leftSection1: {
    alignItems: "center",
    gap: 20,
  },
  rightSection1: {
    backgroundColor: "#F0f0f0",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 35,
    elevation: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
  containerTitle1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  // Turbidity Gauge
  container2: {
    flexDirection: "row",
    backgroundColor: "#7EA3CC",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: 20,
    borderRadius: 30,
    elevation: 5,
  },
  leftSection2: {
    alignItems: "center",
    gap: 20,
  },
  rightSection2: {
    backgroundColor: "#F0f0f0",
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 35,
    elevation: 5,
  },
  containerTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default HomeScreen;
