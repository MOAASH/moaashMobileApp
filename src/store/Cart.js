import {observable, action} from 'mobx';
import axios from '../utils/axios';
import {observer} from 'mobx-react';

class Cart {
  @observable userToken = '';
  @observable invoiceID = '';
  @observable invoiceDetail = '';

  constructor() {}
  @action
  createInvoice = async (token, companyID, quantity, itemID) => {
    let k = false;
    this.userToken = token;
    console.log(
      'My user token is ',
      token,
      'and company ID is ',
      companyID,
      ' quantity is ',
      quantity,
      ' and item id is ',
      itemID,
    );
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
          headers: {
            Authorization: `Token ${this.userToken}`,
          },
        },
      )
      .then((response) => {
        console.log(
          'create invoce Response-> ' + JSON.stringify(response.data.data),
        );
        this.invoiceID = response.data.data.id;
        this.invoiceDetail = response.data.data.attributes;
        console.log('details ', this.invoiceDetail.net_amount);

        k = true;
        return k;
      })
      .catch((error) => {
        console.log('bari zor ka error wajja hai create invoicd per ' + error);
      });
    return k;
  };
}

export default Cart;
