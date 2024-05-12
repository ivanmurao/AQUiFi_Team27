import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const TurbColorChart = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.chartContainer}>
        <View style={styles.chartContent}>
          {/* Title and Status */}
          <View style={styles.header}>
            <Text style={styles.title}>Turbidity Color Chart</Text>
            <Text style={styles.status}>Status: </Text>
          </View>

          {/* pH Color Boxes */}
          <View style={styles.colorBoxesContainer}>
            <View style={[styles.colorBox, { backgroundColor: "#FF5733" }]}>
              <Text style={styles.boxText}>10</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#FFA500" }]}>
              <Text style={styles.boxText}>-</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#FFFF00" }]}>
              <Text style={styles.boxText}>6</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#ADFF2F" }]}>
              <Text style={styles.boxText}>5</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#008000" }]}>
              <Text style={styles.boxText}>4</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#ADD8E6" }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#0000FF" }]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#8A2BE2" }]}>
              <Text style={styles.boxText}>1</Text>
            </View>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chartContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "85%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  status: {
    marginRight: 35,
    fontSize: 16,
  },
  colorBoxesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginHorizontal: 5.5,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    color: "black",
    fontWeight: "medium",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#255C99",
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TurbColorChart;
