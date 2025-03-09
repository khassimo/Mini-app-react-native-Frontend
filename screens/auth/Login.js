import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = ({ navigation }) => {
  //global state
  const [state, setState] = useContext(AuthContext);
  // les varivale state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //function
  //btn function Handlebutton
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "/user/login",
        { email, password }
      );
  
      setState(data);

      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert("alert message", data && data.message);
      navigation.navigate("Home"); // dirige vers home
      console.log("Login data =====> ", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };
  //temp funciotn to check local storage data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("data =====> ", data);
  };

  getLocalStorageData();

  return (
    <View style={styles.container}>
      <Text style={styles.pageTite}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          placeholder="Entrez votre Email"
          autoComplete="email"
          keyboardType={"email-address"}
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={"Password"}
          placeholder="Entrez votre Mot de passe"
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassword}
        />
        {/* <Text> {JSON.stringify({name,email,password} ,null ,4)} </Text> */}
        <SubmitButton
          btnText="Login"
          loading={loading}
          handleSubmit={handleSubmit}
        />

        <Text style={styles.linkText}>
          create account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            REGISTER
          </Text>{" "}
          {""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1d5c9",
    justifyContent: "center",
  },
  pageTite: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    color: "#333",
    alignContent: "center",
    textAlign: "center",
  },
  linkText: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
  },
  link: {
    color: "red",
  },
});
export default Login;
