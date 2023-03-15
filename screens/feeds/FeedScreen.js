import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import feedstle from "./feedstyle";
import feeddata from "./feeddata";
import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useFonts } from "expo-font";

export default function FeedScreen({ navigation, instanusers }) {
  const [comment, setComment] = useState("");
  //const[cleartext,setCleartext]=useState('')
  const likspost = async (item) => {
    await updateDoc(doc(db, "posts", item.id), {
      liks: item.liks + 1,
      // timestamp: new Date(), //serverTimestamp(),
    });
  };
  //comment
  const postcomment = async (item) => {
    if (comment) {
      await addDoc(collection(db, "comment"), {
        comment,
        post_id: item.id,
        name: auth.currentUser.displayName,
        profile: auth.currentUser.photoURL,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          alert("success");
          //navigation.goBack();
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
    <View style={feedstle.feedcontaine}>
      <FlatList
        //     showsVerticalScrollIndicator={false}>
        // showsHorizontalScrollIndicator={false}
        // data={feeddata}
        data={instanusers}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("details", {
                item,
              })
            }
          >
            <View style={feedstle.feedview}>
              <View style={feedstle.feednameholder}>
                <Text style={feedstle.feedownner}>{item.caption}</Text>
                <Pressable>
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </Pressable>
              </View>
              {/* <Image style={feedstle.images} source={item.image}></Image> */}
              <Image
                style={feedstle.images}
                source={{ uri: item.getimage }}
              ></Image>
              <View style={feedstle.feedicons}>
                <View style={feedstle.feediconsthree}>
                  <Pressable
                    onPress={() => likspost(item)}
                    style={feedstle.feediconpressthree}
                  >
                    <AntDesign name="hearto" size={24} color="black" />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("message", {
                        item,
                      })
                    }
                    style={feedstle.feediconpressthree}
                  >
                    <Ionicons
                      name="ios-chatbubble-outline"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                  <Pressable style={feedstle.feediconpressthree}>
                    <FontAwesome5
                      name="telegram-plane"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                </View>
                <Pressable>
                  <Feather name="message-square" size={24} color="black" />
                </Pressable>
              </View>
              <View>
                <Text>{item.liks} Liks</Text>
              </View>
              <View style={feedstle.commentholder}>
                <Image
                  style={feedstle.feedlogo}
                  source={{ uri: auth.currentUser.photoURL }}
                />
                <View style={feedstle.commentview}>
                  <TextInput
                    style={feedstle.feedinput}
                    placeholder="comment"
                    value={comment}
                    onChangeText={(comment) => setComment(comment)}
                  />
                  <Pressable onPress={() => postcomment(item)}>
                    <AntDesign name="caretright" size={34} color="lightblue" />
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
