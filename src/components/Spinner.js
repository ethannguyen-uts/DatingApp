import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ImageBackground
        source={{
          uri: "https://media.giphy.com/media/XEJ8bHp1N9i4OjgLwT/giphy.gif",
        }}
        style={styles.backgroundImage}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFCFC",
  },
  backgroundImage: {
    width: 100,
    height: 100,
    resizeMode: "contain", // or 'stretch'
  },
});

export default Spinner;
