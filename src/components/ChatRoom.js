import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  span,
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import firebase from '@react-native-firebase/app';
//require('firebase/firestore');
//require('firebase/firebase-storage');

//import {Audio} from 'expo-av';

const ChatRoom = ({chatID, currentUser, partnerImage}) => {
  console.log('CHATROOM: ' + chatID);
  const [sound, setSound] = useState();

  async function playSound() {
    return;
    const {sound} = await Audio.Sound.createAsync(
      require('../audio/messageSend.mp3'),
    );
    setSound(sound);
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const dummy = useRef();
  const messagesRef = firestore
    .collection('chats')
    .doc(chatID)
    .collection('messages');
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25);

  const [messages, setMessages] = useState(null);
  const [formValue, setFormValue] = useState('');

  const getMessages = async () => {
    await query.get().then((snapshot) => {
      if (snapshot.docs.length > 0) {
        const docs = snapshot.docs.reverse();
        let datas = docs.map((doc, index) => {
          const data = doc.data();
          let last = true;

          if (index < docs.length - 1) {
            if (docs[index + 1].data().uid === data.uid) last = false;
          }

          const id = doc.id;

          return {last: last, id, ...data};
        });

        setMessages(datas);
      } else setMessages([]);
    });
  };

  useEffect(() => {
    console.log('Running use effect');

    //Listening to database change
    firebase
      .firestore()
      .collection('chats')
      .doc(chatID)
      .collection('messages')
      .onSnapshot((snapshot) => {
        getMessages();
        /*
        if (snapshot) {
          console.log("snap");
          let chats = messages ? messages : [];
          snapshot.forEach((snap) => {
            chats.push(snap.data());
          });
          setMessages(chats);
        }
        */
      });
  }, []);

  const sendMessage = async () => {
    if (formValue == '' || !formValue) return;
    const {profileImageURL} = currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: auth.currentUser.uid,
      profileImageURL,
    });

    setFormValue('');
    //getMessages();
  };
  console.log('Chat room rendering');

  return (
    <KeyboardAvoidingView // adjust the value here if you need more padding
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={100}>
      <View style={styles.App}>
        <View style={styles.header}>
          <Text>⚛️🔥💬</Text>
        </View>
        <View style={styles.section}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}
            ref={dummy}
            onContentSizeChange={() =>
              dummy.current.scrollToEnd({animated: false})
            }
            style={styles.mainScrollView}>
            {messages &&
              messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  last={msg.last}
                  message={msg}
                  currentUser={currentUser}
                  partnerImage={partnerImage}
                />
              ))}
          </ScrollView>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={formValue}
              onChangeText={(e) => setFormValue(e)}
              placeholder="Aa"
            />

            <Button
              style={styles.button}
              title="🕊️"
              onPress={() => {
                playSound();
                sendMessage();
              }}></Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const ChatMessage = (props) => {
  const {text, uid, profileImageURL, last} = props.message;

  const messageClass =
    uid === firebase.auth().currentUser.uid ? 'sent' : 'received';

  return (
    <>
      {messageClass == 'sent' ? (
        <View style={styles.sent}>
          <Text>{text}</Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          {last ? (
            <Image style={styles.image} source={{uri: props.partnerImage}} />
          ) : (
            <Text style={{marginLeft: 35}}></Text>
          )}
          <View style={styles.received}>
            <Text style={styles.p}>{text}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  App: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: 'white',
    height: 25,
    width: '100%',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
  },

  mainScrollView: {
    paddingBottom: 10,
    margin: 0,
  },

  form: {
    height: 30,
    backgroundColor: 'white',
    width: '100%',
    fontSize: 1.5,
    flexDirection: 'row',
  },
  button: {
    width: 40,
    backgroundColor: '#eeeeee',
  },
  input: {
    width: '100%',
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    flex: 1,
  },
  sent: {
    color: 'white',
    backgroundColor: 'pink',
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderRadius: 10,
    padding: 7,
  },
  received: {
    backgroundColor: '#0b93f6',
    color: 'black',
    marginBottom: 10,
    borderRadius: 10,
    padding: 7,
    alignSelf: 'flex-start',
  },
  p: {
    marginBottom: 2,
    padding: 5,
    borderRadius: 10,
    color: 'white',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'column',
    height: 450,
    backgroundColor: 'rgb(40, 37, 53)',
    width: '100%',
    //rgb(40, 37, 53)
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginHorizontal: 3,
  },
});

export default ChatRoom;
