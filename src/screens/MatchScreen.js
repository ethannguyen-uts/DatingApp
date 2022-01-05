import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import {Context as AuthContext} from '../context/AuthContext';
import {State, TextInput} from 'react-native-gesture-handler';
import MatchBar from '../components/MatchBar';
import Ionicons from 'react-native-vector-icons/dist/FontAwesome';
import {navigate} from '../navigationRef';
import ChatRoom from '../components/ChatRoom';
import Spinner from '../components/Spinner';
//require('firebase/firestore');

//compare data and calculate match percantage:

const MatchScreen = (props) => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);
  const [userState, setUserState] = useState({
    userAnswer: [],
  });
  const [partnerState, setPartnerState] = useState({
    partnerId: null,
    partnerName: '',
    partnerAnswer: [],
  });
  const [matchPercentage, setMatchPercentage] = useState(0);
  console.log('Inside Match');
  useEffect(() => {
    var user = firebase.auth().currentUser;
    let questionsPack = null;
    //getting user answer
    firebase
      .firestore()
      .collection('answers')
      .doc(user.uid)
      .collection('data')
      .orderBy('questionId', 'asc')
      .get()
      .then((snapshot) => {
        let userAnswer = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {...data};
        });
        setUserState({
          userAnswer: userAnswer,
        });
      });

    //getting partner data
    getPartnerData();
  }, []);

  useEffect(() => {
    console.log('running compare function');
    setMatchPercentage(
      compare(userState.userAnswer, partnerState.partnerAnswer),
    );
  });

  //Function to get data
  const getPartnerData = async () => {
    const listUser = [
      // { id: "3dldf0BuoacPOWja3RNslYKUcVf1", name: "jisoo" },
      {id: 'L9mbPxmDseQZ5kU0QkQcMNGCZsC3', name: 'ethan'},
      {id: 'VLotksrWrTfdIH1FujMLHlNxSZ63', name: 'jenie'},
      {id: '3EI5FipOnwUbSkQH9qyOygmQtI73', name: 'rose'},
    ];

    const randomPick = () => {
      let index = Math.floor(Math.random() * Math.floor(listUser.length));
      while (listUser[index].id === firebase.auth().currentUser.uid) {
        index = Math.floor(Math.random() * Math.floor(listUser.length));
      }
      return index;
    };
    const index = randomPick();
    const partnerId = listUser[index].id;
    const partnerName = listUser[index].name;

    //add matching to the database
    //Check if matching before
    const isExists = await firebase
      .firestore()
      .collection('matching')
      .doc(firebase.auth().currentUser.uid)
      .collection('userMatch')
      .doc(partnerId)
      .collection('chatID')
      .orderBy('creation')
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          return true;
        } else return false;
      });
    console.log('isExists:' + isExists);
    //add matching detail, create a chat ID, users
    if (!isExists) {
      // create a chat ID for matching collection
      await firebase
        .firestore()
        .collection('matching')
        .doc(partnerId)
        .collection('userMatch')
        .doc(firebase.auth().currentUser.uid)
        .collection('chatID')
        .add({
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    const chatID = await firebase
      .firestore()
      .collection('matching')
      .doc(partnerId)
      .collection('userMatch')
      .doc(firebase.auth().currentUser.uid)
      .collection('chatID')
      .orderBy('creation')
      .limit(1)
      .get()
      .then((snapshot) => {
        let chats = snapshot.docs.map((doc) => {
          const data = doc.data();
          //id of a post
          const id = doc.id;
          return {id, ...data};
        });
        return chats[0].id;
      });
    //after has chatID create a record of chats collection with init users:
    await firebase
      .firestore()
      .collection('chats')
      .doc(chatID)
      .set({users: [firebase.auth().currentUser.uid, partnerId]});

    if (!isExists) {
      await firebase
        .firestore()
        .collection('matching')
        .doc(firebase.auth().currentUser.uid)
        .collection('userMatch')
        .doc(partnerId)
        .collection('chatID')
        .doc(chatID)
        .set({
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }
    const partnerAnswer = await firebase
      .firestore()
      .collection('answers')
      .doc(partnerId)
      .collection('data')
      .orderBy('questionId', 'asc')
      .get()
      .then((snapshot) => {
        let partnerAnswer = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {...data};
        });
        return partnerAnswer;
      });

    const partnerInfo = await firebase
      .firestore()
      .collection('users')
      .doc(partnerId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          return user;
        }
      });
    setPartnerState({
      partnerAnswer: partnerAnswer,
      partnerId: partnerId,
      partnerName: partnerInfo.name,
      partnerImage: partnerInfo.profileImageURL,
      partnerBio: partnerInfo.bio,
      chatID: chatID,
    });
  };

  //

  if (!currentUser || !partnerState.chatID) return <Spinner />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => {
              props.navigation.pop();
            }}>
            {/*
            <Ionicons
              name="arrow-back-outline"
              color={'rgb(0,122,255)'}
              size={25}
            />*/}
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'rgb(0,122,255)',
              alignSelf: 'center',
              flex: 1,
            }}>
            {''}
            {partnerState.partnerName}{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('User', {
                uid: partnerState.partnerId,
              });
            }}
            title="Profile >"
            style={styles.partnerProfile}>
            <Text style={{color: 'blue'}}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.InfoContainer}>
          <View style={styles.itemsContainer}>
            <Image
              style={styles.imageProfile}
              source={{
                uri: partnerState.partnerImage,
              }}
            />
            <Image
              style={styles.imageProfile}
              source={{
                uri: currentUser.hasOwnProperty('profileImageURL')
                  ? currentUser.profileImageURL
                  : null,
              }}
            />
            <MatchBar
              containerWidth={'37'}
              bgcolor={'#EF312D'}
              completed={matchPercentage}
            />
          </View>
          <Text style={styles.bio}>{partnerState.partnerBio}</Text>
        </View>
        {
          <ChatRoom
            chatID={partnerState.chatID}
            currentUser={currentUser}
            partnerImage={partnerState.partnerImage}
          />
        }
      </View>
    </SafeAreaView>
  );
};

const compare = (userAnswer, partnerAnswer) => {
  if (userAnswer.length == 0 || partnerAnswer.length == 0) return 0;
  const dicUser = {};
  const dicPartner = {};

  userAnswer.map((item) => {
    dicUser[item.questionId.toString()] = item.answer;
  });
  partnerAnswer.map((item) => {
    dicPartner[item.questionId] = item.answer;
  });
  let total = 0,
    match = 0;

  for (const [key, value] of Object.entries(dicUser)) {
    total++;
    if (value == dicPartner[key]) match++;
  }
  //console.log("Match:" + match, "Total:" + total);

  return total == 0 ? 0 : (match / total) * 100;
};

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
  },

  header: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 25,
    flex: 1,
    marginLeft: 10,
  },
  partnerProfile: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  InfoContainer: {
    borderRadius: 3,
    margin: 10,
    height: 150,
  },
  itemsContainer: {
    borderColor: '#eeeeee',
    flexDirection: 'row',
  },
  imageProfile: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginHorizontal: 3,
  },
  bio: {
    marginTop: 10,
    marginLeft: 10,
  },
});

export default MatchScreen;
