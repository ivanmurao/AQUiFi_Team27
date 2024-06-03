import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import ContainerBG from "@assets/images/background-container.png";
import agreement from "@assets/images/icons/agreement.png";

const TermScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <ImageBackground source={ContainerBG} style={styles.containerBG} />
        <View style={styles.accent}>
          <Text style={styles.title}>Terms of Agreement</Text>
        </View>
      </View>

      <ScrollView style={styles.fillOut}>
        <Image source={agreement} style={styles.agreementLogo} />
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionContent}>
          Welcome to the smart control system for managing the quality of
          alkaline water in water refilling stations. Our system aims to
          revolutionize the way water quality is managed, ensuring that
          customers receive alkaline water of the highest standard. By combining
          advanced hardware components, a deep learning forecasting model, and a
          user-friendly mobile application, we provide a comprehensive solution
          for real-time monitoring and management of alkaline water quality.
        </Text>

        <Text style={styles.sectionTitle}>User Representation</Text>
        <Text style={styles.sectionContent}>
          As a user of our smart control system, you are represented as someone
          who values the quality and purity of alkaline water. You entrust our
          system to ensure that the water supplied to you meets the highest
          standards of quality and safety. Your input and feedback are vital in
          helping us continuously improve and optimize our system to better
          serve your needs and expectations.
        </Text>

        <Text style={styles.sectionTitle}>Subscription and Services</Text>
        <Text style={styles.sectionContent}>
          Our subscription-based service offers you access to the full suite of
          features and functionalities of our smart control system. Upon
          subscribing, you gain real-time access to water quality data,
          predictive insights, and control capabilities through our intuitive
          mobile application. Our service includes:{"\n\n"}• Continuous
          monitoring of alkaline water quality in real-time.{"\n"}• Predictive
          insights provided by our deep learning forecasting model.{"\n"}•
          Control options for managing the water flow and valve operation.{"\n"}
          • Ongoing technical support and updates to ensure optimal performance
          of the system.
        </Text>

        <Text style={styles.sectionTitle}>Liability and Disclaimers</Text>
        <Text style={styles.sectionContent}>
          While we strive to provide accurate and reliable water quality
          information, it's important to note that our system operates based on
          data gathered from sensors and predictions made by our deep learning
          model. Therefore, we cannot guarantee the absolute accuracy or
          reliability of the information provided. Additionally, our system is
          designed to assist in managing water quality but cannot replace the
          expertise of water quality professionals or regulatory compliance
          measures. Users are advised to exercise caution and judgment when
          interpreting the data provided by our system and to consult relevant
          authorities for specific water quality concerns or issues.
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
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    top: 0,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "5%",
    bottom: "2%",
    left: "5%",
    right: "5%",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 30,
  },
  agreementLogo: {
    alignSelf: "center",
    height: 200,
    width: 250,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "justify",
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "justify",
  },
});

export default TermScreen;
