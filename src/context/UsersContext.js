import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';
import firebase from '@react-native-firebase/app';

const USERS_DATA_STATE_CHANGE = 'USERS_DATA_STATE_CHANGE';
const USERS_POSTS_STATE_CHANGE = 'USERS_POSTS_STATE_CHANGE';

const usersReducer = (state, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersLoaded: state.userLoaded + 1,
        users: state.users.map((user) =>
          user.uid === action.payload.uid
            ? {...user, posts: action.payload.posts}
            : user,
        ),
      };
    default:
      return state;
  }
};

const fetchUsersData = (dispatch, getState) => (uid) => {
  const found = getState().usersState.users.some((el) => el.uid === uid);
  if (!found) {
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.docs.data();
          user.uid = snapshot.uid;
          dispatch({type: USERS_DATA_STATE_CHANGE, payload: user});
        }
      });
  }
};

const fetchUsersFollowingPosts = (dispatch, getState) => async (uid) => {
  console.log('Running fetch user following Posts function');
  var user = await firebase.auth().currentUser;
  if (user) {
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('UserPosts')
      .orderBy('creation', 'desc')
      .get()
      .then((snapshot) => {
        //Running sequenlly so can not retrieev the uid in the loop, has to look in the log
        const uid = snapshot.query.EP.path.segments[1];
        const user = getState().usersState.users.find((el) => el.uid === uid);
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          //id of a post
          const id = doc.id;
          return {id, ...data, user};
        });
        dispatch({type: USERS_POSTS_STATE_CHANGE, payload: {posts, uid}});
      });
  } else {
    console.log('No user loged in');
  }
};

export const {Provider, Context} = createDataContext(
  usersReducer,
  {clearErrorMessage},
  {users: [], userLoaded: 0},
);
