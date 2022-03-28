import * as api from "../api";

export const getConversation = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchConversation(userId);
    dispatch({ type: "GET_CONVERSATION", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = (newMessage) => async (dispatch) => {
  try {
    const { data } = await api.createMessage(newMessage);
    console.log(data);
    // dispatch({ type: "CREATE_MESSAGE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = (conversationId) => async (dispatch) => {
  try {
    const { data } = await api.fetchMessage(conversationId);
    dispatch({ type: "GET_MESSAGE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createConversation = (members) => async (dispatch) => {
  try {
    const { data } = await api.createConversation(members);
    dispatch({ type: "CREATE_CONVERSATION", payload: data });
  } catch (error) {
    console.log(error);
  }
};
