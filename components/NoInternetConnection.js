import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";

export default function NoInternetConnection() {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await NetInfo.fetch();
      setIsConnected(status.isConnected);
    };

    fetchStatus();

    const subscription = NetInfo.addEventListener((status) => {
      setIsConnected(status.isConnected);
    });

    return () => {
      subscription && subscription();
    };
  }, []);

  return (
    <Modal visible={isConnected === false} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <MaterialIcons name="wifi-off" size={24} color="white" />
          <Text style={styles.text}>You are currently offline</Text>
        </View>
      </View>
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
