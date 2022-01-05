import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const EditProfileScreen = (props) => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(
    currentUser.hasOwnProperty('bio') ? currentUser.bio : '',
  );

  const [image, setImage] = useState(
    currentUser.hasOwnProperty('profileImageURL')
      ? currentUser.profileImageURL
      : null,
  );

  useEffect(() => {
    const listener = props.navigation.addListener('didFocus', () => {
      return () => {
        listener.remove();
      };
    });
  }, []);

  const pickImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}, (result) => {
      if (!result.didCancel) {
        setImage(result.uri);
      }
    });
  };

  const updateProfile = async () => {
    if (image !== currentUser.profileImageURL) {
      const childPath = `profileImage/${
        auth().currentUser.uid
      }/${Math.random().toString(36)}}`;

      //const response = await fetch(image);
      //const blob = await response.blob();
      console.log(childPath);
      const reference = storage().ref(childPath);
      console.log(image);
      const task = reference.putFile(image);

      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      task.then(async () => {
        console.log('Image uploaded to the bucket!');
        const url = await storage().ref(childPath).getDownloadURL();
        saveProfileImage(url);
      });
    }

    saveData();
  };

  const saveProfileImage = async (downloadURL) => {
    //add a new post
    await firestore()
      .collection('posts')
      .doc(auth().currentUser.uid)
      .collection('UserPosts')
      .add({
        downloadURL,
        caption: currentUser.name + ' has updated profile pictrure.',
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(async () => {
        //add profile image link:
        //Update profile infomation
        await firestore().collection('users').doc(auth().currentUser.uid).set(
          {
            profileImageURL: downloadURL,
          },
          {merge: true},
        );
      });
  };

  const saveData = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set(
        {
          name: name,
          bio: bio,
        },
        {merge: true},
      )
      .then(() => {
        console.log('ahahaha');
        fetchUser();
        //navigate back
        props.navigation.navigate('Profile');
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.imageProfile} source={{uri: image}} />
        <Button
          onPress={() => {
            pickImage();
          }}
          title="Change Profile Photo"></Button>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            value={name}
            style={styles.inputField}
            onChangeText={(name) => {
              setName(name);
            }}></TextInput>
          <Text style={styles.title}>Bio</Text>
          <TextInput
            multiline
            numberOfLines={3}
            value={bio}
            style={styles.inputField}
            onChangeText={(bio) => {
              setBio(bio);
            }}></TextInput>
          <Button
            onPress={() => {
              updateProfile();
            }}
            title="Update Profile"></Button>
        </View>
      </View>
    </>
  );
};

EditProfileScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          console.log('Updating profile info');
        }}>
        <Ionicons name="checkmark-outline" color={'#841584'} size={25} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageProfile: {
    marginTop: 20,
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginBottom: 20,
    alignSelf: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: 'grey',
    fontSize: 17,
    marginLeft: 10,
  },
  inputField: {
    margin: 10,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    fontSize: 17,
  },
});
export default EditProfileScreen;
