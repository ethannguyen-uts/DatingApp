import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';
import DeclareCard from './DeclareCard';
import {Context as AuthContext} from '../context/AuthContext';

const Background = () => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}> My background</Text>
      <View style={styles.Background}>
        <DeclareCard question="Work" answer={''} visible={'Hide'} />

        <DeclareCard question="Job Title" answer="Engineer" visible="Visible" />
        <DeclareCard
          question="School"
          answer="Sydney University"
          visible="Visible"
        />
        <DeclareCard
          question="Education Level"
          answer="Undergraduate"
          visible="Visible"
        />
        <DeclareCard question="Religion" answer="Other" visible="Visible" />
        <DeclareCard question="Hometown" answer="Saigon" visible="Visible" />
      </View>

      <View style={{marginTop: 30}}></View>
      <Text style={styles.title}> Myself</Text>
      <View style={styles.Background}>
        <DeclareCard question="Name" answer="Ethan Nguyen" visible="Visible" />
        <DeclareCard question="Gender" answer="Male" visible="Visible" />
        <DeclareCard question="Age" answer="25" visible="Visible" />
        <DeclareCard question="Height" answer="5'5" visible="Visible" />
        <DeclareCard
          question="Location"
          answer="Canley Vale"
          visible="Visible"
        />
        <DeclareCard question="Ethnicity" answer="Other" visible="Visible" />
        <DeclareCard
          question="Children"
          answer="Dont have children"
          visible="Visible"
        />
        <DeclareCard
          question="Family Plan"
          answer="Want Children"
          visible="Visible"
        />
      </View>

      <View style={{marginTop: 30}}></View>
      <Text style={styles.title}> Vices</Text>
      <View style={styles.Background}>
        <DeclareCard question="Drink" answer="Sometimes" visible="Visible" />
        <DeclareCard question="Smoke" answer="Yes" visible="Visible" />
        <DeclareCard question="Drugs" answer="No" visible="Visible" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    color: 'coral',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});

export default Background;
