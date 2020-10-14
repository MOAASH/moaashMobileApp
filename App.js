import React, {Component} from 'react';
import {Provider} from 'mobx-react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import Colors from './src/utils/colors';
import stores from './src/store';
import Splash from './src/screens/Splash';
import MainLogin from './src/screens/MainLogin';
import Signup from './src/screens/Signup';
import Login from './src/screens/Login';

const AppNavigator = createSwitchNavigator({
  AuthLoading: Splash,
});
const testNavigator = createStackNavigator({
  MainLogin: {
    screen: MainLogin,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Signup',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
});
export default class MainApp extends Component {
  render() {
    const App = createAppContainer(testNavigator);
    return (
      <Provider {...stores}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    );
  }
}
