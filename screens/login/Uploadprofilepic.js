import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import updatingstyle from './updatingstyle';
export default function Uploadprofilepic({ navigation }) {
  //const [hasPermission, setHasPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [camera, setCamera] = useState(null); //for taking camera
  const [image, setImage] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const [flip, setFlip] = useState("Back Camera");
  useEffect(() => {
    (async () => {
      //for camera
      // const { status } = await Camera.requestCameraPermissionsAsync();
      const camerastatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(camerastatus.status === "granted");
      //thr end

      //for image picker
      //const [status, requestPermission] = ImagePicker.useCameraPermissions();
      const gallerystatus = ImagePicker.useCameraPermissions();
      setHasGalleryPermission(gallerystatus.status === "granted");

      if (gallerystatus.status !== "grandted") {
        alert("Sorry, we need camera roll permission to make this work");
      }
      //the end
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //take picture code
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImage(data.uri);
    }
  };
  //the end

  //image picker from gallery

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      //  mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //  aspect: [4, 3],
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //setImage(result.uri)
    }
  };

  //the end
  //canciled image
  const canciledimage = () => {
    setImage(null);
  };

  //the end
  return (
    <View style={updatingstyle.container}>
      {image ? null : (
        <View style={updatingstyle.cameracontaner}>
          <Camera
            style={updatingstyle.fixedRatio}
            type={type}
            ratio={"1:1"}
            ref={(ref) => setCamera(ref)}
          />
        </View>
      )}

      {image && <Image style={updatingstyle.image} source={{ uri: image }} />}
      {image ? null : (
        <>
          <View style={updatingstyle.button_btn}>
            <Button
              title={flip}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
                setFlip(
                  flip === "Back Camera" ? "Front Camera" : "Back Camera"
                );
              }}
            ></Button>
          </View>
          <View style={updatingstyle.button_btn}>
            <Button title="Take Picture" onPress={() => takePicture()} />
          </View>
          <View style={updatingstyle.button_btn}>
            <Button
              title="picke image from gallery"
              onPress={() => pickImage()}
            />
          </View>
        </>
      )}
      {image && (
        <>
          <View style={updatingstyle.button_btn}>
            <Button
              title="Save"
              onPress={() => navigation.navigate("completeregister", { image })}
            />
          </View>
          <View style={updatingstyle.button_btn}>
            <Button title="Canciled" onPress={canciledimage} />
          </View>
        </>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({});
