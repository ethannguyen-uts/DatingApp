import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  Button,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Spacer from '../components/Spacer';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const debug = true;
  return (
    <View styles={styles.container}>
      <Spacer>
        <Text style={styles.headerStyle}>{headerText}</Text>
      </Spacer>
      <View style={styles.authFormContainer}>
        {headerText === 'Sign Up' ? (
          <View>
            <Text style={styles.fieldElement}>Username</Text>
            <TextInput
              value={name}
              onChangeText={(name) => setName(name)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Account Name"
              style={styles.inputElement}
              label="Account Name"
            />
          </View>
        ) : null}
        <Text style={styles.fieldElement}>Username</Text>

        <TextInput
          autoCompleteType="email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Type in your Email"
          style={styles.inputElement}
          label="Email"
        />
        <Text style={styles.fieldElement}>Password</Text>
        <TextInput
          autoCompleteType="password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(password) => setPassword(password)}
          placeholder="Type in your Password"
          style={styles.inputElement}
          label="Password"
        />
        {errorMessage ? (
          <Text style={{color: 'red', marginLeft: 15, marginTop: 15}}>
            {errorMessage}
          </Text>
        ) : null}
        {headerText !== 'Sign Up' ? (
          <Text style={{color: 'blue', alignSelf: 'flex-end'}}>
            Forgot password?
          </Text>
        ) : null}
        <Button
          style={styles.submitButton}
          title={submitButtonText}
          onPress={() => onSubmit({email, password, name})}></Button>
      </View>
      <Text style={{alignSelf: 'center', color: 'grey'}}>Or Using</Text>
      <View style={styles.socialMedia}>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <Ionicons name="logo-facebook" color="#3b5998" size={35} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <Ionicons name="logo-twitter" color={'#00acee'} size={35} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaIcon}>
          <Ionicons name="logo-instagram" color={'#8a3ab9'} size={35} />
        </TouchableOpacity>
      </View>

      {/*
     
         */}
    </View>
  );
};
const styles = StyleSheet.create({
  errorMessage: {},
  link: {
    color: 'blue',
  },
  headerStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 100,
  },
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 10,
    backgroundColor: '#9FA8DA',
  },
  authFormContainer: {
    //borderWidth: 1,
    //borderColor: "blue",
    marginBottom: 10,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 30,
  },
  inputElement: {
    borderRadius: 5,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'white',
    height: 30,
  },
  fieldElement: {
    color: 'grey',
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 30,
    width: 20,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialMediaIcon: {
    marginHorizontal: 5,
  },
});

export default AuthForm;
