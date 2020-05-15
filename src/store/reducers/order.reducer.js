import { ADD_ORDER } from "../actions/order.actions";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { items, totalAmmount } = action.payload;
      const newOrder = new Order(
        new Date().toString(),
        items,
        totalAmmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

export default orderReducer;
