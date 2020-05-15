import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products.actions";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: [
          ...state.userProducts.filter((product) => product.id !== action.id),
        ],
        availableProducts: [
          ...state.availableProducts.filter(
            (product) => product.id !== action.id
          ),
        ],
      };
    case CREATE_PRODUCT:
      const date = new Date();
      const newProduct = new Product(
        date.toString(),
        "u1",
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        parseFloat(action.payload.price) 
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );

      const actualProduct = state.userProducts[productIndex];
      const updateProduct = new Product(
        action.payload.id,
        actualProduct.ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        actualProduct.price
      );

      const updateUserProduct = [...state.userProducts];
      updateUserProduct[productIndex] = updateProduct;
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductIndex] = updateProduct;

      return {
        ...state,
        userProducts: updateUserProduct,
        availableProducts: updateAvailableProducts,
      };
    default:
      return state;
  }
};

export default productsReducer;
