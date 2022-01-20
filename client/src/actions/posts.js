import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostById(id);
    dispatch({ type: "FETCH_POST", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserPosts(userId);
    console.log(data);
    dispatch({ type: "FETCH_USER_POST", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: "FETCH_SEARCH", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    const { data } = await api.postComment(id, comment);
    dispatch({ type: "COMMENT", payload: data });

    return data.comments;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.response.data.message);
  }
};
