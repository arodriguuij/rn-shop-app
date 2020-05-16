import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const addOrder = (items, totalAmmount) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rn-shop-app-47c26.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalAmmount,
          date: date.toISOString(),
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: resData.name,
        items,
        totalAmmount,
        date,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://rn-shop-app-47c26.firebaseio.com/orders/${userId}.json`
    );
    const resData = await response.json();
    const loadedOrders = [];
    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].items,
          resData[key].totalAmmount,
          new Date(resData[key].date)
        )
      );
    }
    dispatch({
      type: FETCH_ORDERS,
      orders: loadedOrders,
    });
  } catch (error) {
    throw error;
  }
};
