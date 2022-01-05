import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const Gallery = ({posts}) => {
  return (
    <View style={styles.containerGallery}>
      <FlatList
        numColumns={3}
        horizontal={false}
        data={posts}
        keyExtractor={(result) => result.id}
        renderItem={({item}) => {
          return (
            <View style={styles.containerImage}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: item.downloadURL}} />
              </TouchableOpacity>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGallery: {
    flex: 1,
    overflow: 'scroll',
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    margin: 0.3,
  },
  pictureStyle: {
    borderRadius: 4,
    width: 200,
    height: 100,
    marginVertical: 5,
  },
  containerImage: {
    flex: 1 / 3,
  },
});

export default Gallery;
