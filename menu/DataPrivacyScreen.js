import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import backIcon from "../assets/Back.png";
import ContainerBG from "../assets/ContainerBG.png";
import policy from "../assets/policy.png";

const DataPrivacyScreen = () => {
  const navigation = useNavigation();
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
      <ImageBackground source={ContainerBG} style={styles.containerBG} />
        <View style={styles.accent}>
          {/* Back Icon */}
          <TouchableOpacity onPress={goBack} style={styles.backIconContainer}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Data Privacy Policy</Text>
        </View>
      </View>

      <ScrollView style={styles.fillOut}>
        <Image source={policy} style={styles.policyLogo} />
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionContent}>
          Welcome to Data Privacy Policy. This policy outlines how we collect, use, and protect your data as part of our smart control system for managing the quality of alkaline water. We are committed to safeguarding your privacy and ensuring the security of your personal information. By using our system, you agree to the terms outlined in this policy.
        </Text>

        <Text style={styles.sectionTitle}>Data Information Collection</Text>
        <Text style={styles.sectionContent}>
          We collect various types of data as part of our system's operation. This includes water quality data gathered by sensors installed in water refilling stations, user data provided during registration or interaction with our mobile application, and system usage data collected through the use of our system.
        </Text>

        <Text style={styles.sectionTitle}>Purpose of Data Collection</Text>
        <Text style={styles.sectionContent}>
          The data we collect serves several purposes, including quality management, user experience enhancement, system optimization, and communication with users. We utilize this data to ensure the continuous supply of alkaline water at standard quality levels, provide personalized experiences, improve system functionality, and communicate important updates and notifications.
        </Text>

        <Text style={styles.sectionTitle}>Data Usage</Text>
        <Text style={styles.sectionContent}>
          We use the collected data for quality assurance, service provision, improvement and innovation, and communication purposes. Your privacy and security are our top priorities, and we take all necessary measures to protect your information.
        </Text>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
  containerBG: {
    flex: 1,
    height: 870,
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
    paddingHorizontal: 20,
    flexDirection: "row",
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
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    top: 80,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "15%",
    bottom: "2%",
    left: "5%",
    right: "5%",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  policyLogo: {
    alignSelf: 'center',
    height: 200,
    width: 150,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DataPrivacyScreen;
