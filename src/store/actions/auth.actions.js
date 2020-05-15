export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3CurQf9nvh6mNqm932LwVyQr7s0qaApM",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const resDate = await response.json();
    console.log(resDate);
    dispatch({
      type: SIGNUP,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3CurQf9nvh6mNqm932LwVyQr7s0qaApM",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const resDate = await response.json();
    console.log(resDate);
    dispatch({
      type: LOGIN,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
