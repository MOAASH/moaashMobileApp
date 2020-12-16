import React, {Component} from 'react';
import {Provider} from 'mobx-react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from './src/utils/colors';
import stores from './src/store';
import Splash from './src/screens/Splash';
import StartScreen from './src/screens/StartScreen';
import SignupName from './src/screens/SignupName';
import SignupPhone from './src/screens/SignupPhone';
import SignupPassword from './src/screens/SignupPassword';
import SignupConfirmPassword from './src/screens/SignupConfirmPassword';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Orders from './src/screens/Orders';
import Profile from './src/screens/Profile';
import BankDetails from './src/screens/BankDetails';
import Payments from './src/screens/Payments';
import ReferralEarn from './src/screens/ReferralEarn';
const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({focused}) => <FontAwesome name="home" size={28} />,
      },
    },
    Orders: {
      screen: Orders,
      navigationOptions: {
        tabBarIcon: ({focused}) => <FontAwesome name="gift" size={28} />,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({focused}) => <FontAwesome name="user-o" size={28} />,
      },
    },
  },

  {
    tabBarPosition: 'bottom',
    //tabBarComponent: (props) => <CustomTabComponent {...props}/>,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      showIndicator: false,
      titleStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTopColor: '#2c4452',
        shadowColor: 'transparent',
        backgroundColor: 'transparent',
        shadowColor: 'red',
        elevation: 2,
      },
      activeBackgroundColor: 'transparent',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 14,
        color: '#fff',
        position: 'relative',
        alignSelf: 'center',
      },
      iconStyle: {
        marginBottom: 5,
        marginTop: 5,
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,

        shadowColor: 'transparent',
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
    },
  },
);

Home.navigationOptions = ({navigation}) => {
  console.log(navigation.state);
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
Orders.navigationOptions = ({navigation}) => {
  console.log(navigation.state);
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
Profile.navigationOptions = ({navigation}) => {
  console.log(navigation.state);
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const AppNavigator = createStackNavigator({
  StartScreen: {
    screen: StartScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login to your account',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  SignupName: {
    screen: SignupName,
    navigationOptions: {
      title: 'Create your account',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  SignupPhone: {
    screen: SignupPhone,
    navigationOptions: {
      title: 'Create your account',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  SignupPassword: {
    screen: SignupPassword,
    navigationOptions: {
      title: 'Create your account',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  SignupConfirmPassword: {
    screen: SignupConfirmPassword,
    navigationOptions: {
      title: 'Create your account',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  AuthLoading: {
    screen: MainTabs,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const testNavigator = createStackNavigator({
  // Login: {
  //   screen: Profile,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
  // SignupName: {
  //   screen: BankDetails,
  //   navigationOptions: {
  //     title: 'Enter your bank details',
  //     headerTintColor: 'white',
  //     headerStyle: {
  //       backgroundColor: Colors.color2,
  //     },
  //   },
  // },
  SignupName: {
    screen: ReferralEarn,
    navigationOptions: {
      title: 'Refer and Earn',
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
