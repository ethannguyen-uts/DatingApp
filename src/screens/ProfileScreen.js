import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  Modal,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as FeedContext} from '../context/FeedContext';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Gallery from '../components/Gallery';
import Insight from '../components/Insight';
import firebase from '@react-native-firebase/app';
import Spinner from '../components/Spinner';
import Background from '../components/Background';
import {Container, Tab, Tabs, TabHeading, Icon} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = (props) => {
  const {signout} = useContext(AuthContext);
  const [imagePrompt, setImagePrompt] = useState(null);
  const {
    state: {currentUser},
    fetchUser,
  } = useContext(AuthContext);
  const {
    state: {posts, followings},
    fetchUserPosts,
    fetchUserFollowing,
  } = useContext(FeedContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    'This is my pickup line face',
  );
  const [facts, setFacts] = useState([
    {idx: 0},
    {idx: 1},
    {idx: 2},
    {idx: 3},
    {idx: 4},
    {idx: 5},
  ]);
  const [insightIndex, setInsightIndex] = useState(-1);

  console.log('Rendering Profile Screen');

  useEffect(() => {
    fetchUserFollowing();
    fetchUserPosts(firebase.auth().currentUser.uid);

    const listener = props.navigation.addListener('didFocus', () => {
      console.log('START LISTERNER!!!!!!!!!!!!!!!!!!!!!!');
      fetchUserPosts(firebase.auth().currentUser.uid);
      //fetchUser();
      console.log('END LISTERNER!!!!!!!!!!!!!!!!!!!!!!');
      return () => {
        listener.remove();
      };
    });
  }, []);

  const showModal = (idx) => {
    setModalVisible(true);
    setInsightIndex(idx);
  };

  const setImageInsight = (index, imageURL, facts) => {
    facts[index].url = imageURL;
    setFacts(facts);
  };

  if (!currentUser) {
    return <Spinner size="large" />;
  }
  return (
    <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
      <View style={styles.profileHeader}>
        <Text style={styles.accountStyle}>{currentUser.name}</Text>
      </View>
      <Container style={styles.tabContainer}>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Text>Me</Text>
              </TabHeading>
            }>
            <ScrollView style={{overflow: 'scroll', flex: 1}}>
              <Text style={{color: 'black', padding: 5, fontWeight: 'bold'}}>
                Insight
              </Text>
              <Insight facts={facts} showModal={showModal} />
              <Background />
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select a prompt</Text>
                    <DropDownPicker
                      items={[
                        {
                          label: 'This is my pickup line face',
                          value: 'This is my pickup line face',
                        },
                        {
                          label: 'One special abilities of me',
                          value: 'One special abilities of me',
                        },
                        {
                          label: 'The things I love most',
                          value: 'The things I love most',
                        },
                      ]}
                      defaultValue={selectedValue}
                      containerStyle={{height: 40, width: '95%'}}
                      style={{backgroundColor: '#fafafa'}}
                      itemStyle={{
                        justifyContent: 'flex-start',
                      }}
                      dropDownStyle={{backgroundColor: '#fafafa'}}
                      onChangeItem={() => setSelectedValue(item.value)}
                    />
                    <TouchableOpacity
                      style={styles.mediaContainer}
                      onPress={() => {
                        ImagePicker.openPicker({
                          width: 300,
                          height: 400,
                          cropping: true,
                        }).then((image) => {
                          console.log(image);
                          setImagePrompt(image);
                          setImageInsight(insightIndex, image.path, facts);
                        });
                      }}>
                      {imagePrompt ? (
                        <Image
                          style={styles.imagePrompt}
                          source={{uri: imagePrompt.path}}
                        />
                      ) : (
                        <Ionicons
                          name="images-outline"
                          style={styles.functionImage}></Ionicons>
                      )}
                    </TouchableOpacity>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Social & Post</Text>
              </TabHeading>
            }>
            <View style={styles.infoContainer}>
              <Image
                style={styles.imageProfile}
                source={{
                  uri: currentUser.hasOwnProperty('profileImageURL')
                    ? currentUser.profileImageURL
                    : null,
                }}
              />
              <View style={styles.followInfo}>
                <View style={styles.followNumberContainer}>
                  <Text style={styles.followNumber}>6</Text>
                  <Text>Followers</Text>
                </View>
                <View style={styles.followNumberContainer}>
                  <Text style={styles.followNumber}>5</Text>
                  <Text>Followings</Text>
                </View>
                <View style={styles.followNumberContainer}>
                  <Text style={styles.followNumber}>0</Text>
                  <Text>Influences</Text>
                </View>
              </View>
            </View>
            <Gallery posts={posts} />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('EditProfile');
              }}>
              <View style={styles.editButton}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                signout();
              }}>
              <View style={styles.editButton}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Video</Text>
              </TabHeading>
            }></Tab>
        </Tabs>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  profileHeader: {
    flexDirection: 'row',
    height: 35,
    marginHorizontal: 10,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  imageProfile: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginHorizontal: 7,
  },
  accountStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  iconMenuStyle: {
    position: 'absolute',
    marginHorizontal: 10,
    right: 50,
  },
  cancelButton: {
    position: 'absolute',
    top: 7,
    right: 0,
    color: 'orange',
  },
  followInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  followNumberContainer: {
    marginHorizontal: 5,
  },
  followNumber: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#eeeeee',
    alignItems: 'center',
    padding: 7,
    borderRadius: 5,
    margin: 10,
  },
  tabContainer: {
    marginTop: 0,
  },
  //modal
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mediaContainer: {
    width: '95%',
    height: '40%',
    borderColor: '#eee',
    borderWidth: 1,
    justifyContent: 'center',
  },
  functionImage: {
    fontSize: 200,
    alignSelf: 'center',
  },
  imagePrompt: {
    flex: 1,
    resizeMode: 'contain', // or 'stretch'
    marginBottom: 0,
  },
});

export default ProfileScreen;
