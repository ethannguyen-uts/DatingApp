import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {Context} from '../context/AuthContext';

const SigninScreen = () => {
  const {state, signin, clearErrorMessage} = useContext(Context);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
        onDidBlur={() => {
          clearErrorMessage();
        }}
      />

      <AuthForm
        headerText="Login"
        errorMessage={state.errorMessage}
        submitButtonText="LOGIN"
        onSubmit={({email, password, name}) => signin({email, password, name})}
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </SafeAreaView>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    marginBottom: 320,
  },
});

export default SigninScreen;
