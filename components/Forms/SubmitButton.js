import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({handleSubmit , btnText , loading}) => {
  return (
    <TouchableOpacity
      style={styles.SubmitButton}
      onPress={handleSubmit}
    >
      <Text style={styles.btnText}>{ loading ? "Please Wait..." : btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  SubmitButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 80,
    height: 60,
    marginHorizontal: 25,
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: "blue",

  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",

  },
});

export default SubmitButton;
