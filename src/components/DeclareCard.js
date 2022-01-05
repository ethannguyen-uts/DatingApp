import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityComponent,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {navigate} from '../navigationRef';

const DeclareCard = ({question, answer, visible}) => {
  return (
    <TouchableOpacity
      style={styles.outlineBox}
      onPress={() => {
        navigate('EditUserData', {question});
      }}>
      <View style={styles.leftBox}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.answer}>{answer}</Text>
      </View>
      <View style={styles.centerBox}>
        <Text style={styles.visible}>{visible}</Text>
      </View>
      <View style={styles.rightBox}>
        <Ionicons size={22} name="chevron-forward-outline"></Ionicons>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outlineBox: {
    marginTop: 5,
    marginLeft: 10,
    borderBottomColor: '#eeeeee',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  leftBox: {
    width: '50%',
  },
  centerBox: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightBox: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  question: {
    fontSize: 17,
  },
  answer: {
    color: 'grey',
    fontSize: 15,
    paddingBottom: 7,
  },
  visible: {
    color: 'grey',
    alignSelf: 'flex-end',
  },
});

export default DeclareCard;
