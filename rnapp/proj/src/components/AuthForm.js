import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import { FontAwesome } from "@expo/vector-icons";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text h3 style={styles.header}>
        {headerText}
      </Text>
      <Spacer />
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Enter your name"
        leftIcon={<FontAwesome name="user" size={24} color="#3498db" />}
      />
      <Input
        label="Phone Number"
        value={phonenumber}
        onChangeText={setPhonenumber}
        keyboardType="phone-pad"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Enter your phone number"
        leftIcon={<FontAwesome name="phone" size={24} color="#3498db" />}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Enter your email"
        leftIcon={<FontAwesome name="envelope" size={24} color="#3498db" />}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Enter your password"
        leftIcon={<FontAwesome name="lock" size={24} color="#3498db" />}
      />
      <Spacer />
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ name, email, phonenumber, password })}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      <Spacer />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  inputStyle: {
    fontSize: 16,
    color: "#333",
  },
  labelStyle: {
    color: "#555",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default AuthForm;
