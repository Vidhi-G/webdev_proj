import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Button, Text, Card, SearchBar } from "react-native-elements";
import { Context } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { state, getrequests } = useContext(Context);
  const { allrequests } = state;
  const [search, setSearch] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getrequests();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allrequests) {
      setFilteredRequests(allrequests);
    }
  }, [allrequests]);

  const updateSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = allrequests.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredRequests(newData);
    } else {
      setFilteredRequests(allrequests);
    }
  };
  useEffect(() => {
    navigation.setParams({
      headerRight: (
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate("notifications")}
        >
          <FontAwesome name="bell" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      <View style={styles.container}>
        <SearchBar
          placeholder="Search Requests..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor="#888"
        />
        <Button
          title="Create New Request"
          onPress={() => navigation.navigate("createrequest")}
          buttonStyle={styles.createButton}
          titleStyle={styles.createButtonText}
          icon={
            <FontAwesome
              name="plus"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
        />
        <FlatList
          data={filteredRequests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
              <Card.Divider />
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Button
                title="View Details"
                onPress={() =>
                  navigation.navigate("requestdetail", { request: item })
                }
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
              />
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  searchInput: {
    color: "#333",
  },
  createButton: {
    backgroundColor: "#3498db",
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 18,
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 22,
    color: "#333",
  },
  category: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: "#444",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#27ae60",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  notificationButton: {
    backgroundColor: "transparent", // Make the background transparent
    borderRadius: 20,
    padding: 10,
  },
});

export default HomeScreen;
