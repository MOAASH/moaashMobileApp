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
import Categories from './src/screens/Categories';
import Profile from './src/screens/Profile';
import BankDetails from './src/screens/BankDetails';
import Payments from './src/screens/Payments';
import ProductDetail from './src/screens/ProductDetail';
import ReferralEarn from './src/screens/ReferralEarn';
import MySharedProducts from './src/screens/MySharedProducts';
import Checkout from './src/screens/Checkout';
import AddMargin from './src/screens/AddMargin';
import AddShippingAddress from './src/screens/AddShippingAddress';
import OrderSummary from './src/screens/OrderSummary';
import OrderPlaced from './src/screens/OrderPlaced';
const MainTabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="home"
            size={28}
            color={focused ? Colors.color1 : Colors.color5}
          />
        ),
      },
    },
    Categories: {
      screen: Categories,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="list-alt"
            size={28}
            color={focused ? Colors.color1 : Colors.color5}
          />
        ),
        headerTitle: 'Categories',
      },
    },
    Orders: {
      screen: Orders,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="gift"
            size={28}
            color={focused ? Colors.color1 : Colors.color5}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="user"
            size={28}
            color={focused ? Colors.color1 : Colors.color5}
          />
        ),
      },
    },
  },

  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
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
        borderTopColor: Colors.Gray,
        shadowColor: 'transparent',
        backgroundColor: 'white',
        shadowColor: 'white',
      },
      activeBackgroundColor: 'transparent',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 12,
        color: 'black',
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
// const SwitchNavigation = createSwitchNavigator({});
const AppNavigator = createStackNavigator({
  // Start: {
  //   screen: SwitchNavigation,
  //   navigationOptions: {
  //     headerShown: false,
  //   },
  // },
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
  BankDetails: {
    screen: BankDetails,
    navigationOptions: {
      title: 'Enter Your Bank Details',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  Payments: {
    screen: Payments,
    navigationOptions: {
      title: 'My Payments',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  MySharedProducts: {
    screen: MySharedProducts,
    navigationOptions: {
      title: 'My Shared Products',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  ReferralEarn: {
    screen: ReferralEarn,
    navigationOptions: {
      title: 'Refer & Earn',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      title: 'Product Detail',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: {
      title: 'Checkout',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  AddMargin: {
    screen: AddMargin,
    navigationOptions: {
      title: 'Add your profit',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  AddShippingAddress: {
    screen: AddShippingAddress,
    navigationOptions: {
      title: 'Add Shipping Address',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  OrderSummary: {
    screen: OrderSummary,
    navigationOptions: {
      title: 'Order Summary',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  OrderPlaced: {
    screen: OrderPlaced,
    navigationOptions: {
      title: 'Order Placed',
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
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: {
      title: 'Product Detail',
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  // SignupName: {
  //   screen: ReferralEarn,
  //   navigationOptions: {
  //     title: 'Refer and Earn',
  //     headerTintColor: 'white',
  //     headerStyle: {
  //       backgroundColor: Colors.color2,
  //     },
  //   },
  // },
});
export default class MainApp extends Component {
  render() {
    const App = createAppContainer(AppNavigator);
    return (
      <Provider {...stores}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    );
  }
}
