import React, { Component } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { auth, db, storage } from "../../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

function SaveScreen({image,navigation,route}) {
  const [caption, setCaption] = useState("");
  //console.log("mysave", props.route.params.image);
  // const getprofileimage = route.params.image;
  const [getimage, setGetimage] = useState("");
  const [progress, setProgress] = useState(null);
  const [checkupload, setCheckupload] = useState("Upload Profile");
   const uri = route.params.image;
  const uploadimage = async () => {
   
    setCheckupload("Please wait, Upload in Progress");
    const childPath = `post/${
      //    auth().currentUser.uid
      auth.currentUser.uid
    }/Math.random().toString(36)`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, childPath);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setCheckupload("Upload is running, wait");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        const see = getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setGetimage(downloadURL);
          }
        );
      }
    );

    //the end
  };
  //sevedata
  const savepostData = async (downloadURL) => {
    await addDoc(collection(db, "posts"), {
      caption,
      getimage,
      liks: 0,
      unlike: 0,
      name: auth.currentUser.displayName,
      postownner_id: auth.currentUser.uid,
      profile: auth.currentUser.photoURL,
      //photoURL
      timestamp: serverTimestamp(),
    })
      .then(() => {
        //navigation.goBack();
        //  alert('seucce')
        navigation.navigate("Home");
      })
      .catch((error) => alert(error));
  };
  //the end
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <Image source={{ uri: props.route.params.image }} /> */}
        <Image source={{ uri: route.params.image }} />

        <TextInput
          style={styles.caption}
          placeholder="Write A Caption"
          onChangeText={(caption) => setCaption(caption)}
        />

        {getimage ? (
          <Button title="Add to instagram" onPress={savepostData} />
        ) : (
          <Button title={checkupload} onPress={() => uploadimage()} />
        )}

        {/* <Button title="send data" onPress={  savepostData}/> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  caption: {
    fontSize: 20,
    padding:20,
  },
});
export default SaveScreen;
