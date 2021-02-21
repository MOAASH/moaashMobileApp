import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';

class Products {
  @observable itemGroups = [];
  @observable currentItemGroup = {};
  @observable items = {};
  @observable companyDetails = {};
  @observable itemGroupLinks = {};
  @observable userToken = '';

  constructor() {}
  @action
  itemGroupShared = async (itemgroup) => {
    let response_fetched = false;
    let error_message = {};
    await axios
      .post(`/item_groups/${itemgroup}/add_to_shared`, {
        headers: {Authorization: `Token ${userAuthenticationToken}`},
      })
      .then((response) => {
        console.log('shared response --------> ', response.data.data);
        response_fetched = true;
      })
      .catch((error) => {
        error_message = error.response;
      });

    return [response_fetched, error_message];
  };
  @action
  getItemGroups = async (token, page) => {
    let response_fetched = false;
    console.log('my token is ', token);
    this.userToken = token;
    await axios
      .get(`/item_groups?page=${[page]}`, {
        headers: {
          Authorization: `Token ${this.userToken}`,
        },
      })
      .then((response) => {
        console.log('itemgroup Response-> ' + JSON.stringify(response.data));
        this.itemGroups = response.data.data;
        this.itemGroupLinks = response.data.links;
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai itemgroups per ' + error);
      });
    return response_fetched;
  };
  @action
  getItems = async (ID) => {
    let response_fetched = false;
    let currentItemGroup = {};
    let items = {};

    console.log('my item id is ', ID);
    await axios
      .get(`/item_groups/${ID}/items`, {
        headers: {
          Authorization: `Token ${this.userToken}`,
        },
      })
      .then((response) => {
        console.log('items Response-> ' + JSON.stringify(response.data));
        this.items = response.data.items_data;
        items = response.data.items_data;
        this.currentItemGroup = response.data.item_group_data.data;
        this.companyDetails = response.data.company.data;
        currentItemGroup = response.data.item_group_data.data;

        response_fetched = true;
        return [response_fetched, currentItemGroup, items];
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai items per ' + error);
      });
    return [response_fetched, currentItemGroup, items];
  };
}

export default Products;
