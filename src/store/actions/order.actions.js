export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (items, totalAmmount) => ({
  type: ADD_ORDER,
  payload: {
    items,
    totalAmmount,
  },
});
