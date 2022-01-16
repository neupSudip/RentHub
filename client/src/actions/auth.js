import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};

export const signingoogle = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signInGoogle(formData);
    dispatch({ type: "AUTH", data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "SIGNUP", data });
    history("/login");
  } catch (error) {
    console.log(error.message);
  }
};
