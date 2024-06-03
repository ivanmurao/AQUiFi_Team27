import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import LineGraph from "@components/LineGraph";
import backIcon from "@assets/images/icons/back.png";
import ContainerBG from "@assets/images/background-container.png";
import ForecastedLineGraph from "@components/ForecastedLineGraph";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "@services/firebase/firebaseConfig";

const PHScreen = ({ navigation }) => {
  const [selectedInterval, setSelectedInterval] = useState(6);
  const [phValues, setPHValues] = useState([]);

  const goBack = () => {
    navigation.goBack();
  };
  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  // Initialize Firestore
  const db = getFirestore(app);

  // Firestore Collections
  const SENSOR_PH_VALUE_COLLECTION = collection(db, "SENSOR_PH_LEVEL_VALUES");
  const SENSOR_TURBIDITY_VALUE_COLLECTION = collection(
    db,
    "SENSOR_TURBIDITY_LEVEL_VALUES"
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchPHValues() {
      let phValuesQuery;
      if (selectedInterval === "All") {
        phValuesQuery = query(
          SENSOR_PH_VALUE_COLLECTION,
          orderBy("Timestamp", "desc")
        );
      } else {
        phValuesQuery = query(
          SENSOR_PH_VALUE_COLLECTION,
          orderBy("Timestamp", "desc"),
          limit(selectedInterval)
        );
      }

      if (!isMounted) return;

      const phValuesSnapshot = await getDocs(phValuesQuery);
      const phValues = phValuesSnapshot.docs.map((doc) => ({
        x: doc.data().Timestamp,
        y: doc.data().PHLevelValues,
      }));
      setPHValues(phValues);
    }

    fetchPHValues();

    return () => {
      isMounted = false;
    };
  }, [selectedInterval]);

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <ImageBackground source={ContainerBG} style={styles.containerBG} />
        <View style={styles.accent}>
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack} style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>pH</Text>
          {/* Interval Buttons */}
          <View style={styles.intervalButtons}>
            <TouchableOpacity
              onPress={() => handleIntervalChange(6)}
              style={
                selectedInterval === 6
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange(24)}
              style={
                selectedInterval === 24
                  ? styles.selectedButton
                  : styles.intervalButton
              }
            >
              <Text style={styles.buttonText}>1 day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIntervalChange(168)}
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
        <LineGraph
          data={phValues}
          tickValues={[2, 4, 6, 8, 10, 12]}
          domain={[0, 12]}
          xlabel="Date"
          ylabel="Turbidity Level"
          time="x"
          value="y"
        />

        {/* <ForecastedLineGraph
          data={forecastedPHData}
          tickValues={[2, 4, 6, 8, 10, 12]}
          domain={[0, 12]}
          xlabel="Hours"
          ylabel="Turbidity Level"
          time="x"
          value="y"
        /> */}
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
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PHScreen;
