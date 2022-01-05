import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firebase from '@react-native-firebase/app';
//require('firebase/firestore');

const SearchScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          //id of a post
          const id = doc.id;
          return {id, ...data};
        });
        setUsers(users);
      });
  };
  return (
    <View style={styles.containerStyle}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search..."
        style={styles.inputStyle}
        onChangeText={(search) => fetchUsers(search)}></TextInput>
      <FlatList
        numColums={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('User', {uid: item.id});
                }}>
                <Text>
                  {item.name}-{item.id}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  inputStyle: {
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    backgroundColor: 'white',
    height: 30,
  },
});

export default SearchScreen;
