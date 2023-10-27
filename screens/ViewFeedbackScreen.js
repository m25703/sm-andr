import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"; 
import { UserType } from "../UserContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data !== null) {
        setIsLoggedIn(JSON.parse(data)); 
      }
      const user = await AsyncStorage.getItem('userInfo');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);
  const { userId, setUserId } = useState("test2");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://10.196.118.102:3000/get-posts");
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  console.log("posts", posts);

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://10.196.118.102:3000/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;

      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://10.196.118.102:3000/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      // Update the posts array with the updated post
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      console.log("updated ",updatedPosts)
    
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  
  return (
    <ScrollView style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
     
      <View style={{ marginTop: 20 }}>
        {posts?.map((post) => (
          <View
            style={{
              padding: 15,
              borderColor: "#D0D0D0",
              borderTopWidth: 1,
              flexDirection: "row",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "contain",
                }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                }}
              />
            </View>

            <View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
              >
                {post?.user?.name}
              </Text>
              <Text>{post?.content}</Text>

              
                {post?.likes?.includes(userId) ? (
                  <AntDesign
                    onPress={() => handleDislike(post?._id)}
                    name="heart"
                    size={18}
                    color="red"
                  />
                ) : (
                  <AntDesign
                    onPress={() => handleLike(post?._id)}
                    name="hearto"
                    size={18}
                    color="black"
                  />
                )}
                <Text>
                {post?.likes?.length} likes
              </Text>
              </View>

              
            </View>
          
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
