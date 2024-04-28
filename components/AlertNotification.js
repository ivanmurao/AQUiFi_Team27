import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native"; // Added Text for debugging
import { Dialog, ALERT_TYPE } from "react-native-alert-notification";
import alertIcon from "../assets/alert.png";

const AlertNotification = () => {
  const showDialog = () => {
    console.log("Dialog will show now."); 
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Congrats! This is a custom notification.",
    });
  };

  return (
    <View style={styles.alertContainer}>
      <TouchableOpacity onPress={showDialog}>
        <Image source={alertIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    alignItems: "center",

  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default AlertNotification;
