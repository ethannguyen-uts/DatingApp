import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-navigation';
import {View, StyleSheet, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';

import firebase from '@react-native-firebase/app';
//require('firebase/firestore');
//require('firebase/firebase-storage');

const ChatListScreen = () => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);

  const [allMessage, setAllMessage] = useState([]);

  const fetchData = async () => {
    const listMessage = await firebase
      .firestore()
      .collection('chats')
      .where('users', 'array-contains', firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          const docs = snapshot.docs;
          let datas = docs.map((doc, index) => {
            const data = doc.data();
            const id = doc.id;
            const partnerId = data.users.filter(
              (item) => item !== firebase.auth().currentUser.uid,
            )[0];
            return {id, partnerId};
          });
          return datas;
        }
        return [];
      });

    let i = 0;
    let listLastMessage = [];
    while (i < listMessage.length) {
      let item = listMessage[i];
      let lastMessage = await firebase
        .firestore()
        .collection('chats')
        .doc(item.id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            const data = snapshot.docs[0].data();
            //console.log(data);
            return data;
          } else return null;
        });

      let partnerInfo = await firebase
        .firestore()
        .collection('users')
        .doc(item.partnerId)
        .get()
        .then((snapshot) => {
          if (snapshot) {
            return snapshot.data();
          }
          return null;
        });

      listLastMessage.push({
        lastMessageText: lastMessage.text,
        partnerName: partnerInfo.name,
        partnerImage: partnerInfo.profileImageURL,
      });
      i++;
    }
    setAllMessage(listLastMessage);
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (!allMessage) return;
  return (
    <Container>
      <Header />
      <Content>
        {allMessage.map((item) => {
          return (
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{uri: item.partnerImage}} />
                </Left>
                <Body>
                  <Text>{item.partnerName}</Text>
                  <Text note>{item.lastMessageText}</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
            </List>
          );
        })}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default ChatListScreen;
