import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as FeedContext} from '../context/FeedContext';
import firebase from '@react-native-firebase/app';
import Gallery from '../components/Gallery';

const UserScreen = (props) => {
  const uid = props.navigation.state.params.uid;
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);
  const {
    state: {posts, followings},
    fetchUserPosts,
    fetchUserFollowing,
  } = useContext(FeedContext);

  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  console.log('Rendering Search Screen');
  console.log(user);
  console.log(posts);
  console.log(followings);
  //On change user
  useEffect(() => {
    console.log('Inside UseEffect Function');

    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        }
      });
    if (followings.indexOf(uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.navigation.state.params.uid, followings]);

  //component didmount
  useEffect(() => {
    console.log('Component didmount');
    fetchUserPosts(uid);
    fetchUserFollowing();
  }, []);

  const onFollow = () => {
    console.log('On follow');
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(uid)
      .set({})
      .then(fetchUserFollowing());
  };
  //Unfollow function
  const onUnfollow = () => {
    console.log('On Unfollow');
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(uid)
      .delete()
      .then(fetchUserFollowing());
  };

  console.log('++++++++++++++++++++++++++++++++');

  if (!user) return <View></View>;
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.accountStyle}>{user.name}</Text>
      </View>
      <View>
        {following ? (
          <Button title="Following" onPress={() => onUnfollow()}></Button>
        ) : (
          <Button title="Follow" onPress={() => onFollow()}></Button>
        )}
      </View>
      <Gallery posts={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserScreen;
