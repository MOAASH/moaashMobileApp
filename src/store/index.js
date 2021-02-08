import User from './User.js';
import Products from './Products.js';
import Cart from './Cart.js';
import ShippingAddress from './ShippingAddress.js';
import BankDetails from './BankDetails.js';

export default {
  User: new User(),
  Cart: new Cart(),
  Products: new Products(),
  BankDetails: new BankDetails(),
  ShippingAddress: new ShippingAddress()
};
