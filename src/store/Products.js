import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from './User';
const user = new User();
class Products {
  @observable itemGroups = [];
  @observable currentItemGroup = {};
  @observable items = {};
  @observable companyDetails = {};
  @observable itemGroupLinks = {};
  @observable userToken = '';
  @observable sharedGroups = [];
  @observable sharedItemGroupLinks = {};
  @observable itemgroupNumber;

  constructor() {}

  @action
  getShareItemGroups = async (token) => {
    let response_fetched = false;
    const userAuthToken = user.get_auth_token()
    // console.log('my token is ', token);
    this.userToken = token;
    await axios
      .get('/v1/item_groups/shared', {
        headers: {
          Authorization: `Token ${userAuthToken}`,
        },
      })
      .then((response) => {
        // console.log('itemgroup Response-> ' + JSON.stringify(response.data));
        this.sharedGroups = response.data.data;
        this.sharedItemGroupLinks = response.data.links;
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        // console.log('bari zor ka error wajja hai itemgroups per ' + error);
      });
    return response_fetched;
  };
  
  @action
  getItemGroups = async (token, page, extra_params = {}) => {
    let response_fetched = false;
    const userAuthToken = user.get_auth_token();
    console.log('HELLLLLLLOOOO ------------> ',user.get_auth_token());
    // console.log('my token is ', token);
    await axios
      .get(`/v1/item_groups?page=${[page]}${extra_params}`, {
        headers: {
          Authorization: `Token ${userAuthToken}`,
        },
      })
      .then((response) => {
        // console.log('itemgroup Response-> ' + JSON.stringify(response.data));
        this.itemGroups = response.data.data;
        this.itemGroupLinks = response.data.links;
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        // console.log('bari zor ka error wajja hai itemgroups per ' + error);
      });
    return response_fetched;
  };
  @action
  getItems = async (ID) => {
    let response_fetched = false;
    let currentItemGroup = {};
    this.itemgroupNumber = ID;
    let items = {};
    const userAuthToken = user.get_auth_token()

    // console.log('my item id is ', ID);
    await axios
      .get(`/v1/item_groups/${ID}/items`, {
        headers: {
          Authorization: `Token ${userAuthToken}`,
        },
      })
      .then((response) => {
        // console.log('items Response-> ' + JSON.stringify(response.data));
        this.items = response.data.items_data;
        items = response.data.items_data;
        this.currentItemGroup = response.data.item_group_data.data;
        this.companyDetails = response.data.company.data;
        currentItemGroup = response.data.item_group_data.data;

        response_fetched = true;
        return [response_fetched, currentItemGroup, items];
      })
      .catch((error) => {
        // console.log('bari zor ka error wajja hai items per ' + error);
      });
    return [response_fetched, currentItemGroup, items];
  };
  @action
  itemGroupShared = async (itemgroupNumber) => {
    this.itemgroupNumber = itemgroupNumber;
    let response_fetched = false;
    let error_message = {};
    // console.log(
    //   'Itemgroup number is ',
    //   itemgroupNumber,
    //   ' and token is ',
    //   this.userToken,
    // );
    const userAuthToken = user.get_auth_token()
    await axios
      .post(
        `/v1/item_groups/${itemgroupNumber}/add_to_shared`,
        {},
        {
          headers: {
            Authorization: `Token ${userAuthToken}`,
          },
        },
      )
      .then((response) => {
        // console.log('shared response --------> ', response.data.data);
        response_fetched = true;
      })
      .catch((error) => {
        error_message = error.response;
      });
    // console.log('done');

    return [response_fetched, error_message];
  };
  
  @action
  getCategories = async () => {
    let response_fetched = false;
    let currentItemGroup = {};
    let categories = {};
    const userAuthToken = user.get_auth_token()

    // console.log('my item id is ', userAuthToken);
    await axios
      .get(`/v1/item_groups/categories`, {
        headers: {
          Authorization: `Token ${userAuthToken}`,
        },
      })
      .then((response) => {
        // console.log('items Response-> ' + JSON.stringify(response.data));
        
        categories = response.data.data
        response_fetched = true;
        return [response_fetched, categories];
      })
      .catch((error) => {
        // console.log('bari zor ka error wajja hai items per ' + error);
      });
    return [response_fetched, categories];
  }
}

export default Products;
