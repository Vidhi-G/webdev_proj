import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Text } from "react-native-elements";
import { Context } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const CreateRequestScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const { postrequest } = useContext(Context);

  const handleSubmit = () => {
    if (!title || !description || !category) {
      setError("All fields are required.");
      return;
    }
    postrequest({ title, description, category });
    setError("");
    setTitle("");
    setDescription("");
    setCategory("");
    navigation.navigate("homeflow"); // Navigate back to the previous screen after posting
  };

  const handleScheduleSession = () => {
    navigation.navigate("ScheduleSession");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text h4 style={styles.label}>
          Post Your Technical Query
        </Text>

        <Input
          label="Title"
          placeholder="Enter your query title"
          value={title}
          onChangeText={setTitle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          leftIcon={<FontAwesome name="header" size={24} color="#3498db" />}
        />

        <Input
          label="Description"
          placeholder="Describe your query in detail"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          leftIcon={
            <FontAwesome name="info-circle" size={24} color="#3498db" />
          }
        />

        <Input
          label="Category"
          placeholder="E.g., DSA, Web Development"
          value={category}
          onChangeText={setCategory}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          leftIcon={<FontAwesome name="list" size={24} color="#3498db" />}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title="Post Request"
          onPress={handleSubmit}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          containerStyle={styles.buttonContainer}
          icon={
            <FontAwesome
              name="paper-plane"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Button
          title="Schedule a Live Session"
          onPress={handleScheduleSession}
          buttonStyle={styles.scheduleButton}
          titleStyle={styles.buttonText}
          containerStyle={styles.buttonContainer}
          icon={
            <FontAwesome
              name="calendar"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-start",
  },
  label: {
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
  inputStyle: {
    fontSize: 16,
    color: "#333",
  },
  labelStyle: {
    color: "#555",
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
  },
  scheduleButton: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default CreateRequestScreen;
