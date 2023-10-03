import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { postApi } from "./postApi";
import { userApi } from "./userApi";
import { authApi } from "./authApi";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
