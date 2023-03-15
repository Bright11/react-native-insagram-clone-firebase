import React from "react";
import {
  Alert,
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    //alert('hi')
    if (email || password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          // console.log(user)
          navigation.navigate("profilepicture");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          //alert(error);
          // ..
        });
    } else {
      Alert.alert("Warning","Don't submit emty form")
   }
  };
  return (
    <SafeAreaView style={styles.registersafarea}>
      <StatusBar
        backgroundColor="#B91B49"
        barStyle="white"
        // hidden={false}
      />
      <View style={styles.registerview}>
        {/* <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(name) => setName(name)}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Pressable style={styles.registerpresee}>
          <Text style={styles.registertext} onPress={register}>
            Register
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  registersafarea: {
    flex: 1,
    backgroundColor: "#B91B49",
    padding: 30,
  },
  registerview: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    padding: 8,
    backgroundColor: "#1E1F1D",
    elevation: 30,
  },
  input: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "gray",
    marginTop: 10,
    marginBottom: 10,
    elevation: 80,
  },
  registerpresee: {
    backgroundColor: "#9763B7",
    padding: 8,
  },
  registertext: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
export default Register;
