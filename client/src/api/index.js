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

export const fetchPosts = () => API.get("/posts");

export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?location=${searchQuery.location || "none"}&title=${
      searchQuery.title || "none"
    }&tags=${searchQuery.tag || "none"}`
  );

export const fetchUserPosts = (id) => API.get(`/posts/user/${id}`);

export const fetchPostById = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const signInGoogle = (formData) =>
  API.post("/user/signingoogle", formData);
