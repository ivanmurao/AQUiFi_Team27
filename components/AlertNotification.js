import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";

const AlertNotification = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.upperContent}>
            <Image
              source={require("@assets/images/icons/alert.png")}
              style={styles.icon}
            />
            <Text style={styles.warningText}>Warning!</Text>
          </View>
          <Text style={styles.message}>
            The pH level is not within the standard range; therefore, it is not
            safe to drink the water. The valve will automatically shut off.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Understood</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    backgroundColor: "white",
    width: 340,
    borderRadius: 20,
    padding: 30,
    justifyContent: "flex-start",
    elevation: 5,
  },

  upperContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 20,
  },

  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },

  warningText: {
    fontSize: 20,
    fontWeight: "600",
  },

  message: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "left",
  },

  button: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#7EA3CC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AlertNotification;
