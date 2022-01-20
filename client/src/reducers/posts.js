export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, posts: action.payload };
    case "FETCH_USER_POST":
      return { ...state, userPosts: action.payload };
    case "FETCH_POST":
      return { ...state, post: action.payload };
    case "FETCH_SEARCH":
      return { ...state, posts: action.payload };
    case "CREATE":
      return [...state, action.payload];
    case "COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;

          return post;
        }),
      };
    case "UPDATE":
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};
