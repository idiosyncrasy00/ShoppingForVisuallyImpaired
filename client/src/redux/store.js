import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import counterReducer from './counter'
import loginInfoReducer from './loginInfo'
import queryReducer from './query'

//create a local storage
const persistConfig = {
  key: 'main-root',
  storage,
}

const allReducers = combineReducers({
  counter: counterReducer,
  loginInfo: loginInfoReducer,
  query: queryReducer,
})

export const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})
export default store