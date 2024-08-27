import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./api";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { rtkQueryLoadingHandler } from "./middleware";
// import app from "./app";
import {
  auth,
  merchant,
  branch,
  country,
  customer,
  language,
} from "./projects";

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    auth: auth.reducer,
    merchant: merchant,
    branch: branch,
    country: country,
    customer: customer,
    language: language,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rootApi.middleware)
      .concat(rtkQueryLoadingHandler),
});

export default store;
export const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof dispatch;
export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
