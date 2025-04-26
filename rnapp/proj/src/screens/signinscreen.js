import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import { Text, Input, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

const signinscreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signin } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        Sign in to your account
      </Text>
      <Spacer />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Enter your email"
        leftIcon={<FontAwesome name="envelope" size={24} color="#3498db" />}
      />
      <Input
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholder="Enter your password"
        leftIcon={<FontAwesome name="lock" size={24} color="#3498db" />}
      />
      <Spacer />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Button
        title="Sign in"
        onPress={() => signin({ email, password })}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
      <Spacer />
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text style={styles.link}>
          Don't have an account?{" "}
          <Text style={styles.linkText}>Sign up instead!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

signinscreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: 30,
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
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  link: {
    textAlign: "center",
    color: "#555",
    marginTop: 15,
  },
  linkText: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default signinscreen;
