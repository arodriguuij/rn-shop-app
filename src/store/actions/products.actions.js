export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import Product from "../../models/product";

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId;
    const response = await fetch(
      "https://rn-shop-app-47c26.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
          )
          );
        }
    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter((prod => prod.ownerId === userId)),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const response = await fetch(
    `https://rn-shop-app-47c26.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) throw new Error("Something went wrong!");

  dispatch({
    type: DELETE_PRODUCT,
    id,
  });
};

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch,
  getState
) => {
  try {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-shop-app-47c26.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-shop-app-47c26.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, description, imageUrl }),
    }
  );
  if (!response.ok) throw new Error("Something went wrong!");

  dispatch({
    type: UPDATE_PRODUCT,
    payload: {
      id,
      title,
      description,
      imageUrl,
    },
  });
};
