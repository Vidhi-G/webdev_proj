import React from "react";
import { View, Text, StyleSheet } from "react-native";

const notificationscreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.message}>No notifications yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9", // Optional: Background color
    padding: 20, // Optional: Add some padding
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Optional: Title color
  },
  message: {
    fontSize: 16,
    color: "#555", // Optional: Message color
  },
});

export default notificationscreen;
