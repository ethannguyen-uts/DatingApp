import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { mediaDevices, RTCView, MediaStreamTrack } from 'react-native-webrtc';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as VideoContext } from '../context/VideoContext';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/dist/Feather';

const VideoCallScreen = () => {

  const {
    state: { currentUser },
    fetchUser,
  } = useContext(AuthContext);


  const {
    state: { myStream, streams, peerServer },
    joinRoom, addUserStream, endCall
  } = useContext(VideoContext);

  const [front, setFront] = useState(true);

  useEffect(() => {
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (front ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: front ? 'user' : 'environment',
            deviceId: videoSourceId,
          },
        })
        .then((stream) => {
          console.log('got stream');
          // Add your stream
          addUserStream(stream);
          // Join a room on Server
          joinRoom(stream, auth().currentUser.uid);
        })
        .catch((error) => {
          // Log error
        });
    });
  }, []);

  //Function
  const flip = () => {
    MediaStreamTrack.prototype._switchCamera()
  };

  return (
    <SafeAreaView style={styles.container}>
      { streams.length > 0 && streams[0] ? (
        <View style={styles.partnerVideo}>
          <RTCView objectFit='cover'
            style={{ flex: 1, width: "100%", height: "100%" }}
            streamURL={streams[0].toURL()}></RTCView>
        </View>
      ) : null}
      {myStream ? (
        <View style={styles.userVideo}>
          <RTCView objectFit='cover'
            style={{ borderRadius: 10, width: 150, height: 200 }}
            streamURL={myStream.toURL()}></RTCView>
        </View>
      )
        : (<Text>Your stream is not available</Text>)
      }
      <View style={styles.functionContainer}>
      <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            cameraOff();
          }}>
          <Feather
            name="layout"
            style={{ fontSize: 30, color: "white"  }}></Feather>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            cameraOff();
          }}>
          <Feather
            name="camera-off"
            style={{ fontSize: 30, color: "white"  }}></Feather>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            offMic();
          }}>
          <Feather
            name="mic-off"
            style={{ fontSize: 30, color: "white"  }}></Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            flip();
          }}>
          <Feather
            name="refresh-ccw"
            style={{ fontSize: 30, color: "white" }}></Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            endCall(auth().currentUser.uid, peerServer);
          }}>
          <Feather
            name="x"
            style={{ fontSize: 30, color: "white" }}></Feather>
        </TouchableOpacity>
  
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  userVideo: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 30,
    overflow: 'hidden',
    right: 0,
    top: 10,
    position: 'absolute',

  },
  partnerVideo: {
    flex: 1,
  },
  functionContainer: {
    width: "100%",
    height: 30,
    flexDirection: 'row',
    position: "absolute",
    bottom: 50,
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    color: "white"
  },
});

export default VideoCallScreen;
