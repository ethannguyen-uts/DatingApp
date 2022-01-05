import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as FeedContext} from '../context/FeedContext';
import Ionicons from 'react-native-vector-icons/dist/FontAwesome';

const PersonalPostsScreen = ({navigation}) => {
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);
  const {
    state: {posts},
    fetchUserPosts,
  } = useContext(FeedContext);

  useEffect(() => {
    console.log('Inside Profile screen');
    fetchUser();
    const uid = navigation.state.params.uid;
    fetchUserPosts(uid);

    const listener = navigation.addListener('didFocus', () => {
      fetchUserPosts(uid);
      return () => {
        listener.remove();
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.containerGallery}>
        <FlatList
          data={posts}
          keyExtractor={(result) => result.id}
          renderItem={({item}) => {
            return (
              <View style={styles.containerPost}>
                <View style={styles.postHeader}>
                  <Text style={styles.accountStyle}>{currentUser.name}</Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="ellipsis-horizontal-outline"
                      style={styles.iconStyle}></Ionicons>
                  </TouchableOpacity>
                </View>
                <Image style={styles.image} source={{uri: item.downloadURL}} />
                <View style={styles.interactionBar}>
                  <TouchableOpacity>
                    <Ionicons
                      name="heart-outline"
                      style={styles.iconStyle}></Ionicons>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      style={styles.iconStyle}></Ionicons>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="paper-plane-outline"
                      style={styles.iconStyle}></Ionicons>
                  </TouchableOpacity>
                </View>
                <View style={styles.commentStyle}>
                  <Text style={styles.commentUserStyle}>
                    {'@' + currentUser.name + '  '}
                  </Text>
                  <Text style={styles.captionStyle}>{item.caption}</Text>
                </View>
              </View>
            );
          }}></FlatList>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  containerGallery: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  containerPost: {
    flex: 1,
    marginBottom: 10,
  },
  postHeader: {
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: 'grey',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  accountStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconStyle: {
    fontSize: 27,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  interactionBar: {
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  captionStyle: {
    flex: 7 / 10,
  },
  commentStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  commentUserStyle: {
    fontWeight: 'bold',
  },
});

export default PersonalPostsScreen;
