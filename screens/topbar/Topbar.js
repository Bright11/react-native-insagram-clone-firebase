import React from "react";
import { Pressable, Text, View, SafeAreaView } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import topbarstyle from "./topbarstyle";
import { useFonts } from "expo-font";

function Topbsr({ navigation }) {
  const [fontsLoaded] = useFonts({
    // "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-Black": require("../../assets/fonts/Roboto-BoldItalic.ttf"),
    //Roboto-BoldItalic.ttf
  });
  return (
    <SafeAreaView>
      <View style={topbarstyle.feedcontainer}>
        <View style={topbarstyle.feedviewrow}>
          <View>
            <Pressable style={topbarstyle.feedinstagramname}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Inter-Black",
                }}
              >
                Instagram
              </Text>
              <AntDesign name="caretdown" size={24} color="black" />
            </Pressable>
          </View>
          <View style={topbarstyle.feedtopicons}>
            <Pressable
              style={topbarstyle.feedpresicon}
              onPress={() => navigation.navigate("addfeed")}
            >
              <Entypo name="squared-plus" size={34} color="black" />
            </Pressable>
            <Pressable style={topbarstyle.feedpresicon}>
              <AntDesign name="heart" size={34} color="red" />
            </Pressable>
            <Pressable style={topbarstyle.feedpresicon}>
              <AntDesign name="message1" size={34} color="black" />
              <View style={topbarstyle.feedmessagenumber}>
                <Text style={topbarstyle.feednumbertext}>3</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Topbsr;
