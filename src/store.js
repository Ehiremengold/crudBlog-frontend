import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./features/authentication/login/loginSlice.js";
import profileReducer from "./features/authentication/profile/profileSlice.js";
import postReducer from "./features/blog/postSlice.js";
import modalReducer from "./features/modal/modalSlice.js";
import bookmarkReducer from "./features/bookmark/bookmarkSlice.js";
import searchReducer from "./features/search/searchSlice.js";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  post: postReducer,
  modal: modalReducer,
  bookmark: bookmarkReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["_persist"],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
