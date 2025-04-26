import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button, Text, Input, Avatar } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";

const AccountScreen = () => {
  const { state, signout, getuserdetails } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getuserdetails();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (state.userData) {
      setName(state.userData.name);
      setEmail(state.userData.email);
      setPhonenumber(state.userData.phonenumber);
    }
  }, [state.userData]);

  const handleSave = () => {
    // Simulate saving the data
    setMessage("Profile updated successfully!");
    setTimeout(() => {
      setMessage(""); // Clear message after 3 seconds
    }, 3000);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          rounded
          size="xlarge"
          icon={{ name: "user", type: "font-awesome" }}
          containerStyle={styles.avatar}
        />

        <Text h4 style={styles.label}>
          Account Details
        </Text>

        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          leftIcon={<AntDesign name="user" size={24} color="gray" />}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          leftIcon={<AntDesign name="mail" size={24} color="gray" />}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
        />

        <Input
          label="Phone Number"
          value={phonenumber}
          onChangeText={setPhonenumber}
          keyboardType="phone-pad"
          leftIcon={<AntDesign name="phone" size={24} color="gray" />}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
        />

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <Button
          title="Save Changes"
          onPress={handleSave}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />

        <Button
          title="Sign Out"
          onPress={signout}
          buttonStyle={styles.signOutButton}
          titleStyle={styles.signOutButtonTitle}
          containerStyle={styles.buttonContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    paddingBottom: 40,
  },
  avatar: {
    marginBottom: 20,
    backgroundColor: "#ddd",
  },
  label: {
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  message: {
    textAlign: "center",
    color: "green",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
  },
  signOutButton: {
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 8,
  },
  buttonTitle: {
    fontSize: 18,
    color: "#fff",
  },
  signOutButtonTitle: {
    fontSize: 18,
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputStyle: {
    fontSize: 16,
    color: "#333",
  },
  labelStyle: {
    color: "#555",
    marginBottom: 5,
    fontSize: 16,
  },
});

export default AccountScreen;
