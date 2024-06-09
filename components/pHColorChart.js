import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const pHColorChart = ({ isVisible, onClose }) => {
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
            <Text style={styles.title}>pH Color Chart</Text>
          </View>

          {/* pH Color Boxes */}
          <View style={styles.colorBoxesContainer}>
            <View style={[styles.colorBox, { backgroundColor: "#FF5733" }]}>
              <Text style={styles.boxText}>3</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#FFA500" }]}>
              <Text style={styles.boxText}>4</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#FFFF00" }]}>
              <Text style={styles.boxText}>5</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#ADFF2F" }]}>
              <Text style={styles.boxText}>6</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#008000" }]}>
              <Text style={styles.boxText}>7</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#ADD8E6" }]}>
              <Text style={styles.boxText}>8</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#0000FF" }]}>
              <Text style={styles.boxText}>9</Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: "#8A2BE2" }]}>
              <Text style={styles.boxText}>10</Text>
            </View>
          </View>

          {/* Arrow Indicator */}
          <View style={styles.indicatorArrowContainer}>
            <View style={styles.indicatorArrow1} />
            <View style={styles.indicatorArrow2} />
            <View style={styles.indicatorArrow3} />
          </View>

          {/* Indicator Text */}
          <View style={styles.indicatorTextContainer}>
            <Text style={styles.indicatorText1}>Acidic</Text>
            <Text style={styles.indicatorText2}>Neutral</Text>
            <Text style={styles.indicatorText3}>Alkaline</Text>
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
    marginBottom: 10,
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

  indicatorArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 290,
    justifyContent: "space-between",
    marginBottom: 5,
  },

  indicatorArrow1: {
    width: 125,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 0,
  },

  indicatorArrow2: {
    height: 10,
    borderLeftWidth: 2,
  },

  indicatorArrow3: {
    width: 85,
    height: 10,
    borderTopWidth: 0,
    borderWidth: 2,
  },

  indicatorTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 290,
    justifyContent: "space-between",
    marginBottom: 20,
  },

  indicatorText1: {
    color: "#7EA3CC",
    marginLeft: 45,
    fontWeight: "600",
  },

  indicatorText2: {
    color: "#7EA3CC",
    marginLeft: 25,
    fontWeight: "600",
  },

  indicatorText3: {
    color: "#7EA3CC",
    marginRight: 15,
    fontWeight: "600",
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

export default pHColorChart;
