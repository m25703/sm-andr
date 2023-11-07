import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { UserType } from "../UserContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const GuestFeedbackScreen = () => {
  const { userId, setUserId } = useState("test2");
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);

  const [content, setContent] = useState("");

  const handlePostSubmit = () => {
    if (content.length === 0) return;

    const postData = {
      userId,
    };

    if (content) {
      postData.content = content;
    }

    axios
      .post("http://10.196.118.102:3000/create-post", postData)
      .then((response) => {
        setContent("");
      })
      .catch((error) => {
        console.log("error creating post", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor="black"
          placeholder="Enter your feedback..."
          multiline
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity
        style={styles.postButton}
        onPress={handlePostSubmit}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  textInput: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    alignSelf:"center"
  },
  postButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GuestFeedbackScreen;
