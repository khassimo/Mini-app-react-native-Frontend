import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenue from "./HeaderMenue";
import Post from "../../screens/Post";
import Myposts from "../../screens/Myposts";
import About from "../../screens/About";
import Account from "../../screens/Account";

const ScreenMenu = () => {
  //Global stat
  const [state] = useContext(AuthContext);
  //condition true false
  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App R.N",
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
          <Stack.Screen
            name="Myposts"
            component={Myposts}
            options={{
              headerBackTitle: "Back",
              headerRight: () => <HeaderMenue />,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default ScreenMenu;
