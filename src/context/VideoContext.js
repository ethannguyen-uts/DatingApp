import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';
import firebase from '@react-native-firebase/app';
import io from 'socket.io-client';
import Peer from 'react-native-peerjs';
import auth from '@react-native-firebase/auth';

//* API URI*/

const HOST = '172.19.204.33';
const PORT = 8000;
const API_URI = `http://${HOST}:${PORT}`;
const PATH = '/peerjs/myapp';

//require('firebase/firestore');

const JOIN_CHAT = 'JOIN_CHAT';
const ADD_STREAM = 'ADD_STREAM';
const REMOVE_STREAM = 'REMOVE_STREAM';
const MY_STREAM = 'MY_STREAM';
const ADD_REMOTE_STREAM = 'ADD_REMOTE_STREAM';
const RECEIVING_CALL_SIGNAL = 'RECEIVING_CALL_SIGNAL';
const SET_CALL_ACCEPTED = 'SET_CALL_ACCEPTED';
const END_CALL = 'END_CALL';
const ADD_PEER = 'ADD_PEER';

const videoReducer = (state, action) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        peerServer: action.payload,
      };
    case MY_STREAM:
      return {...state, myStream: action.payload};
    case ADD_STREAM:
      console.log('adding Stream');
      return {
        ...state,
        streams: [...state.streams, action.payload],
      };
    case END_CALL:
      console.log('End Call');
      return {
        ...state,
        peerServer: null,
        myStream: null,
        streams: [],
        receivingCall: false,
        callAccepted: false,
        caller: null,
      };
    case RECEIVING_CALL_SIGNAL:
      return {
        ...state,
        receivingCall: action.payload.receivingCall,
        caller: action.payload.caller,
      };
    case SET_CALL_ACCEPTED:
      return {
        ...state,
        callAccepted: action.payload,
      };
    default:
      return state;
  }
};

/* Socket config */
const socket = io(`${API_URI}`, {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 3,
  jsonp: false,
});
socket.on('connect', () => console.log('connected to socket' + socket.id));
socket.on('error', console.error);
socket.on('connect_error', console.error);

socket.on('user-connected', (data) => {
  console.log('User join the room: ' + data);
});

const addUserStream = (dispatch) => async (stream) => {
  dispatch({type: MY_STREAM, payload: stream});
};

const endCall = (dispatch) => async (userId, peerServer) => {
  socket.emit('endcall', userId);

  console.log(peerServer);
  if (peerServer) peerServer.destroy();
  navigate('Landing');
};

//Join a room on server
const joinRoom = (dispatch) => async (stream, userId) => {
  let roomID =
    Math.random().toString(36) + '0000000000000000000'.substring(2, 16);
  //only one room
  roomID = '0.ghm4zo49xv00000000000000';
  socket.emit('joinroom', {userId, roomID});
  console.log('Join room');
  //Open connection to derver
  socket.on('user-connected', (userId) => {
    console.log(userId + ' connected');
  });
  //Socket for auto matching function:
  socket.on('partnerFound', (data) => {
    //the person to start the call
    if (data.makeCall) {
      const peerServer = new Peer(auth().currentUser.uid, {
        host: HOST,
        secure: false,
        port: PORT,
        path: PATH,
      });
      peerServer.on('error', (error) => {
        console.log(error);
      });
      peerServer.on('disconnected', (error) => {
        console.log('Peer Disconnected');
        socket.emit('userDisconnect', auth().currentUser.uid);
      });
      peerServer.on('open', (userId) => {
        socket.emit('callUser', {userToCall: data.partnerId, from: userId});
        dispatch({type: SET_CALL_ACCEPTED, payload: true});
        const mediaConnection = peerServer.call(data.partnerId, stream);
        mediaConnection.on('stream', (stream) => {
          dispatch({type: ADD_STREAM, payload: stream});
        });
        mediaConnection.on('close', function () {
          peerServer.destroy();
          dispatch({type: END_CALL, payload: ''});
          navigate('Landing');
        });
      });
      //Add a peerServer to Context
      dispatch({type: ADD_PEER, payload: peerServer});
    }
    //The person to receive the call
    if (!data.makeCall) {
      /*Peer Config */
      const peerServer = new Peer(auth().currentUser.uid, {
        host: HOST,
        secure: false,
        port: PORT,
        path: PATH,
      });
      peerServer.on('error', (error) => {
        console.log(error);
      });
      peerServer.on('disconnected', (error) => {
        console.log('Peer Disconnected');
        socket.emit('userDisconnect', auth().currentUser.uid);
      });
      peerServer.on('open', (userId) => {
        console.log('Open connection to peer server' + userId);

        if (true /*isAccept*/) {
          socket.emit('acceptCall', {to: data.caller});
        }
      });
      peerServer.on('call', (mediaConnection) => {
        mediaConnection.answer(stream);
        mediaConnection.on('stream', (stream) => {
          console.log('media connection on stream');
          dispatch({type: ADD_STREAM, payload: stream});
        });
        mediaConnection.on('close', function () {
          peerServer.destroy();
          dispatch({type: END_CALL, payload: ''});
          navigate('Landing');
        });
      });
      dispatch({type: SET_CALL_ACCEPTED, payload: true});
      //Add a peerServer to Context
      dispatch({type: ADD_PEER, payload: peerServer});
    }
  });

  //accept a call for call video function
  socket.on('hey', (data) => {
    console.log('Hey  is calling you');
    dispatch({
      type: RECEIVING_CALL_SIGNAL,
      payload: {receivingCall: true, caller: data.from},
    });
  });
};

export const {Provider, Context} = createDataContext(
  videoReducer,
  {joinRoom, addUserStream, endCall},
  {
    peerServer: null,
    myStream: null,
    streams: [],
    receivingCall: false,
    caller: null,
    callAccepted: false,
  },
);
