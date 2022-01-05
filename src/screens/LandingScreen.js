import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import firebase from '@react-native-firebase/app';
import Spinner from '../components/Spinner';
//require('firebase/firestore');

const LandingScreen = ({navigation}) => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log('Inside landing screen');
    firebase.auth().onAuthStateChanged((user) => {
      console.log('Auth state Change');
    });
    fetchUser();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white', borderColor: 'black'}}>
      <ImageBackground
        source={{
          uri:
            'https://cdn.dribbble.com/users/626327/screenshots/2618501/400.gif',
        }}
        style={styles.backgroundImage}></ImageBackground>
      <View style={styles.announcement}>
        <Text style={{color: 'white', alignSelf: 'center'}}>
          Hi {currentUser.name}, 3 people online, find your love!
        </Text>
      </View>
      <View style={styles.functionsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Match', {idFind: Math.random()});
          }}>
          <View style={styles.functionMatchStyle}>
            <Image
              source={{
                uri:
                  'https://media2.giphy.com/media/RIqh9nbpblgvWvd6ZK/giphy.gif',
              }}
              style={styles.functionImage}></Image>

            <Text style={styles.functionTextStyle}>Match</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AudioCall');
          }}>
          <View style={styles.functionAudiocallStyle}>
            <Image
              source={{
                uri:
                  'https://media3.giphy.com/media/lnVCARR1zPDipkAYHZ/giphy.gif?cid=ecf05e47dmrt07yehrhg83xv79uyexe4wygztusqbt017b0c&rid=giphy.gif',
              }}
              style={styles.functionImage}></Image>
            <Text style={styles.functionTextStyle}>Audio Call</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VideoCall');
          }}>
          <View style={styles.functionVideocallStyle}>
            <Image
              source={{
                uri:
                  'https://media.giphy.com/media/XHM2W1ZBo3DJMDwRM2/giphy.gif',
              }}
              style={styles.functionImage}></Image>
            <Text style={styles.functionTextStyle}>Video</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PersonalityTest');
          }}>
          <View style={styles.functionPersonalityStyle}>
            <Image
              source={{
                uri: 'https://media.giphy.com/media/wH4rY2nPnEnp6/giphy.gif',
              }}
              style={styles.functionImage}></Image>
            <Text style={styles.functionTextStyle}>Personality</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionStyle: {
    fontSize: 20,
    marginVertical: 30,
    alignSelf: 'flex-start',
    height: 50,
  },
  container: {
    borderWidth: 0,
    alignItems: 'center',
    flex: 1,
  },

  functionsContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
  },
  functionTextStyle: {
    color: 'white',
  },
  functionMatchStyle: {
    width: 90,
    height: 90,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    borderRadius: 5,
    backgroundColor: '#6b93c2',
  },
  functionPersonalityStyle: {
    width: 90,
    height: 90,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    borderRadius: 5,
    backgroundColor: '#beafc7',
  },
  functionAudiocallStyle: {
    width: 90,
    height: 90,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    borderRadius: 5,
    backgroundColor: '#94d4b4',
  },
  functionVideocallStyle: {
    width: 90,
    height: 90,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    borderRadius: 5,
    backgroundColor: '#de7cba',
  },
  announcement: {
    backgroundColor: 'black',
    paddingBottom: 20,
  },
  functionImage: {
    alignSelf: 'center',
    width: 85,
    height: '70%',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'contain', // or 'stretch'
    marginBottom: 0,
  },
});

export default LandingScreen;
