import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Cart {
  @observable userToken = '';
  @observable invoiceID = '';
  @observable invoiceDetail = '';

  constructor() {}
  
  @action
  addToInvoice = async (token, companyId, quantity, itemId) => {
    try {
      const invoiceId = await AsyncStorage.getItem('APP:CurrentInvoiceId');
      let response_fetched = false;
      console.log('=====InvoiceID', invoiceId);
      if (invoiceId == null){
        response_fetched = await this.createInvoice(token, companyId, quantity, itemId);
      } else {
        console.log('=====LOLOLOLOLOL');
        response_fetched = await this.updateInvoice(token, companyId, quantity, itemId, invoiceId);
      }
      return response_fetched;
    } catch(e) {
      console.log('=========>',e);
      return false;
    }
  
  };
  
  
  createInvoice = async (token, companyID, quantity, itemID) => {
    let response_fetched = false;
    let error_message    = {};
    console.log('My user token is ',token,'and company ID is ',companyID,' quantity is ',quantity,' and item id is ',itemID,);
    await axios
      .post(
        '/invoices',
        {
          invoice: {
            company_id: companyID,
            invoice_line_items_attributes: [
              {
                item_id: itemID,
                quantity: quantity,
              },
            ],
          },
        },
        {
          headers: { Authorization: `Token ${token}`,
          },
        },
      )
      .then((response) => {
        console.log('create invoce Response-> ' + JSON.stringify(response.data.data));
        this.invoiceID = response.data.data.id;
        this.invoiceDetail = response.data.data.attributes;
        AsyncStorage.setItem('APP:CurrentInvoiceId', this.invoiceID);
        console.log('details ', this.invoiceDetail.net_amount);

        response_fetched = true;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai create invoicd per ' + error);
        error_message = error.response.data;
      });
      return [response_fetched, error_message];
    };
  
  updateInvoice = async (token, companyID, quantity, itemID, invoiceID) => {
    let response_fetched = false;
    let error_message    = {};
    console.log('My user token is ',token,'and company ID is ',companyID,' quantity is ',quantity,' and item id is ',itemID,);
    await axios
      .patch(
        `/invoices/${invoiceID}`,
        {
          invoice: {
            company_id: companyID,
            invoice_line_items_attributes: [
              {
                item_id: itemID,
                quantity: quantity,
              },
            ],
          },
        },
        {
          headers: { Authorization: `Token ${token}`,
          },
        },
      )
      .then((response) => {
        console.log('Update invoce Response-> ' + JSON.stringify(response.data.data));
        this.invoiceID = response.data.data.id;
        this.invoiceDetail = response.data.data.attributes;
        console.log('details ', this.invoiceDetail.net_amount);

        response_fetched = true;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai update invoicd per ', error.response.data);
        error_message = error.response.data;
        console.log('ERROR ====> ',error_message);
      });
    return [response_fetched, error_message];
  };
}

export default Cart;
