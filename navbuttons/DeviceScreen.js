import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import SidebarMenu from '../menu/SideBar.js';
import Status from '../components/StatusBar.js';
import sidebarIcon from "../assets/menu.png";
import turbidity from '../assets/turbidity.png';
import ph from '../assets/ph.png';
import arduino from '../assets/arduino.png';
import raspi from '../assets/raspi.png';
import valve from '../assets/valve.png';
import mobile from '../assets/mobile.png';
import info from '../assets/Info.png';


const DeviceScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isArduinoModalVisible, setArduinoModalVisible] = useState(false);
  const [isRaspiModalVisible, setRaspiModalVisible] = useState(false);
  const [isTurbModalVisible, setTurbModalVisible] = useState(false);
  const [ispHModalVisible, setpHModalVisible] = useState(false);
  const [isValveModalVisible, setValveModalVisible] = useState(false);
  const [isMobileModalVisible, setMobileModalVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleArduinoModal = () => {
    setArduinoModalVisible(!isArduinoModalVisible);
  };
  const toggleRaspiModal = () => {
    setRaspiModalVisible(!isRaspiModalVisible);
  };
  const toggleTurbModal = () => {
    setTurbModalVisible(!isTurbModalVisible);
  };
  const togglepHModal = () => {
    setpHModalVisible(!ispHModalVisible);
  };
  const toggleValveModal = () => {
    setValveModalVisible(!isValveModalVisible);
  };
  const toggleMobileModal = () => {
    setMobileModalVisible(!isMobileModalVisible);
  };

  return (
    <View style={styles.container}>
      <Status />
      <View style={styles.fillOut}>
        {/* Side Bar Icon */}
        <TouchableOpacity style={styles.sidebarIconContainer} onPress={toggleSidebar}>
          <Image source={sidebarIcon} style={styles.sidebarIcon} />
        </TouchableOpacity>
        <View style={styles.compContainer}>
            <Text style={styles.compDescription}>Device Components</Text>
            {/* Arduino Button */}
            <TouchableOpacity style={styles.button} onPress={toggleArduinoModal}>
              <Image source={arduino} style={styles.icon} />
              <Text style={styles.buttonText}>Arduino UNO</Text>
              <Image source={info} style={styles.icon1} />
            </TouchableOpacity>
            {/* Raspberry pi Button */}
            <TouchableOpacity style={styles.button} onPress={toggleRaspiModal}>
              <Image source={raspi} style={styles.icon} />
              <Text style={styles.buttonText}>Raspberry Pi</Text>
              <Image source={info} style={styles.icon1} />
            </TouchableOpacity>
            {/* Turbidity Button */}
            <TouchableOpacity style={styles.button} onPress={toggleTurbModal}>
              <Image source={turbidity} style={styles.icon} />
              <Text style={styles.buttonText}>Turbidity Sensor</Text>
              <Image source={info} style={styles.icon2} />
            </TouchableOpacity>
            {/* pH Button */}
            <TouchableOpacity style={styles.button} onPress={togglepHModal}>
              <Image source={ph} style={styles.icon} />
              <Text style={styles.buttonText}>pH Sensor</Text>
              <Image source={info} style={styles.icon3} />
            </TouchableOpacity>
            {/* Valve Button */}
            <TouchableOpacity style={styles.button} onPress={toggleValveModal}>
              <Image source={valve} style={styles.icon} />
              <Text style={styles.buttonText}>Solenoid Valve</Text>
              <Image source={info} style={styles.icon4} />
            </TouchableOpacity>
            {/* Mobile Button */}
            <TouchableOpacity style={styles.button} onPress={toggleMobileModal}>
              <Image source={mobile} style={styles.icon} />
              <Text style={styles.buttonText}>Mobile Application</Text>
              <Image source={info} style={styles.icon5} />
            </TouchableOpacity>
          </View>
          {/* Arduino  Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isArduinoModalVisible}
            onRequestClose={toggleArduinoModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={arduino} style={styles.modalIcon} />
                <Text style={styles.modalText}>Arduino UNO</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.modalInfoText}>
                  Arduino UNO is an open-source, and programmable microcontroller board that is flexible and easy to use, making it suitable for a wide range of electronic projects. 
                </Text>
                <Text style={styles.modalInfoText}>
                  It is  an essential component in the system as it will be used to connect the analog sensors into the Raspberry Pi.             
                </Text>
                <Button 
                title="Close" 
                color={'#0B3954'}
                onPress={toggleArduinoModal} />
              </View>
            </View>
          </Modal>
          {/* Raspberry Pi Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isRaspiModalVisible}
            onRequestClose={toggleRaspiModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={raspi} style={styles.modalIcon} />
                <Text style={styles.modalText}>Raspberry Pi</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.modalInfoText}>
                  Raspberry Pi is a tiny computer with the size of a credit card, which can transform any monitor, TV, mouse, or keyboard into a full-featured PC. This component will stand as the singular and central processing unit, effectively overseeing both sensor interfacing and data processing tasks. 
                </Text>
                <Text style={styles.modalInfoText}>
                  Raspberry Pi, with its enhanced computational capabilities, takes on the responsibility of collecting real-time data from sensors measuring turbidity, and pH. Subsequently, it processes this data using a deep learning algorithm, comparing it against established drinking water standards.
                </Text>
                <Button 
                title="Close" 
                color={'#0B3954'}
                onPress={toggleRaspiModal} />
              </View>
            </View>
          </Modal>
          {/* Turbidity Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isTurbModalVisible}
            onRequestClose={toggleTurbModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={turbidity} style={styles.modalIcon} />
                <Text style={styles.modalText}>Turbidity Sensor</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.modalInfoText}>
                  Turbidity Sensor is an essential part of the system that determines how hazy or cloudy the water is.                
                </Text>
                <Text style={styles.modalInfoText}>
                  Tubidity sensor is detecting the presence of impurities. It is measured in Nephelometric Turbidity Units (NTU), and lower values, generally less than 1 NTU, are preferred for potable water, as higher turbidity can indicate contamination or water quality issues.
                </Text>
                <Button 
                title="Close" 
                color={'#0B3954'}
                onPress={toggleTurbModal} />
              </View>
            </View>
          </Modal>
          {/* pH Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={ispHModalVisible}
            onRequestClose={togglepHModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={ph} style={styles.modalIcon} />
                <Text style={styles.modalText}>pH Sensor</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.modalInfoText}>
                  pH Sensor is used for measuring the acidity or alkalinity of water based on its pH level. It is essential for identifying the water's chemical characteristics and making sure it is both safe and pleasant to drink.
                </Text>
                <Text style={styles.modalInfoText}>
                  Water's pH normally ranges from 0 (very acidic) to 14 (very alkaline), with a neutral pH of 7 being ideal for drinking water. If the pH is not between 6.5 and 8.5, there may be possible problems with the quality of the water. 
                </Text>
                <Button 
                title="Close" 
                color={'#0B3954'}
                onPress={togglepHModal} />
              </View>
            </View>
          </Modal>
          {/* Solenoid Valve Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isValveModalVisible}
            onRequestClose={toggleValveModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={valve} style={styles.modalIcon} />
                <Text style={styles.modalText}>Solenoid Valve</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.modalInfoText}>
                  Solenoid Valves are control devices that can either open or close a fluid flow when electrically activated or deactivated. 
                </Text>
                <Text style={styles.modalInfoText}>
                  It is a crucial component in water quality management as it will control the flow of water when the sensors detect an anomaly. Specifically, the system is designed by default to open the solenoid valve. When the measured water parameters isn't within the standard maximum allowable range, the solenoid valve will automatically shut off.
                </Text>
                <Button 
                title="Close" 
                color={'#0B3954'}
                onPress={toggleValveModal} />
              </View>
            </View>
          </Modal>
          {/* Mobile Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isMobileModalVisible}
            onRequestClose={toggleMobileModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={mobile} style={styles.modalIcon} />
                <Text style={styles.modalText}>Mobile Application</Text>
                <View style={styles.horizontalLine} />
                <Text style={styles.modalInfoText}>
                  Mobile Application is used to provide users with detailed monitoring for the quality of drinking water. It is developed using React Native Framework for its scalability and flexibility.
                </Text>
                <Text style={styles.modalInfoText}>
                  The main purpose of the Mobile App here is to display the output of the detected parameters as well as display their predicted values. In addition to this, the mobile app can also be used to remotely control the solenoid valve.
                </Text>
                <Button 
                title="Close" 
                color={'#255C99'}
                onPress={toggleMobileModal} />
              </View>
            </View>
          </Modal>
      </View>
      <SidebarMenu isVisible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#255C99', 
    justifyContent: 'space-between',
  },
  fillOut: {
    flex: 1,
    position: 'absolute', 
    top: 0, 
    bottom: 0,
    left: '3%',
    right: '3%',
  },
  sidebarIconContainer: {
    position: "absolute",
    top: 10,
    right: 8,
  },
  sidebarIcon: {
    width: 30,
    height: 30,
  },
  compContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 50,
  },
  compDescription: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7EA3CC',
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingTop: 17,
    paddingBottom: 17,
    marginBottom: 20,
    borderColor: 'black',
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  icon1: {
    width: 20,
    height: 20,
    marginLeft: 100,
  },
  icon2: {
    width: 20,
    height: 20,
    marginLeft: 71,
  },
  icon3: {
    width: 20,
    height: 20,
    marginLeft: 116,
  },
  icon4: {
    width: 20,
    height: 20,
    marginLeft: 85,
  },
  icon5: {
    width: 20,
    height: 20,
    marginLeft: 56,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10, 
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  modalIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  horizontalLine: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  modalInfoText: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
});

export default DeviceScreen;
