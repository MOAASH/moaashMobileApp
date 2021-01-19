import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';

class User {
  @observable Name = '';
  @observable phoneNumber = '';
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
  setPhone = (phoneNumber) => {
    console.log('phoneNumber is set to  ', phoneNumber);
    this.phoneNumber = phoneNumber;
  };

  @action
  registerUser = async () => {
    let k = false;
    console.log('registering user');
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

        k = true;
        return k;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai signup per ' + error);
      });
    return k;
  };
  @action
  loginUser = async (phone, password) => {
    let k = false;
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

        k = true;
        return k;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai signin per ' + error);
      });
    return k;
  };
  @action
  updateBankDetails = async () => {
    let k = false;
    console.log('Updating Bank Details');
    await axios
      .patch('/users/sign_in', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log('signin Response-> ' + JSON.stringify(response.data));

        k = true;
        return k;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai signin per ' + error);
      });
  };
}

export default User;
