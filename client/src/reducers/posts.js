export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, posts: action.payload };

    case "FETCH_USER_POST":
      return { ...state, userPosts: action.payload };

    case "GET_SAVED_POST":
      return { savedPosts: action.payload };

    case "SAVE_POST":
      return { ...state, savedPosts: action.payload };

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
      return {
        userPosts: state.userPosts.filter(
          (post) => post._id !== action.payload
        ),
      };
    case "REMOVE_SAVED_POST":
      return {
        savedPosts: state.savedPosts.filter(
          (post) => post._id !== action.payload
        ),
      };

    case "HIDE_POST":
      let newPosts = [];
      state.userPosts.map((post) => {
        if (post._id === action.payload) {
          console.log(post.status);
          post.status = !post.status;
          newPosts.push(post);
        } else {
          newPosts.push(post);
        }
      });
      return {
        userPosts: newPosts,
      };

    case "BOOK_POST":
      return { ...state, bookedPosts: action.payload };

    default:
      return state;
  }
};
