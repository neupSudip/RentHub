import * as api from "../api";

export const getPosts = (userType, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(userType);
    dispatch({ type: "FETCH_ALL", payload: data });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostById(id);
    dispatch({ type: "FETCH_POST", payload: data });
    setLoading(false);
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const getUserPosts = (userId, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserPosts(userId);
    dispatch({ type: "FETCH_USER_POST", payload: data });
    setLoading(false);
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const getPostsBySearch =
  (searchQuery, setLoading) => async (dispatch) => {
    try {
      const {
        data: { data },
      } = await api.fetchPostsBySearch(searchQuery);
      dispatch({ type: "FETCH_SEARCH", payload: data });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    const { data } = await api.postComment(id, comment);
    dispatch({ type: "COMMENT", payload: data });

    return data.comments;
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const savePost = (userId, postId) => async (dispatch) => {
  try {
    await api.savePost(userId, postId);
    dispatch({ type: "SAVE_POST", payload: postId });
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPosts = (userId, setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getSavedPosts(userId);
    dispatch({ type: "GET_SAVED_POST", payload: data });
    setLoading(false);
  } catch (error) {
    console.log(error.response?.data.message);
  }
};

export const removeSavedPost = (userId, postId) => async (dispatch) => {
  try {
    await api.removeSavedPost(userId, postId);
    dispatch({ type: "REMOVE_SAVED_POST", payload: postId });
  } catch (error) {
    console.log(error.response?.data.message);
  }
};
