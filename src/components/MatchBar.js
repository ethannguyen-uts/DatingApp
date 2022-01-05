import React from 'react';
import {View, Text} from 'react-native';

const MatchBar = (props) => {
  const {bgcolor, completed, containerWidth} = props;

  const containerStyles = {
    width: `${containerWidth}%`,
    height: 30,
    backgroundColor: '#c8ebec',
    borderRadius: 10,

    margin: 10,
    alignSelf: 'center',
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 10,
    alignItems: 'center',
  };

  const labelStyles = {
    padding: 6,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  };

  return (
    <View style={containerStyles}>
      <View style={fillerStyles}>
        <Text style={labelStyles}>{`${completed}%`}</Text>
      </View>
    </View>
  );
};

export default MatchBar;
