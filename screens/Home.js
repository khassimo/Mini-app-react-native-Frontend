import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { PostContext } from "../context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { ScrollView } from "react-native";
import PostCard from "../components/PostCard";

const Home = () => {
  //global state
  // const [state] = useContext(AuthContext);
  const [posts] = useContext(PostContext);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts}/>
      </ScrollView>
      <View style={{ backgroundColor:"#ffffff" }} ><FooterMenu /></View>
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

export default Home;
