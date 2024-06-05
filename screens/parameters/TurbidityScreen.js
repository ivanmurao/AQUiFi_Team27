import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  RefreshControl,
} from "react-native";
import LineGraph from "@components/LineGraph.js";
import backIcon from "@assets/images/icons/back.png";
import ContainerBG from "@assets/images/background-container.png";
import useParameterData from "@hooks/readParameterData.js";

const TurbidityScreen = ({ navigation }) => {
  const [selectedInterval, setSelectedInterval] = useState("Current");
  const [refreshing, setRefreshing] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const turbidityData = useParameterData(
    "TURBIDITY_SENSOR_VALUES",
    "turbidityLevelValue",
    refreshing
  );

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
          <Text style={styles.title}>Turbidity</Text>
          {/* Interval Buttons */}
          <View style={styles.intervalButtons}>
            <TouchableOpacity
              onPress={() => handleIntervalChange("Current")}
              style={
                selectedInterval === 6
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange("1 day")}
              style={
                selectedInterval === 24
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>1 day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange("1 week")}
              style={
                selectedInterval === 168
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>1 week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange("All")}
              style={
                selectedInterval === "All"
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>Max</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        <ScrollView
          contentContainerStyle={styles.graphContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={"#255C99"}
              colors={["white"]}
            />
          }
        >
          <LineGraph
            title="Sensor Values"
            data={turbidityData}
            tickValues={[0, 1, 2, 3, 4, 5, 6]}
            domain={[0, 6]}
            xlabel="Date"
            ylabel="Turbidity Level"
            time="x"
            value="y"
          />
          <LineGraph
            title="Forecast Values"
            data={turbidityData}
            tickValues={[0, 1, 2, 3, 4, 5, 6]}
            domain={[0, 6]}
            xlabel="Date"
            ylabel="Turbidity Level"
            time="x"
            value="y"
          />
        </ScrollView>
      </View>
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
    top: 10,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  intervalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
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
  graphContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TurbidityScreen;
