import { collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebase";
import { getDocs } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
function Profile({ navigation, logout }) {
  const [mypostdata, setMypostdata] = useState([]);
  useEffect(() => {
    // alert(auth.currentUser.uid)
    mydata();
  }, []);
  const mydata = async () => {
    const findmessage = collection(db, "posts");
    const allmessages = query(
      findmessage,
      where("postownner_id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(allmessages);
    let allc = [];
    querySnapshot.forEach((doc) => {
      allc.push({ id: doc.id, ...doc.data() });
    });
    setMypostdata(allc);
  };
  // console.log("hi", mypostdata);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profilecontaine}>
        <View>
          <Pressable>
            <Text style={{ fontSize: 18 }}>
              {auth?.currentUser.displayName}
            </Text>
          </Pressable>
        </View>
        <View>
          <View>
            <Pressable onPress={logout}>
              <AntDesign name="logout" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        <View>
          <Pressable>
            <MaterialIcons name="add-box" size={24} color="black" />
          </Pressable>
        </View>
        <View>
          {/* navigation.navigate('Root', { screen: 'Settings' }); */}
          <Pressable onPress={() => navigation.navigate("addfeed")}>
            <MaterialIcons name="system-update-tv" size={24} color="black" />
          </Pressable>
        </View>
        <View>
          <Pressable>
            <Fontisto name="nav-icon" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.scroview}>
        {mypostdata.map((mypic) => (
          <View>
            <View>
              <Image style={styles.image} source={{ uri: mypic.getimage }} />
            </View>
            <Text style={styles.text}>{mypic.caption}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroview: {
    flex: 1,
    alignContent: "center",
    marginTop: 30,
    padding:10
  },
  profilecontaine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight:10
  },
  image: {
    width: "100%",
    height: 200,
    elevation:20
  },
  text: {
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom:20,
    fontSize:20
  },
});

export default Profile;
