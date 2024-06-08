import React, { useCallback, useEffect, useState } from "react";
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
import LineGraph from "@components/LineGraph";
import backIcon from "@assets/images/icons/back.png";
import ContainerBG from "@assets/images/background-container.png";
import useParameterData from "@hooks/readParameterData";

const PHScreen = ({ navigation }) => {
  const [selectedInterval, setSelectedInterval] = useState("TODAY");
  const [refreshing, setRefreshing] = useState(false);
  const [phSensorData, setPHSensorData] = useState();
  const [phForecastData, setPHForecastData] = useState();

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

  const rawPHSensorData = useParameterData(
    "PH_SENSOR_VALUES",
    "phLevelValue",
    refreshing
  );

  const rawPHForecastData = useParameterData(
    "PH_FORECAST_VALUES",
    "phLevelValue",
    refreshing
  );

  useEffect(() => {
    // Sensor Data
    if (selectedInterval === "MAX") {
      setPHSensorData(rawPHSensorData);
    } else {
      const filteredValues = rawPHSensorData.filter(
        (data) => data.interval === selectedInterval
      );
      setPHSensorData(filteredValues);
    }

    // Forecast Data
    if (selectedInterval === "MAX") {
      setPHForecastData(rawPHForecastData);
    } else {
      const filteredValues = rawPHForecastData.filter(
        (data) => data.interval === selectedInterval
      );
      setPHForecastData(filteredValues);
    }
  }, [selectedInterval, rawPHSensorData, rawPHForecastData]);

  return (
    <View style={styles.container}>
      <ImageBackground source={ContainerBG} style={styles.containerBG} />
      <View style={styles.accent}></View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.title}>pH</Text>
        </View>

        {/* Interval Buttons */}
        <View style={styles.wholeGraphContainer}>
          <View style={styles.intervalButtons}>
            <TouchableOpacity
              onPress={() => handleIntervalChange("TODAY")}
              style={
                selectedInterval === "TODAY"
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange("YESTERDAY")}
              style={
                selectedInterval === "YESTERDAY"
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>1 day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange("ONE_WEEK_AGO")}
              style={
                selectedInterval === "ONE_WEEK_AGO"
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>1 week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange("MAX")}
              style={
                selectedInterval === "MAX"
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>Max</Text>
            </TouchableOpacity>
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
                data={phSensorData}
                tickValues={[2, 4, 6, 8, 10, 12]}
                domain={[0, 12]}
                xlabel="Date"
                ylabel="pH Level"
                time="x"
                value="y"
              />

              <LineGraph
                title="Forecast Values"
                data={phForecastData}
                tickValues={[2, 4, 6, 8, 10, 12]}
                domain={[0, 12]}
                xlabel="Date"
                ylabel="pH Level"
                time="x"
                value="y"
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
  },
  // Image Background
  containerBG: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  // Header Design
  accent: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#255C99",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "100%",
    position: "absolute",
    zIndex: 0,
  },

  // Content Container
  contentContainer: {
    paddingHorizontal: 20,
    gap: 50,
  },

  // Header Container
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },

  // Whole Graph Container
  wholeGraphContainer: {
    gap: 5,
  },

  // Interval Buttons
  intervalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    elevation: 5,
  },
  intervalButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#7EA3CC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  // Graph Container
  fillOut: {
    elevation: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 40,
  },
  graphContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});

export default PHScreen;
