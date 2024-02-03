import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import LineGraph from "../components/LineGraph";
import data from "../services/firebase/readData";
import menu from "../assets/menu.png";

const TurbidityScreen = () => {
  const turbidityData = data("Turbidity_Level/Turbidity_Level_Values");

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          <Text style={styles.title}>Turbidity</Text>
          {/* Menu Icon */}
          <TouchableOpacity style={styles.menuIconContainer} onPress={toggleMenu}>
            <Image source={menu} style={styles.menuIcon} />
          </TouchableOpacity>

          {/* Your menu components can go here. Conditionally render based on `showMenu`. */}
          {showMenu && (
            <View style={styles.menuContainer}>
              {/* Add your menu items here */}
              <Text style={styles.menuItem}>Menu Item 1</Text>
              <Text style={styles.menuItem}>Menu Item 2</Text>
              {/* ... */}
            </View>
          )}
        </View>
      </View>

      <View style={styles.fillOut}>
        <LineGraph
          data={turbidityData}
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          domain={[0, 6]}
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
  menuIconContainer: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  menuContainer: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "10%",
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
