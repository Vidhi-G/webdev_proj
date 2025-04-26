import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Button, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext"; // Import AuthContext
import moment from "moment"; // Import moment for timestamp formatting

const RequestDetailScreen = ({ navigation }) => {
  const request = navigation.getParam("request");
  const { state, getReplies } = useContext(AuthContext);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (request && request._id) {
      fetchReplies();
    }
  }, [request]);

  const fetchReplies = async () => {
    await getReplies({ requestId: request._id });
  };

  useEffect(() => {
    // Update the local state when replies are fetched from the context
    if (state.replies) {
      setReplies(state.replies);
    }
  }, [state.replies]);

  if (!request) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No request details available.</Text>
      </View>
    );
  }

  const handleReply = () => {
    navigation.navigate("reply", { request: request });
  };

  const renderReplyItem = ({ item }) => (
    <View style={styles.replyItem}>
      <View style={styles.replyHeader}>
        <Avatar
          rounded
          size="small"
          title={
            item.username ? item.username.substring(0, 2).toUpperCase() : "NA"
          }
          containerStyle={styles.avatar}
        />
        <View style={styles.replyInfo}>
          <Text style={styles.replyUsername}>
            {item.username || "Unknown User"}
          </Text>
          <Text style={styles.replyTimestamp}>
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
      <Text style={styles.replyText}>{item.replyText}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{request.title}</Card.Title>
        <Card.Divider />

        <Text style={styles.category}>
          Category:{" "}
          <Text style={styles.categoryHighlight}>{request.category}</Text>
        </Text>
        <Text style={styles.description}>{request.description}</Text>

        <Button
          title="Schedule a Live Session"
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ["#007bff", "#00c6ff"],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
          }}
          buttonStyle={styles.scheduleButton}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonText}
          onPress={() => console.log("Live session scheduled!")}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleReply}>
          <LinearGradient
            colors={["#007bff", "#00c6ff"]}
            style={[styles.button, styles.replyButton]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome
              name="reply"
              size={20}
              color="white"
              style={styles.replyIcon}
            />
            <Text style={styles.replyButtonText}>Reply to Query</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.repliesTitle}>Replies:</Text>
        <FlatList
          data={replies} // Use the local state 'replies'
          renderItem={renderReplyItem}
          keyExtractor={(item) => item._id}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f9",
    justifyContent: "center",
  },
  card: {
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  categoryHighlight: {
    fontWeight: "bold",
    color: "#007bff",
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
  },
  scheduleButton: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#5a6268",
    borderRadius: 8,
  },
  replyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  replyIcon: {
    marginRight: 5,
  },
  repliesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  replyItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 5,
  },
  replyText: {
    fontSize: 16,
    color: "#444",
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    marginRight: 10,
    backgroundColor: "#007bff",
  },
  replyInfo: {
    flexDirection: "column",
  },
  replyUsername: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  replyTimestamp: {
    fontSize: 12,
    color: "#777",
  },
});

export default RequestDetailScreen;
