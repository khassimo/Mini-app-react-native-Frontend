import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
  // les variables state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  //function
  //btn function Handlebutton
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register data =====> ", { name, email, password });
    } catch (error) {
      alert("Something went wrong " + error.response.data.message);
      setLoading(false);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTite}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Name"}
          placeholder="Entrez votre Nom"
          autoComplete={"email"}
          keyboardType={"email-address"}
          value={name}
          setValue={setName}
        />
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
          keyboardType={"email-address"}
          value={password}
          setValue={setPassword}
        />
        {/* <Text> {JSON.stringify({name,email,password} ,null ,4)} </Text> */}
        <SubmitButton
          btnText="Register"
          loading={loading}
          handleSubmit={handleSubmit}
        />

        <Text style={styles.linkText}>
          Already have an account? {""}{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Login
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

export default Register;
