import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, db } from "../../firebase";
import detailsstyle from "./detailsstyle";
import { useFonts } from "expo-font";

function Details({ item, route }) {
  const [post, setPost] = useState(null);
  const [postcomment, setPostcomment] = useState([]);
  const [comment, setComment] = useState(null);
  useEffect(() => {
    getdetails();
    getcomment();
  }, [getcomment]);
  const getdetails = async () => {
    const docRef = doc(db, "posts", route.params.item.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setPost(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      alert("no");
    }
  };
  const getcomment = async () => {
    const findcomment = collection(db, "comment");
    const allcomment = query(
      findcomment,
      where("post_id", "==", route.params.item.id)
    );
    const querySnapshot = await getDocs(allcomment);
    let allc = [];
    querySnapshot.forEach((doc) => {
      allc.push({ id: doc.id, ...doc.data() });
    });
    setPostcomment(allc);
    //the end
  };
  //comment
  const addcomment = async () => {
    //  alert('cl')
    if (comment) {
      await addDoc(collection(db, "comment"), {
        comment,
        post_id: route.params.item.id,
        name: auth.currentUser.displayName,
        profile: auth.currentUser.photoURL,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          alert("success");
          //navigation.goBack();
          //  alert('seucce')
          //navigation.navigate("Home");
          setComment("");
        })
        .catch((error) => alert(error));
    } else {
      //alert('no comment')
    }
  };
  //the end
  const [fontsLoaded] = useFonts({
    // "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-Black": require("../../assets/fonts/Roboto-BoldItalic.ttf"),
    //Roboto-BoldItalic.ttf
  });
  return (
    <ScrollView style={detailsstyle.detailsview}>
      <View>
        <View>
          <Image style={detailsstyle.image} source={{ uri: post?.getimage }} />
        </View>
        <View>
          <Text> {post?.caption} </Text>
          {postcomment.map((items) => (
            <View style={detailsstyle.commentholder}>
              <View style={detailsstyle.commentuserview}>
                <Image
                  style={detailsstyle.myprofile}
                  source={{ uri: items?.profile }}
                />
                <Text style={detailsstyle.nametextuser}>{items.name}</Text>
              </View>
              <View style={detailsstyle.commentview}>
                <Text style={detailsstyle.commenttext}>{items.comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <KeyboardAvoidingView>
        <View style={detailsstyle.commentinputview}>
          <TextInput
            style={detailsstyle.commentinput}
            placeholder="comment"
            value={comment}
            onChangeText={(comment) => setComment(comment)}
          />
          <Pressable onPress={addcomment}>
            <Text style={detailsstyle.text}>Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Details;
