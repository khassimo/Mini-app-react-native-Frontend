import { View, Text, StyleSheet, ScrollView } from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "@/components/PostCard";

const MyPost = () => {
  // const [state] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //get user posts
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);

      setPosts(data?.userPosts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //initial
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true} />

        {/* <Text> {JSON.stringify(posts , null , 4)} </Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
export default MyPost;
