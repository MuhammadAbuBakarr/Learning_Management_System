import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./userSlice";
import listReducer from "./listSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";

const reducer = combineReducers({
	loginReducer,
	listReducer,
	middleware: [applyMiddleware(thunk), getDefaultMiddleware()],
});

export const store = configureStore({
	reducer,
});
