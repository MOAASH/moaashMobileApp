import React, {Component} from 'react';
import {Provider} from 'mobx-react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';
import Colors from './src/utils/colors';
import Fonts from './src/utils/fonts';
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
import UserBankAccounts from './src/screens/UserBankAccounts';
import ItemGroupDetails from './src/screens/ItemGroupDetails';
import Payments from './src/screens/Payments';
import ProductDetail from './src/screens/ProductDetail';
import ReferralEarn from './src/screens/ReferralEarn';
import MySharedProducts from './src/screens/MySharedProducts';
import Invoice from './src/screens/Invoice';
import AddMargin from './src/screens/AddMargin';
import AddShippingAddress from './src/screens/AddShippingAddress';
import SelectShippingAddress from './src/screens/SelectShippingAddress';
import OrderSummary from './src/screens/OrderSummary';
import OrderPlaced from './src/screens/OrderPlaced';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartNavigator = createStackNavigator({
  Cart: {
    screen: Orders,
    navigationOptions: {
      title: 'Your Orders',
      headerTintColor: 'white',
      headerLeft: () => {
        return null;
      },
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  }
});

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
    // Categories: {
    //   screen: Categories,
    //   navigationOptions: {
    //     tabBarIcon: ({focused}) => (
    //       <FontAwesome
    //         name="list-alt"
    //         size={28}
    //         color={focused ? Colors.color1 : Colors.color5}
    //       />
    //     ),
    //     headerTitle: 'Categories',
    //   },
    // },
    // Orders: {
    //   screen: Orders,
    //   navigationOptions: {
    //     tabBarIcon: ({focused}) => (
    //       <FontAwesome
    //         name="gift"
    //         size={28}
    //         color={focused ? Colors.color1 : Colors.color5}
    //       />
    //     ),
    //   },
    // },
    Cart: {
      screen: CartNavigator,
      navigationOptions: {
        tabBarLabel: 'Orders',
        tabBarIcon: ({focused}) => (
          <FontAwesome
            name="shopping-cart"
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
// Profile.navigationOptions = ({navigation}) => {
//   console.log(navigation.state);
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible,
//   };
// };
// const SwitchNavigation = createSwitchNavigator({});

const AppNavigator = createStackNavigator({
  Start: {
    screen: Splash,
    navigationOptions: {
      headerShown: false,
    },
  },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  BankDetails: {
    screen: BankDetails,
    navigationOptions: {
      title: 'Enter Your Bank Account Details',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  ItemGroupDetails: {
    screen: ItemGroupDetails,
    navigationOptions: {
      title: 'Catalogue',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  UserBankAccounts: {
    screen: UserBankAccounts,
    navigationOptions: {
      title: 'Registered Bank Accounts',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
  },
  Invoice: {
    screen: Invoice,
    navigationOptions: {
      title: 'Cart',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  AddMargin: {
    screen: AddMargin,
    navigationOptions: {
      title: 'Add your Margin',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  AddShippingAddress: {
    screen: AddShippingAddress,
    navigationOptions: {
      title: 'Add Customer Address',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: Colors.color2,
      },
    },
  },
  SelectShippingAddress: {
    screen: SelectShippingAddress,
    navigationOptions: {
      title: 'Select Customer Address',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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
      headerTitleStyle: {
        fontFamily: Fonts.medium,
      },
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

export default class MainApp extends Component {
  render() {
    const App = createAppContainer(AppNavigator);
    // AsyncStorage.clear();
    return (
      <Provider {...stores}>
        <PaperProvider>
          <App />
          <FlashMessage position="bottom" />
        </PaperProvider>
      </Provider>
    );
  }
}
