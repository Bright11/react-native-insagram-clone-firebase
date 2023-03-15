import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "../home/Home";
import Details from "./../details/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SaveScreen from "./../camera/SaveScreen";
import Getcamera from "./../camera/Getcamera";
import Uploadprofilepic from "./../login/Uploadprofilepic";
import CompleteRegister from "./../login/CompleteRegister";
import Message from "../message/Message";
import { Title } from "react-native-paper";
import { useLayoutEffect } from "react";
import Profile from "../profile/Profile";
import Login from "../login/Login";
import Register from "../login/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
//import SaveProfileimg from "../login/SaveProfileimg";

const MainScreen = ({ navigation, logout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const Stack = createNativeStackNavigator();

  useLayoutEffect(() => {}, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="completeregister" component={CompleteRegister} />
      <Stack.Screen
        name="profilepicture"
        component={Uploadprofilepic}
        navigation={navigation}
      />

      {/* <Stack.Screen name="register" component={Register} /> */}
      <Stack.Screen name="save" component={SaveScreen} />
      <Stack.Screen name="details" component={Details} />
      <Stack.Screen name="addfeed" component={Getcamera} />
      <Stack.Screen
        name="message"
        component={Message}
        navigation={navigation}
      />

      <Stack.Screen
        name="register"
        component={Register}
        navigation={navigation}
      />
      <Stack.Screen
        name="login"
        component={Login}
        navigation={navigation}
        options={{
          title: "Instagram Login",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default MainScreen;
