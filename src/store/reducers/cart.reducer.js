import { ADD_TO_CART, REMOVE_TO_CART } from "../actions/cart.actions";
import { ADD_ORDER } from "../actions/order.actions";
import { DELETE_PRODUCT } from "../actions/products.actions";
import Cart from "../../models/cart";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const { price, title } = action.product;
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new Cart(
          state.items[addedProduct.id].quantity + 1,
          price,
          title,
          state.items[addedProduct.id].sum + price
        );
      } else {
        updatedOrNewCartItem = new Cart(1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + price,
      };

    case REMOVE_TO_CART:
      const selectedItem = state.items[action.productId];
      const currentQuantity = selectedItem.quantity;
      let updateItems;
      if (currentQuantity > 1) {
        const updateItem = new Cart(
          selectedItem.quantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updateItems = { ...state.items, [action.productId]: updateItem };
      } else if (currentQuantity === 1) {
        updateItems = { ...state.items };
        delete updateItems[action.productId];
      }
      return {
        ...state,
        items: updateItems,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.id]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.id].sum;
      delete updatedItems[action.id];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};

export default cartReducer;
