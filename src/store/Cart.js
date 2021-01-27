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
  fetchInvoice = async (token) => {
    let response_fetched = false;
    let error_message    = {};
    const fetchInvoiceIdFromStorage = await AsyncStorage.getItem('APP:CurrentInvoiceId');;
    if (fetchInvoiceIdFromStorage != null){
      await axios
        .get(`/invoices/${fetchInvoiceIdFromStorage}`, { headers: { Authorization: `Token ${token}` } }
        ).then((response) => {
          this.invoiceID = response.data.data.id;
          this.invoiceDetail = response.data.data.attributes;
          response_fetched = true;
        }).catch((error) => {
          error_message = error.response;
        })
    } else {
      error_message = { error: 'Invoice not found.' }
    }
    return [response_fetched, error_message];    
  };
  
  @action
  addToInvoice = async (token, invoice_params) => {
    try {
      const invoiceId = await AsyncStorage.getItem('APP:CurrentInvoiceId');
      let response_fetched = false;
      console.log('=====InvoiceID', invoiceId);
      if (invoiceId == null){
        response_fetched = await this.createInvoice(token, invoice_params);
      } else {
        console.log('=====LOLOLOLOLOL');
        response_fetched = await this.updateInvoice(token, invoice_params, invoiceId);
      }
      return response_fetched;
    } catch(e) {
      console.log('=========>',e);
      return false;
    }
  
  };
  
  @action
  invoiceParams = (companyID, invoice_line_items_attributes = [], margin = undefined, customer_address_id = undefined ) => {
    invoice_params = {};
    invoice_params.company_id = companyID;
    if (invoice_line_items_attributes.length != 0){
      invoice_params.invoice_line_items_attributes = invoice_line_items_attributes;
    };
    if (margin){
     invoice_params.margin = margin;
    };
    if (customer_address_id){
      invoice_params.customer_address_id = customer_address_id;
     };
    console.log('Invoice Params ------> ', JSON.stringify(invoice_params));
    return invoice_params;
  };
  
  createInvoice = async (token, invoiceParams) => {
    let response_fetched = false;
    let error_message    = {};
    // console.log('My user token is ',token,'and company ID is ',companyID,' quantity is ',quantity,' and item id is ',itemID,);
    await axios
      .post(
        '/invoices',
        {
          invoice: invoiceParams
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
  
  updateInvoice = async (token, invoiceParams, invoiceID) => {
    let response_fetched = false;
    let error_message    = {};
    // console.log('My user token is ',token,'and company ID is ',companyID,' quantity is ',quantity,' and item id is ',itemID,);
    await axios
      .patch(
        `/invoices/${invoiceID}`,
        {
          invoice: invoiceParams
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

