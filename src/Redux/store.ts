import userReducer from './Slices/user.slice';
import cartReducer from './Slices/cart.slice';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export default store;
