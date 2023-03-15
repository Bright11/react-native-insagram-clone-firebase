import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/login/Register";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainScreen from "./screens/navigation/MainScreen";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Search from "./screens/search/Search";
import { auth } from "./firebase";
import Profile from "./screens/profile/Profile";
import { Image, Text, View } from "react-native";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import Login from "./screens/login/Login";

export default function App({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();
  const [secure, setSecure] = useState("login");

  useEffect(() => {
    checkuser();
  }, []);
  const checkuser = () => {
    onAuthStateChanged(auth, (user) => {
      setSecure("Home");
      if (user) {
        //setSecure(true);
        //alert('yes')
        const uid = user.uid;
      } else {
        navigation.navigate("login");
      }
    });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteNames="login"
        // initialRouteName="main"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "#FFFFF7" }}
      >
        <Tab.Screen
          name="main"
          component={MainScreen}
          options={{
            tabBarLabel: "main",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color="blue" size={26} />
            ),
          }}
          logout={logout}
          navigation={navigation}
        />
        <Tab.Screen
          name="search"
          component={Search}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ blue }) => (
              <FontAwesome name="search" size={24} color="blue" />
            ),
          }}
          navigation={navigation}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: "",
            tabBarIcon: (Image) => (
              <FontAwesome name="user" size={24} color="blue" />
            ),
          }}
          navigation={navigation}
          logout={logout}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
