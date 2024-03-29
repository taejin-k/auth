import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import userDataBaseReducer from "./userDataBaseSlice";
import modalReducer from "./modalSlice";

type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user: userReducer,
  userDataBase: userDataBaseReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal"],
};

const persistedReducer = persistReducer<RootStateType>(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
