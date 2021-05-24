import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  @observable Name = '';
  @observable phoneNumber = '100000';
  @observable password = '';
  @observable userInformation = {};
  @observable mainUserAuthenticationToken = null;
  @observable resetPasswordToken = null;

  constructor() {
    this.set_auth_token();
  }
  
  @action
  set_auth_token = async () => {
    const userAuthToken = await AsyncStorage.getItem('APP:UserAuthToken');
    if (userAuthToken){
      this.mainUserAuthenticationToken = userAuthToken;
    }
  };
  
  @action
  get_auth_token = async () => {
    if (this.mainUserAuthenticationToken) {
      return this.mainUserAuthenticationToken;
    }
    const userAuthToken = await AsyncStorage.getItem('APP:UserAuthToken');
    return userAuthToken;
  }
  
  @action fetch_user_details_from_auth_token = async () => {
    let response_fetched = false;
    let errors = {}
    const userAuthenticationToken = await this.get_auth_token();

    axios
      .get(`/v2/user_details`, {
        headers: {Authorization: `Token ${userAuthenticationToken}`},
      })
      .then((response) => {
        this.userInformation = response.data.data;
        response_fetched = true;
      })
      .catch((error) => {
        errors = error.response.data
      });

    return [response_fetched, errors];
  }
  setName = (name) => {
    // console.log('Name is set to  ', name);
    this.Name = name;
  };

  setPassword = (password) => {
    // console.log('password is set to  ', password);
    this.password = password;
  };
  @action
  setPhone = async (phoneNumber) => {
    let response_fetched = false;
    let errors = {}
    
    // console.log('phoneNumber is set to  ', phoneNumber);
    await axios
      .get(`/v2/users/find_phone_number?phone_number=${phoneNumber}`)
      .then((response) => {
        // console.log('My response is hello ' + JSON.stringify(response.data));
        this.phoneNumber = phoneNumber;
        response_fetched = true;
      })
      .catch((error) => {
        this.phoneNumber = phoneNumber;
        errors = error.response.data
      });

    return [response_fetched, errors];
  };

  @action
  registerUser = async () => {
    let response_fetched = false;
    // console.log(
    //   'registering user new',
    //   this.Name,
    //   this.phoneNumber,
    //   this.password,
    // );
    await axios
      .post('/v2/users', {
        sign_up: {
          name: this.Name,
          phone_number: this.phoneNumber,
          password: this.password,
          password_confirmation: this.password,
        },
      })
      .then((response) => {
        // console.log('signup Response-> ' + JSON.stringify(response.data));
        this.userInformation = response.data.data;
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        // console.log('bari zor ka error wajja hai signup per ' + error);
      });
    return response_fetched;
  };
  
  @action
  verify_sign_up_otp = async (current_otp) => {
    // console.log('User Logged In', this.phoneNumber)
    let response_fetched = false;
    let errors = {};
    await axios
      .put('/v2/users/verify_otp', {
        user: {
          phone_number: this.phoneNumber,
          current_otp: current_otp
        },
      })
      .then((response) => {
        this.userInformation = response.data.data;
        AsyncStorage.setItem(
          'APP:UserAuthToken',
          this.userInformation.attributes.authentication_token,
        );
        this.mainUserAuthenticationToken = this.userInformation.attributes.authentication_token
        response_fetched = true;
      })
      .catch((error) => {
        errors = error.response.data
      });
    return [response_fetched, errors];
  };
  
  
  @action
  loginUser = async (phone, password) => {
    let response_fetched = false;
    let errors = {}
    // console.log('sign in');
    await axios
      .post('/v2/users/sign_in', {
        sign_in: {
          phone_number: phone,
          password: password,
        },
      })
      .then((response) => {
        // console.log('signin Response-> ' + JSON.stringify(response.data.data));
        this.userInformation = response.data.data;
        AsyncStorage.setItem(
          'APP:UserAuthToken',
          this.userInformation.attributes.authentication_token
        );
        this.mainUserAuthenticationToken = this.userInformation.attributes.authentication_token
        response_fetched = true;
      })
      .catch((error) => {
        this.phoneNumber = phone;
        errors = error.response.data
      });
    return [response_fetched, errors];
  };
  
  @action
  forgot_password = async (phone_number) => {
    let response_fetched = false;
    let errors = {}
    // console.log('sign in');
    await axios
      .post('/v1/passwords/forgot', {
        user: {
          phone_number: phone_number
        },
      })
      .then((response) => {
        this.resetPasswordToken = response.data.data.attributes.reset_password_token
        response_fetched = true;
      })
      .catch((error) => {
        errors = error.response.data
      });
    return [response_fetched, errors];
  };
  
  @action
  reset_password = async (current_token, password, password_confirmation) => {
    let response_fetched = false;
    let errors = {}
    // console.log('sign in');
    await axios
      .post('/v1/passwords/reset', {
        user: {
          token: this.resetPasswordToken,
          current_otp: current_token,
          password: password,
          password_confirmation: password_confirmation
        },
      })
      .then((response) => {
        this.userInformation = response.data.data;
        AsyncStorage.setItem(
          'APP:UserAuthToken',
          this.userInformation.attributes.authentication_token
        );
        this.resetPasswordToken = null;
        this.mainUserAuthenticationToken = this.userInformation.attributes.authentication_token
        response_fetched = true;
      })
      .catch((error) => {
        errors = error.response.data
      });
    return [response_fetched, errors];
  };
}

export default User;
