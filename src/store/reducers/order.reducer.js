import { ADD_ORDER, FETCH_ORDERS } from "../actions/order.actions";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { items, totalAmmount, id, date } = action.payload;
      const newOrder = new Order(id, items, totalAmmount, date);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    case FETCH_ORDERS:
      return { orders: action.orders };
    default:
      return state;
  }
};

export default orderReducer;
