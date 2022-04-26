const messages = (state = [], action) => {
  switch (action.type) {
    case "CREATE_CONVERSATION":
      return { ...state, conversations: action.payload };

    case "GET_CONVERSATION":
      return { ...state, conversations: action.payload };

    case "CREATE_MESSAGE":
      return { ...state, messages: action.payload };

    case "GET_MESSAGE":
      return { ...state, messages: action.payload };

    default:
      return state;
  }
};

export default messages;
