import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const initialState = {
  username: "",
};

const persistConfig = {
  key: "user2",
  storage,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.username = "";
    },
  },
});

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
