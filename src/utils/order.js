import Colors from './colors';

export const OrderState = {
  drafted: { name: 'drafted', color: Colors.warning },
  archived: { name: 'archived', color: Colors.error },
  returned: { name: 'returned', color: Colors.error },
  order_placed: { name: 'order_placed', color: Colors.success},
  delivered: { name: 'delivered', color: Colors.success},
  paid: { name: 'paid', color: Colors.success},
  unpaid: { name: 'unpaid', color: Colors.success}  
}
