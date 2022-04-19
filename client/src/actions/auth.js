import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });
    history("/");
    window.location.reload();
  } catch (error) {
    return error.response?.data.message;
  }
};

export const signingoogle = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signInGoogle(formData);
    console.log(data);
    dispatch({ type: "AUTH", data });
    history("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
    return error.response?.data.message;
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "SIGNUP", data });
    history("/login");
  } catch (error) {
    return error.response?.data.message;
  }
};

export const userVerify = (id) => async (dispatch) => {
  try {
    const response = await api.verifyUser(id);
    return response.data.message;
  } catch (error) {
    return error.response?.data.message;
  }
};

export const checkSend = (email) => async (dispatch) => {
  try {
    const response = await api.checkSend(email);
    return response.data.message;
  } catch (error) {
    return error.response?.data.message;
  }
};

export const forgetPassword = (hashAndPass) => async (dispatch) => {
  try {
    const response = await api.forgetPassword(hashAndPass);
    return response.data.message;
  } catch (error) {
    return error.response?.data.message;
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserDetails(id);
    return data;
  } catch (error) {
    return error.response?.data.message;
  }
};
