import React, { useContext } from "react";
import { SafeAreaView } from "react-navigation";
import { View, StyleSheet, Text, Button } from "react-native";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>Account</Text>
      <Spacer>
        <Button title="Sign out" onPress={signout}></Button>
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
