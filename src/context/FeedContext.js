import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';
import firebase from '@react-native-firebase/app';
//require('firebase/firestore');

const USER_POSTS_STATE_CHANGE = 'USER_POSTS_STATE_CHANGE';
const USER_FOLLOWING_STATE_CHANGE = 'USER_FOLLOWING_STATE_CHANGE';

const feedReducer = (state, action) => {
  switch (action.type) {
    case USER_POSTS_STATE_CHANGE:
      return {...state, posts: action.payload};
    case USER_FOLLOWING_STATE_CHANGE:
      return {...state, followings: action.payload};
    default:
      return state;
  }
};

const fetchUserPosts = (dispatch) => async (uid) => {
  //console.log("Inside this fetch User Posts");
  if (!uid) return;
  var user = await firebase.auth().currentUser;
  if (user) {
    await firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('UserPosts')
      .orderBy('creation', 'desc')
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          //id of a post
          const id = doc.id;
          return {id, ...data};
        });
        dispatch({type: USER_POSTS_STATE_CHANGE, payload: posts});
      });
  } else {
    console.log('No user loged in');
  }
};

const fetchUserFollowing = (dispatch) => async (uid) => {
  console.log('Running fetch user following function');
  var user = await firebase.auth().currentUser;
  if (user) {
    await firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot((snapshot) => {
        let followings = snapshot.docs.map((doc) => {
          const data = doc.data();
          //id of a post
          const id = doc.id;
          return id;
        });
        dispatch({type: USER_FOLLOWING_STATE_CHANGE, payload: followings});
      });
  } else {
    console.log('No user loged in');
  }
};

const fetchUsersData = (dispatch) => async (uid) => {};

export const {Provider, Context} = createDataContext(
  feedReducer,
  {fetchUserPosts, fetchUserFollowing},
  {posts: [], followings: []},
);
