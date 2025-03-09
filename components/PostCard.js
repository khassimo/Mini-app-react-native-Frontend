import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});

  //delete post
  const hand = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => handleDelete(id),
      },
    ]);
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      Alert.alert(data?.message);
      setLoading(false);
      navigation.push("Myposts");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong", error);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts &&
        posts.map((post, i) => (
          <View style={styles.cards} key={i}>
            {myPostScreen && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ marginHorizontal: 20 }}>
                  <FontAwesome5
                    name="pen"
                    color={"darkblue"}
                    size={16}
                    onPress={() => {
                      setPost(post), setModalVisible(true);
                    }}
                  />{" "}
                </Text>

                <Text style={{ textAlign: "right" }}>
                  <FontAwesome5
                    name="trash"
                    color={"red"}
                    size={16}
                    onPress={() => hand(post?._id)}
                  />{" "}
                </Text>
              </View>
            )}
            <Text style={styles.title}> Titre : {post.title}</Text>
            <Text style={styles.hr}></Text>
            <Text style={styles.description}>{post?.description}</Text>
            <View style={styles.footer}>
              {post?.postedBy?.name && (
                <Text style={styles.postedBy}>
                  <FontAwesome5 name="user" color={"orange"} />{" "}
                  {post?.postedBy?.name}
                </Text>
              )}

              <Text>
                {" "}
                <FontAwesome5 name="clock" color={"orange"} />{" "}
                {moment(post?.createdAt).format("DD:MM:YYYY")}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
  cards: {
    width: "95%",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  description: {
    color: "black",
    margin: 12,
  },
  postedBy: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  footer: {
    width: "97%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  hr: { borderTopWidth: 0.3 },
});

export default PostCard;
