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
  @observable sharedGroups = [];
  @observable sharedItemGroupLinks = {};
  @observable itemgroupNumber;

  constructor() {}

  @action
  getShareItemGroups = async (token) => {
    let response_fetched = false;
    console.log('my token is ', token);
    this.userToken = token;
    await axios
      .get('/item_groups/shared', {
        headers: {
          Authorization: `Token ${this.userToken}`,
        },
      })
      .then((response) => {
        console.log('itemgroup Response-> ' + JSON.stringify(response.data));
        this.sharedGroups = response.data.data;
        this.sharedItemGroupLinks = response.data.links;
        response_fetched = true;
        return response_fetched;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai itemgroups per ' + error);
      });
    return response_fetched;
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
    this.itemgroupNumber = ID;
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
  @action
  itemGroupShared = async (itemgroupNumber) => {
    this.itemgroupNumber = itemgroupNumber;
    let response_fetched = false;
    let error_message = {};
    console.log(
      'Itemgroup number is ',
      itemgroupNumber,
      ' and token is ',
      this.userToken,
    );
    await axios
      .post(
        `/item_groups/${itemgroupNumber}/add_to_shared`,
        {},
        {
          headers: {
            Authorization: `Token ${this.userToken}`,
          },
        },
      )
      .then((response) => {
        console.log('shared response --------> ', response.data.data);
        response_fetched = true;
      })
      .catch((error) => {
        error_message = error.response;
      });
    console.log('done');

    return [response_fetched, error_message];
  };
}

export default Products;
