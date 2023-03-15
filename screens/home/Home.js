import { StatusBar } from "expo-status-bar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase";
import FeedScreen from "../feeds/FeedScreen";
import Status from "../status/Status";
import Topbar from "../topbar/Topbar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
function Home({ navigation }) {
  const Stack = createNativeStackNavigator();

  const [instanusers, setInstanusers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: false,
    });
  });

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        let mydata = [];
        snapshot.docs.forEach((doc) => {
          mydata.push({ id: doc.id, ...doc.data() });
        });
        setInstanusers(mydata);
      },
      (error) => {
        alert(error);
      }
    );

    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Topbar navigation={navigation} />
      </View>
      <View>
        <Status />
      </View>
      <View style={{ flex: 1 }}>
        <FeedScreen navigation={navigation} instanusers={instanusers} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default Home;
