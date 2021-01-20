import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';

class Products {
  @observable itemGroups = {};
  @observable currentItemGroup = {};
  @observable items = {};
  @observable companyDetails = {};

  @observable userToken = '';

  constructor() {}
  @action
  getItemGroups = async (token) => {
    let k = false;
    console.log('my token is ', token);
    this.userToken = token;
    await axios
      .get('/item_groups/', {
        headers: {
          Authorization: `Token ${this.userToken}`,
        },
      })
      .then((response) => {
        console.log('itemgroup Response-> ' + JSON.stringify(response.data));
        this.itemGroups = response.data.data;
        k = true;
        return k;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai itemgroups per ' + error);
      });
    return k;
  };
  @action
  getItems = async (ID) => {
    let k = false;
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

        k = true;
        return [k, currentItemGroup, items];
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai items per ' + error);
      });
    return [k, currentItemGroup, items];
  };
}

export default Products;
