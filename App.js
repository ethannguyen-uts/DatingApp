import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['']);
import React, {Component} from 'react';
import {View, Text, Button, LogBox} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import FeedScreen from './src/screens/FeedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PersonalPostsScreen from './src/screens/PersonalPostsScreen';
import AddScreen from './src/screens/AddScreen';
import LandingScreen from './src/screens/LandingScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SaveScreen from './src/screens/SaveScreen';
import SearchScreen from './src/screens/SearchScreen';
import UserScreen from './src/screens/UserScreen';
import MatchScreen from './src/screens/MatchScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import PersonalityTestScreen from './src/screens/PersonalityTestScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import EditUserDataScreen from './src/screens/EditUserDataScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as FeedProvider} from './src/context/FeedContext';
import {Provider as VideoProvider} from './src/context/VideoContext';
import {setNavigator} from './src/navigationRef';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

//Navigation options

ProfileScreen.navigationOptions = {
  headerShown: false,
};

MatchScreen.navigationOptions = {
  headerShown: true,
};
VideoCallScreen.navigationOptions = {
  headerShown: true,
};
PersonalityTestScreen.navigationOptions = {
  headerShown: false,
};
EditUserDataScreen.navigationOptions = {
  headerShown: false,
};
AddScreen.navigationOptions = {
  headerShown: false,
};

AccountScreen.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="settings-outline" color={tintColor} size={25} />
  ),
};

ChatListScreen.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="chatbubble-ellipses-outline" color={tintColor} size={25} />
  ),
};

FeedScreen.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="ios-newspaper-outline" color={tintColor} size={25} />
  ),
};

//

const HomeNavigator = createStackNavigator({
  Landing: {
    screen: LandingScreen,
  },
  Match: {
    screen: MatchScreen,
  },
  VideoCall: {
    screen: VideoCallScreen,
  },
  PersonalityTest: {
    screen: PersonalityTestScreen,
  },
});

HomeNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  if (
    navigation.state.index > 0 &&
    (navigation.state.routes[1].routeName === 'Match' ||
      navigation.state.routes[1].routeName === 'VideoCall')
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: 'Planet',
    tabBarIcon: ({tintColor}) => (
      <Ionicons name="planet-outline" color={tintColor} size={25} />
    ),
    tabBarVisible: tabBarVisible,
  };
};

const SearchNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
  },
  User: {
    screen: UserScreen,
  },
});

SearchNavigator.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="search-outline" color={tintColor} size={25} />
  ),
};

const PostNavigator = createStackNavigator({
  Add: {
    screen: AddScreen,
  },
  Save: SaveScreen,
});

PostNavigator.navigationOptions = {
  tabBarLabel: 'Post',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="add-circle-outline" color={tintColor} size={25} />
  ),
};

const PersonalNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  PersonalPosts: {
    screen: PersonalPostsScreen,
  },
  EditUserData: {
    screen: EditUserDataScreen,
  },
  EditProfile: {
    screen: EditProfileScreen,
  },
});

PersonalNavigator.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({tintColor}) => (
    <Ionicons name="person-circle-outline" color={tintColor} size={25} />
  ),
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  matchFlow: createStackNavigator({
    Home: LandingScreen,
    Match: MatchScreen,
    User: UserScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Home: {
      screen: HomeNavigator,
    },
    Feed: {
      screen: FeedScreen,
    },

    Post: {
      screen: PostNavigator,
    },
    ChatList: {
      screen: ChatListScreen,
    },
    Personal: {
      screen: PersonalNavigator,
    },
  }),
});
const App = createAppContainer(switchNavigator);
export default () => {
  return (
    <AuthProvider>
      <FeedProvider>
        <VideoProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </VideoProvider>
      </FeedProvider>
    </AuthProvider>
  );
};
