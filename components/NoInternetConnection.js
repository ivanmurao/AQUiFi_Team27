import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";

export default function NoInternetConnection() {
  const [isConnected, setIsConnected] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let wasDisconnected = false;

    const subscription = NetInfo.addEventListener((status) => {
      if (!status.isConnected && !wasDisconnected) {
        // The internet connection has just been lost.
        console.log("Internet connection is lost");
        setIsConnected(false);
        setIsModalVisible(true);
        wasDisconnected = true;
        setTimeout(() => {
          setIsModalVisible(false);
        }, 3000);
      } else if (status.isConnected && wasDisconnected) {
        // The internet connection has just been restored.
        console.log("Internet connection is restored");
        setIsModalVisible(true);
        setIsConnected(true);
        wasDisconnected = false;
        setTimeout(() => {
          setIsModalVisible(false);
        }, 3000);
      }
    });

    return () => {
      subscription();
    };
  }, []);

  return (
    <Modal visible={isModalVisible} transparent={true}>
      <Pressable
        style={styles.modalContainer}
        onPress={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.container}>
          {isConnected ? (
            <>
              <MaterialIcons name="wifi" size={24} color="white" />
              <Text style={styles.text}>
                Your internet connection was restored
              </Text>
            </>
          ) : (
            <>
              <MaterialIcons name="wifi-off" size={24} color="white" />
              <Text style={styles.text}>You are currently offline</Text>
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: "flex-end" },
  container: {
    backgroundColor: "#36454F",
    marginBottom: "15%",
    marginHorizontal: "5%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: { color: "white", fontSize: 16 },
});
