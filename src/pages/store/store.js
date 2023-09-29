import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import searchReducer from "./searchSlice";
//

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
//
//store.js
const persistConfig = {
  key: "counter",
  storage,
};
const reducers = combineReducers({
  product: productSlice,
  search: searchReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

//store.js
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persist = persistStore(store);
