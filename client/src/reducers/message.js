const messages = (state = [], action) => {
  switch (action.type) {
    case "CREATE_CONVERSATION":
      return { ...state, conversations: action.payload };

    case "GET_CONVERSATION":
      console.log(action.payload);
      return { ...state, conversations: action.payload };

    case "CREATE_MESSAGE":
      console.log(action.payload);
      return { ...state, messages: action.payload };

    case "GET_MESSAGE":
      console.log(action.payload);
      return { ...state, messages: action.payload };

    default:
      return state;
  }
};

export default messages;
