import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {Context as AuthContext} from '../context/AuthContext';
import firebase from '@react-native-firebase/app';
import {FlatList} from 'react-native-gesture-handler';
import MatchBar from '../components/MatchBar';
import Spinner from '../components/Spinner';
import Ionicons from 'react-native-vector-icons/dist/FontAwesome';
//require('firebase/firestore');

const PersonalityTestScreen = ({navigation}) => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);
  //const { fetchUserPosts } = useContext(FeedContext);

  const [state, setState] = useState({
    questionsPack: {
      id: null,
      numOfQuestions: 0,
      type: '',
    },
    question: [],
    currentQuestion: 0,
    answer: [],
  });

  console.log(state.answer);

  const writeAnswer = async (questionsId) => {
    // Get a new write batch
    var query = await firebase
      .firestore()
      .collection('answers')
      .doc(firebase.auth().currentUser.uid)
      .collection('data')
      .where('questions', '==', questionsId);
    query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });

      state.answer.map((item) => {
        firebase
          .firestore()
          .collection('answers')
          .doc(firebase.auth().currentUser.uid)
          .collection('data')
          //.doc(state.questionsPack.questionId)
          //.collection(item.questionId)
          .add({
            ...item,
            creation: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(function () {
            props.navigation.navigate('Profile');
          });
      });
    });
  };

  useEffect(() => {
    console.log('Inside persnoality Test screen');
    firebase.auth().onAuthStateChanged((user) => {
      fetchUser();
    });

    //Loading questions

    var user = firebase.auth().currentUser;
    let questionsPack = null;
    if (user) {
      firebase
        .firestore()
        .collection('questions')
        .limit(1)
        .get()
        .then((snapshot) => {
          questionsPack = snapshot.docs[0].data();
          questionsPack.id = snapshot.docs[0].id;
          if (!questionsPack) return;
          //fetching questions
          firebase
            .firestore()
            .collection('questions')
            .doc(questionsPack.id)
            .collection('question')
            .orderBy('id', 'asc')
            .get()
            .then((snapshot) => {
              let question = snapshot.docs.map((doc) => {
                const data = doc.data();
                //id of a post
                const id = doc.id;
                return {id, ...data};
              });
              setState({
                ...state,
                questionsPack: questionsPack,
                question: question,
                currentQuestion: 1,
              });
            });
        });
    }
  }, []);

  if (
    state.currentQuestion !== 0 &&
    state.currentQuestion > state.questionsPack.numOfQuestions
  ) {
    console.log(state.questionsPack);
    //delete all data
    writeAnswer(state.questionsPack.id);
  }
  if (state.question.length == 0 || !currentUser || state.currentQuestion == 0)
    return <Spinner size="large" />;

  if (state.currentQuestion > state.questionsPack.numOfQuestions) {
    setState({...state, currentQuestion: 1});

    return (
      <View>
        <Text>All questions has been answered</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: 'https://i.ibb.co/jbdPmwk/Personality-Background.jpg'}}
        style={styles.backgroundImage}>
        <Text style={styles.header}></Text>
        <MatchBar
          containerWidth={'100%'}
          bgcolor={'#EF312D'}
          completed={
            ((state.currentQuestion - 1) / state.questionsPack.numOfQuestions) *
            100
          }
        />
        <View style={styles.dataContainer}>
          <View
            style={{
              //borderBottomColor: "black",
              //borderBottomWidth: 1,
              marginHorizontal: 20,
              marginTop: 30,
              flexDirection: 'row',
            }}>
            <Text style={{alignSelf: 'flex-start', fontSize: 20}}>
              {state.currentQuestion}/{state.questionsPack.numOfQuestions}
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  flex: 1,
                  alignContent: 'flex-end',
                  color: 'blue',
                }}>
                Previous
              </Text>
            </View>
          </View>
          <Text style={styles.questionStyle}>
            Question {parseInt(state.currentQuestion)}:{' '}
            {state.question[state.currentQuestion - 1].content}
          </Text>
          <FlatList
            data={state.question[state.currentQuestion - 1].answer}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    const element = {
                      questions: state.questionsPack.id,
                      questionId: state.currentQuestion,
                      answer: item,
                    };
                    if (
                      state.answer.some(
                        (item) => item.questionId === element.questionId,
                      )
                    ) {
                      setState({
                        ...state,
                        currentQuestion: state.currentQuestion + 1,
                      });
                    } else {
                      setState({
                        ...state,
                        answer: [...state.answer, element],
                        currentQuestion: state.currentQuestion + 1,
                      });
                    }
                  }}
                  title={item}>
                  <View style={styles.answerContainer}>
                    <Text>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}></FlatList>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 23,
    alignSelf: 'center',
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
  },

  dataContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 25,
    marginBottom: 350,
  },
  questionStyle: {
    fontSize: 17,
    marginTop: 10,
    marginHorizontal: 20,
    alignSelf: 'flex-start',
    height: 50,
    fontWeight: 'bold',
  },
  answerContainer: {
    backgroundColor: '#dbd9d9',
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    width: 280,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    marginBottom: 0,
  },
});

export default PersonalityTestScreen;
