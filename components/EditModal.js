import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ modalVisible, setModalVisible, post }) => {
  //   const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  //handle update
  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        description,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      alert("Error while updating post", error);
      console.log(error);
    }
  };

  //initial post data
  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
  }, [post]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text> {JSON.stringify(post, null, 4)} </Text> */}
              <Text style={styles.modalText}>Mettre a Jour </Text>
              <Text>Title</Text>
              <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <Text>Description</Text>
              <TextInput
                style={styles.inputBox}
                multiline={true}
                numberOfLines={4}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
              <View style={styles.btnCon}>
                <Pressable
                  style={[styles.button]}
                  onPress={() => {
                    handleUpdate(post && post._id);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}> Update</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    width: 100,
    margin: 10,
  },
  //   buttonOpen: {
  //     backgroundColor: "#F194FF",
  //   },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputBox: {
    height: 40,
    textAlignVertical: "top",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "gray",
    borderRadius: 10,
  },

  btnCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditModal;
