import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShippingAddress {
  @observable shippingAddressesList = [];

  constructor() {}
  
  @action
  getShippingAddresses = async () => {
    let response_fetched = false;
    let error_message    = {};
    const userAuthToken = await AsyncStorage.getItem('APP:UserAuthToken');;
    await axios
      .get(`/v1/customer_addresses`, { headers: { Authorization: `Token ${userAuthToken}` } }
      ).then((response) => {
        this.shippingAddressesList = response.data.data;
        response_fetched = true;
      }).catch((error) => {
        error_message = error.response.data;
      });

    return [response_fetched, error_message];   
  };
  
  @action
  createShippingAddress = async (addressParams) => {
    let response_fetched = false;
    let error_message    = {};
    const userAuthToken = await AsyncStorage.getItem('APP:UserAuthToken');;
    await axios
      .post(`/v1/customer_addresses`,{
        customer_address: addressParams
      }, { headers: { Authorization: `Token ${userAuthToken}` } }
      ).then((response) => {
        // this.shippingAddressesList = response.data.data;
        response_fetched = true;
      }).catch((error) => {
        error_message = error.response.data;
      });

    return [response_fetched, error_message];   
  };
}

export default ShippingAddress;
