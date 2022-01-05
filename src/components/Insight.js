import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  InteractionManager,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Insight = ({facts, showModal}) => {
  return (
    <View style={styles.containerInsight}>
      <FlatList
        numColumns={3}
        horizontal={false}
        data={facts}
        keyExtractor={(result) => result.idx}
        renderItem={({item}) => {
          return (
            <View style={styles.containerFact}>
              <TouchableOpacity onPress={() => showModal(item.idx)}>
                <View style={styles.fact}>
                  {item.url ? (
                    <Image
                      style={styles.imageInsight}
                      source={{uri: item.url}}
                    />
                  ) : (
                    <Ionicons
                      name="add-outline"
                      style={{
                        fontSize: 50,
                        color: '#4169E1',
                        alignSelf: 'center',
                      }}></Ionicons>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInsight: {
    flex: 1,
  },
  fact: {
    flex: 1,
    aspectRatio: 1 / 1,
    margin: 0.3,
    borderWidth: 2,
    borderStyle: 'dashed',
    width: '100%',
    height: '100%',
    borderColor: 'orange',
    borderRadius: 9,
    justifyContent: 'center',
  },
  pictureStyle: {
    borderRadius: 4,
    width: 200,
    height: 100,
    marginVertical: 5,
  },
  containerFact: {
    flex: 1 / 3,
    margin: 4,
  },
  imageInsight: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch'
    marginBottom: 0,
  },
});

export default Insight;
