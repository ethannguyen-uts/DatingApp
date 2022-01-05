import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {View, Text} from 'react-native';
import Spinner from '../components/Spinner';

const ResolveAuthScreen = () => {
  const {tryLocalSignIn} = useContext(AuthContext);
  useEffect(() => {
    console.log('Inside resolve screen');
    tryLocalSignIn();
  }, []);
  return <Spinner size="large" />;
};

export default ResolveAuthScreen;
