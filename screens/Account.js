import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  //global state
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState(user?.password || "");
  const [email] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  //handle update user data

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "user/update-user",
        {
          name,
          password,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token && token}`,
          },
        }
      );

     
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD.updatedUser });
      alert(data && data.message);
      console.error("bien Modifier");
    } catch (error) {
      setLoading(false);
      const email = user?.email || "";
      const password = user?.password || "";

      console.error("Une erreur cest produite d: ", password);
      alert(data && data.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=ejx13G9ZroRrcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-young-user-icon-2400.png&ehk=NNF6zZUBr0n5i%2fx0Bh3AMRDRDrzslPXB0ANabkkPyv0%3d&risl=&pid=ImgRaw&r=0",
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.warningText}>
            Currently You Can Only Update Your Name and Password
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Name</Text>
            <TextInput
              value={name}
              style={styles.inputbox}
              onChange={(text) => setName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Email</Text>
            <TextInput value={email} style={styles.inputbox} editable={false} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Password</Text>
            <TextInput
              value={password}
              style={styles.inputbox}
              onChange={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Role</Text>
            <TextInput
              value={state?.user.role}
              style={styles.inputbox}
              editable={false}
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={styles.btnUp} onPress={handleUpdate}>
              <Text style={styles.btnText}>Profile Update</Text>
            </TouchableOpacity>
          </View>
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
  c: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  warningText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  inputText: {
    color: "gray",
    borderColor: "red",
    fontWeight: "bold",
    width: 70,
  },
  inputbox: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    width: 250,
    marginLeft: 10,
    padding: 10,
    fontSize: 16,
    paddingLeft: 20,
  },
  btnUp: {
    backgroundColor: "#000000",
    width: 200,
    height: 40,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    color: "white",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Account;
