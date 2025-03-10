import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";

const About = () => {
    const { state } = useContext(AuthContext);    
  return (
    <View style={styles.container}>
    <Text>About</Text>
    
    <View style={{ flex:1 , justifyContent:"flex-end"}}> 
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
  marginTop :40,
},
});

export default About