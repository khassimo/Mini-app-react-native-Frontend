import { View, Text, TextInput, StyleSheet ,keyboardType } from "react-native";
import React from "react";

const InputBox = ({ inputTitle,autoComplete,placeholder,secureTextEntry=false,value,setValue,keyboardType="default" }) => {
  return (
    <View>
      <Text>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
    Shadow: "5px 10px 25px 25px rgba(0, 0, 0, 0.1)",
  },
});
export default InputBox;
