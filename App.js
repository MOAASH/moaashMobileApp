import React, { Component } from "react";
import { Provider } from "mobx-react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import stores from "./src/store";
import Splash from "./src/screens/Splash"
import MainLogin from "./src/screens/MainLogin"

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