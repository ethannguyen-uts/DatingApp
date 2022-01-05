import React, {useState, useContext} from 'react';
import {View, StyleSheet, Switch, Text, TextInput} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Context as AuthContext} from '../context/AuthContext';

const WorkModification = () => {
  const {
    state: {currentUser},
  } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(
    currentUser.background.workplace.visible,
  );
  const toggleVisibleSwitch = () => {
    setIsEnabled((isEnabled) => !isEnabled);
    updateWorkplaceVisible(isEnabled);
  };

  const [workplace, setWorkplace] = useState(
    currentUser.background.workplace.description,
  );
  const updateWorkplace = async () => {
    currentUser.background.workplace.description = workplace;
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set(
        {
          background: {workplace: {description: workplace}},
        },
        {merge: true},
      )
      .then(() => {
        console.log('Finish update workplace');
      });
  };
  const updateWorkplaceVisible = async () => {
    currentUser.background.workplace.visible = !isEnabled;
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .set(
        {
          background: {workplace: {visible: !isEnabled}},
        },
        {merge: true},
      )
      .then(() => {
        console.log('Finish update workplace visible');
      });
  };
  return (
    <>
      <TextInput
        value={workplace}
        onChangeText={(workplace) => setWorkplace(workplace)}
        onEndEditing={() => {
          updateWorkplace();
          console.log(200);
        }}
        onChangeValue
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Your work place"
        style={styles.inputElement}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
        <Text style={{margin: 10}}>Visible</Text>
        <Switch
          trackColor={{false: '#767577', true: '#FFB6C1'}}
          thumbColor={isEnabled ? 'white' : 'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleVisibleSwitch}
          value={isEnabled}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputElement: {
    marginVertical: 15,
    marginHorizontal: 10,
    height: 50,
    fontSize: 30,
    borderColor: '#eeeeee',
    borderWidth: 0,
    borderBottomWidth: 2,
  },
});

export default WorkModification;
