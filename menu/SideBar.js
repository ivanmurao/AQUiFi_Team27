// SidebarMenu.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated  } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import sidebarLogo from "../assets/sidebarIcon.png";
import aboutus from '../assets/aboutus.png';
import toc from '../assets/toc.png';
import faqs from '../assets/faqs.png';
import exit from '../assets/exit.png';

const SidebarMenu = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  const goToAboutUsScreen = () => {
    navigation.navigate("AboutUsScreen");
  };
  const goToTermScreen = () => {
    navigation.navigate("TermScreen");
  };
  const goToFaqScreen = () => {
    navigation.navigate("FaqScreen");
  };

  const slideAnim = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
    toValue: isVisible ? -10 : -400, 
    duration: 500, 
    useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Image source={sidebarLogo} style={styles.sidebarLogo} />

      <TouchableOpacity style={styles.sidebarItem} onPress={goToAboutUsScreen}>
        <Image source={aboutus} style={styles.sbicon} />
        <Text style={styles.sidebarItemText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={goToTermScreen}>
        <Image source={toc} style={styles.sbicon} />
        <Text style={styles.sidebarItemText}>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarItem} onPress={goToFaqScreen}>
        <Image source={faqs} style={styles.sbicon} />
        <Text style={styles.sidebarItemText}>FAQs</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sidebarExit} onPress={onClose}>
        <Image source={exit} style={styles.sb1icon} />
        <Text style={styles.sidebarItemText}>Exit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        width: '85%', 
        zIndex: 1000,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: '#ccc',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
      },
      sidebarLogo: {
        width: 100,
        height: 110,
        marginBottom: 100,
      },
      sidebarItem: {
        paddingVertical: 20,
        width: '90%',
        borderBottomWidth: 2,
        marginBottom: 40,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        flexDirection: 'row',
      },
      sbicon: {
        width: 40,
        height: 40,
        marginLeft: 20,
        marginRight: 10,
      },
      sb1icon: {
        width: 40,
        height: 40,
      },
      sidebarItemText: {
        fontSize: 20,
      },
      sidebarExit: {
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 30,
      }
});

export default SidebarMenu;
