import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Container, Header, Tab, Tabs, ScrollableTab} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
//MaterialIcons
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

const AddScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);

  useEffect(() => {
    const listener = navigation.addListener('didFocus', async () => {
      return () => {
        listener.remove();
      };
    });
  }, []);

  const pickImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}, (result) => {
      if (!result.didCancel) {
        setImage(result.uri);
      }
    });
  };

  takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  flip = () => {
    setType(
      type === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };

  toggleFlash = () => {
    setFlashMode(
      flashMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.on
        : RNCamera.Constants.FlashMode.off,
    );
  };

  return (
    <Container>
      <Header hasTabs />
      <Tabs tabBarPosition="bottom" renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Gallery">
          <Button
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              }).then((image) => {
                console.log(image);
              });
            }}
            title="Open"></Button>
        </Tab>
        <Tab heading="Camera">
          <View style={styles.container}>
            <RNCamera
              ref={(ref) => {
                setCamera(ref);
              }}
              style={styles.preview}
              type={type}
              flashMode={flashMode}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onGoogleVisionBarcodesDetected={({barcodes}) => {
                console.log(barcodes);
              }}
            />
            <View style={styles.mainFunctionContainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleFlash();
                }}
                style={styles.icon}>
                <MaterialIcons
                  name="bolt"
                  style={{fontSize: 40, color: 'white'}}></MaterialIcons>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  takePicture();
                }}
                style={styles.icon}>
                <MaterialIcons
                  name="stop-circle"
                  style={{fontSize: 50, color: 'red'}}></MaterialIcons>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  flip();
                }}>
                <MaterialIcons
                  name="flip-camera-ios"
                  style={{fontSize: 30, color: 'white'}}></MaterialIcons>
              </TouchableOpacity>
            </View>

            {/*
   <View style={styles.cameraContainer}></View>
      {image && <Image style={styles.imageStyle} source={{uri: image}} />}
      <Button
        title="Flip"
        style={styles.buttonStyle}
        onPress={() => {}}></Button>
      <Button
        style={styles.buttonStyle}
        title="Take Picture"
        onPress={() => {
          takePicture();
        }}></Button>
      <Button
        style={styles.buttonStyle}
        title="Pick Image from Gallery"
        onPress={() => {
          pickImage();
        }}></Button>
      <Button
        style={styles.buttonStyle}
        title="Save"
        onPress={() => {
          navigation.navigate('Save', {image});
        }}></Button>
*/}
          </View>
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 120,
  },
  mainFunctionContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 20,
    borderColor: 'white',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonStyle: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
  },
});

export default AddScreen;
