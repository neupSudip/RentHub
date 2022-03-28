import { combineReducers } from "redux";

import posts from "./posts";

import authReducer from "./auth";

import messages from "./message";

export default combineReducers({ posts, authReducer, messages });
