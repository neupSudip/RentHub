import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (userType) => API.get(`/posts/${userType}`);

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search/${searchQuery.userType}/api?location=${
      searchQuery.location || "none"
    }&title=${searchQuery.title || "none"}&tags=${searchQuery.tag || "none"}`
  );

export const fetchUserPosts = (id) => API.get(`/posts/user/${id}`);

export const fetchPostById = (id) => API.get(`/posts/post/${id}`);

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const postComment = (id, comment) =>
  API.post(`/posts/${id}/comment`, { comment });

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const verifyUser = (id) => API.get(`/user/verify/${id}`);

export const checkSend = (email) => API.get(`/user/forget/${email}`);

export const forgetPassword = (hashAndPass) =>
  API.post("/user/forget-password", hashAndPass);

export const signInGoogle = (formData) =>
  API.post("/user/signingoogle", formData);

export const fetchConversation = (userId) => API.get(`/conversation/${userId}`);

export const createConversation = (members) =>
  API.post("/conversation", members);

export const fetchMessage = (conversationId) =>
  API.get(`/message/${conversationId}`);

export const createMessage = (newMessage) => API.post("/message", newMessage);

export const getUserDetails = (id) => API.get(`/user/userdetails/${id}`);

export const getSavedPosts = (userId) => API.get(`/posts/savedposts/${userId}`);

export const savePost = (userId, postId) =>
  API.post(`/posts/savepost/${userId}/${postId}`);

export const removeSavedPost = (userId, postId) =>
  API.delete(`/posts/remove/${userId}/${postId}`);

export const hidePost = (postId) => API.put(`/posts/hide/${postId}`);

export const bookPost = (userId, postId) =>
  API.post(`/posts/bookpost/${userId}/${postId}`);
