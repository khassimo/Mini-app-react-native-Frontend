import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenue = () => {
  const [state, setState] = useContext(AuthContext);
  //logout function
  const handleLogout =async () => {
    setState({ user: null, token: "" });
    await AsyncStorage.removeItem("@auth");
    alert("Logout Successfully");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" color={"red"} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    // borderTopWidth: 1,
    // borderTopColor: "black",
    paddingTop: 10,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});
export default HeaderMenue;