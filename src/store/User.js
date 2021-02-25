import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  @observable Name = '';
  @observable phoneNumber = '100000';
  @observable password = '';
  @observable userInformation = {};

  constructor() {}
  setName = (name) => {
    console.log('Name is set to  ', name);
    this.Name = name;
  };

  setPassword = (password) => {
    console.log('password is set to  ', password);
    this.password = password;
  };
  @action
  setPhone = async (phoneNumber) => {
    let response_fetched = false;
    console.log('phoneNumber is set to  ', phoneNumber);
    await axios
      .get(`/users/find_phone_number?phone_number=${phoneNumber}`)
      .then((response) => {
        console.log('My response is hello ' + JSON.stringify(response.data));
        this.phoneNumber = phoneNumber;
      })
      .catch((error) => {
        console.log('error ', error);
        this.phoneNumber = phoneNumber;
        response_fetched = true;
      });

    return response_fetched;
  };

  @action
  registerUser = async () => {
    let response_fetched = false;
    console.log(
      'registering user new',
      this.Name,
      this.phoneNumber,
      this.password,
    );
    await axios
      .post('/users', {
        sign_up: {
          name: this.Name,
          phone_number: this.phoneNumber,
          password: this.password,
          password_confirmation: this.password,
        },
      })
      .then((response) => {
        console.log('signup Response-> ' + JSON.stringify(response.data));
        this.userInformation = response.data.data;
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai signup per ' + error);
      });
    return response_fetched;
  };
  @action
  loginUser = async (phone, password) => {
    let response_fetched = false;
    console.log('sign in');
    await axios
      .post('/users/sign_in', {
        sign_in: {
          phone_number: phone,
          password: password,
        },
      })
      .then((response) => {
        console.log('signin Response-> ' + JSON.stringify(response.data.data));
        this.userInformation = response.data.data;
        AsyncStorage.setItem(
          'APP:UserAuthToken',
          this.userInformation.attributes.authentication_token,
        );
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai signin per ' + error);
      });
    return response_fetched;
  };
  @action
  updateBankDetails = async () => {
    let response_fetched = false;
    console.log('Updating Bank Details');
    await axios
      .patch('/users/sign_in', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log('signin Response-> ' + JSON.stringify(response.data));

        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai signin per ' + error);
      });
  };
}

export default User;
