import React, {useState} from 'react';
import {View, Button, StyleSheet, TextInput, Image} from 'react-native';
import firebase from '@react-native-firebase/app';
//require('firebase/firestore');
//require('firebase/firebase-storage');

const SaveScreen = (props) => {
  const uri = props.navigation.state.params.image;
  const [caption, setCaption] = useState('');
  const uploadImage = async () => {
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}}`;
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    //need to fix random function
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('UserPosts')
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.navigate('Profile');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: uri}} />
      <TextInput
        placeholder="Write a caption ...."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button
        title="Save"
        onPress={() => {
          uploadImage();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SaveScreen;
