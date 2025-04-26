import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";

const ReplyScreen = ({ route, navigation }) => {
  const { state, postReply, getuserdetails } = useContext(AuthContext);
  const request = navigation.getParam("request");
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Fetch user details when the component mounts
    getuserdetails();
  }, []);

  const handleSendReply = async () => {
    if (replyText.trim() === "") {
      Alert.alert("Error", "Reply cannot be empty.");
      return;
    }

    if (!state.userData || !state.userData._id) {
      console.error("User data not loaded or _id missing!");
      Alert.alert("Error", "User data not loaded. Please try again later.");
      return;
    }

    setLoading(true); // Start loading
    try {
      postReply({
        requestId: request._id,
        replyText: replyText,
        userId: state.userData._id,
      });
      console.log(request);
      Alert.alert("Success", "Reply sent!");
      navigation.goBack();
    } catch (error) {
      console.error("Error sending reply:", error);
      Alert.alert(
        "Error",
        "Failed to send reply. Please check your network connection."
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Replying to: {request.title}</Text>
          <Text style={styles.category}>Category: {request.category}</Text>
          <Text style={styles.description}>
            Description: {request.description}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your reply here..."
              multiline={true}
              value={replyText}
              onChangeText={setReplyText}
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              loading ? styles.sendButtonDisabled : null,
            ]}
            onPress={handleSendReply}
            disabled={loading} // Disable the button while loading
          >
            <View style={styles.sendButtonContent}>
              <FontAwesome
                name="send"
                size={20}
                color="white"
                style={styles.sendIcon}
              />
              <Text style={styles.sendButtonText}>
                {loading ? "Sending..." : "Send Reply"}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    fontSize: 18,
    padding: 15,
    minHeight: 120,
    color: "#444",
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  sendButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  sendIcon: {
    marginRight: 5,
  },
  sendButtonDisabled: {
    backgroundColor: "#cccccc", // Or any other color to indicate it's disabled
  },
});

export default ReplyScreen;
