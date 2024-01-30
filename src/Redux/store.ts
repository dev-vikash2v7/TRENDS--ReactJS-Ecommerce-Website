import userReducer from './Slices/user.slice';
import cartReducer from './Slices/cart.slice';
import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
      user: userReducer,
      cart: cartReducer,
  });

   
const persistConfig = {
  key: 'root',
  storage,
}
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)
  
//   export default store;


const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);
const persister = persistStore(store);

export {store, persister};
export type RootState = ReturnType<typeof store.getState>;