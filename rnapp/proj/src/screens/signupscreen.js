import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import { Text } from "react-native-elements";

const signupscreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <TouchableOpacity onPress={() => navigation.navigate("signin")}>
        <Text style={styles.link}>
          Already have an account?{" "}
          <Text style={styles.linkText}>Sign in instead!</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

signupscreen.navigationOptions = () => {
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

export default signupscreen;
