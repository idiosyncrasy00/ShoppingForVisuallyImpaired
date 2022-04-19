import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { allReducers} from "../reducers"

//create a local storage
const persistConfig = {
  key: 'main-root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = createStore(persistedReducer, applyMiddleware());
const Persistor = persistStore(store);
//export const store1 = createStore(notReducer);
//const store = createStore(allReducers);

//export default store
export { Persistor }
//module.exports = { store, store1 }