import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//constext
const AuthContext = createContext();
//provider
const AuthProvider = ({ children }) => {
  //global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // initial lacal storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: data?.user, token: loginData?.token });
    };
    loadLocalStorageData();
  }, []);

  let token =state && state?.token;
  //default axios
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  axios.defaults.baseURL = "http://192.168.1.96:8080/api/v1";

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
