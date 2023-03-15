import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react'
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { auth, storage } from '../../firebase'
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';

export default function CompleteRegister({ image, route }) {
    const [profileimg, setProfileimg] = useState(null)
    const [username, setUsername] = useState('')
    const [progress, setProgress] = useState(null);
    
    console.log("see")
    const getprofileimage = route.params.image;
    const upoladproimage = async () => {
        
        const storaginpath = `profile/${auth.currentUser.uid}/Math.random().toString(30)`;
        const response = await fetch(getprofileimage);
        const blob = await response.blob();
        //where to stor profile image
        const storageRef = ref(storage, storaginpath);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                setProgress('please wait')
                switch (snapshot.state) {
                    case "paused":
                        console.log('puolad is paused');
                        setProgress("Upload in progress");
                        break;
                    case "running":
                        console.log("upload is runing");
                        setProgress("All most done");
                        break;
                    default:
                        break;
                }
            }, (error) => {
                alert(error)
        }, () => {
                getDownloadURL(uploadTask
                    .snapshot.ref).then((downloadURL) => {
                        setProfileimg(downloadURL);
                })
        })
    }
    
    const registerationdone = async () => {
      updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: profileimg,
      })
        .then(() => {
          // Profile updated!
          // ...
            alert('success,Successfully updataed')
        })
        .catch((error) => {
          // An error occurred
          // ...
            console.log(error)
        });
    };

    return (
      <SafeAreaView style={styles.safview}>
        <View style={styles.secondview}>
         
          <TextInput
            style={styles.inpttext}
            placeholder="UserName"
            onChangeText={(username) => setUsername(username)}
          />
          {profileimg ? null : (
            <View>
              <Button title="Upload Profile" onPress={upoladproimage} />
            </View>
          )}
          {profileimg && (
            <View>
              <Button
                title="Complete Registration"
                onPress={registerationdone}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safview: {
    flex: 1,
    backgroundColor: "#B91B49",
    padding: 30,
  },
  secondview: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    padding: 8,
    backgroundColor: "#1E1F1D",
    elevation: 30,
  },
  inpttext: {
    padding: 10,
    fontSize: 20,
    backgroundColor: "gray",
    marginTop: 10,
    marginBottom: 10,
    elevation: 80,
  },
});