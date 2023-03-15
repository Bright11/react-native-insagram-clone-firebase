import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import messagestyle from "./messagestyle";
import { ScrollView, TextInput } from "react-native";
import chatm from "./chat";

import { Ionicons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { async } from "@firebase/util";

const Message = ({ item, route, navigation }) => {
  const [input, setInput] = useState("");
  const [allmessage, setAllmessage] = useState([]);

  const sendmessage = async () => {
    if (input) {
      await addDoc(collection(db, "message"), {
        input,
        //post_id: item.id,
        name: auth.currentUser.displayName,
        sender: auth.currentUser.uid,
        profile: auth.currentUser.photoURL,
        reciever: route.params.item.postownner_id,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          //  alert("Sent");
          //navigation.goBack();
          setInput("");
        })
        .catch((error) => alert(error));

      //the end
    } else {
    }
  };
  //fetch data
  useEffect(() => {
    getmessage();
  }, [allmessage]);
  const getmessage = async () => {
    const findmessage = collection(db, "message");
    const allmessages = query(
      findmessage,
 orderBy("timestamp", "asc"),
      where("sender", "==", auth.currentUser.uid),
      where("reciever", "==", route.params.item.postownner_id),
     //desc
      //asc
    );
    const querySnapshot = await getDocs(allmessages);
    let allc = [];
    querySnapshot.forEach((doc) => {
      allc.push({ id: doc.id, ...doc.data() });
    });
    setAllmessage(allc);
    
  };
  console.log("new", allmessage);
  //the end
  return (
    <SafeAreaView style={messagestyle.container}>
      <ScrollView>
        {allmessage.map((m) => (
          <View>
            {m.sender === auth.currentUser.uid ? (
              <Text style={messagestyle.sender}>{m.input}</Text>
            ) : (
              <Text style={messagestyle.receiver}>{m.input}</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View>
        <KeyboardAvoidingView>
          <View style={messagestyle.senderview}>
            <TextInput
              style={messagestyle.messageinput}
              placeholder="Message"
              value={input}
              onChangeText={(input) => setInput(input)}
              onEndEditing={sendmessage}
            />
            <Pressable onPress={sendmessage} style={messagestyle.messageicon}>
              <Ionicons name="send-outline" size={24} color="white" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({});
