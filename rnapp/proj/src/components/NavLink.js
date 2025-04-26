import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";
const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({ link: { color: "blue" } });
export default withNavigation(NavLink);
