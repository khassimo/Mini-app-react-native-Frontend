import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PostContext } from "@/context/postContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

const Post = ({ navigation }) => {
  //global state
  const [posts,setPosts] = useContext(PostContext);
  // lacal state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  //handle form datsa post daea
  const handlePost = async () => {
    try {
      setloading(true);
      if (!title || !description) {
        alert("please fill all fields");
        setloading(false);
        return;
      } //dsklfjdl

      const { data } = await axios.post("post/create-post/", {
        title,
        description,
      });
      setloading(false);
      setPosts([...posts , data?.post])
      alert(data && data?.message);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error, "Une erreur est survenie");
      console.log(error.response.data.message);
      alert(error.response.data.message);
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>create a post </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="ajouter description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.btnTouch} onPress={handlePost}>
            <Text style={styles.textBtn}>
              <FontAwesome5 name="plus-square" size={20} color="white" /> {"  "}
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: "auto",
    padding: 10,
    marginTop: 30,
    borderRadius: 15,
    width: 350,
    fontSize: 20,
    backgroundColor: "#ffffff",
  },
  btnTouch: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 20,
    width: 320,
    fontSize: 20,

    textAlign: "center",
    marginTop: 20,
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Post;
