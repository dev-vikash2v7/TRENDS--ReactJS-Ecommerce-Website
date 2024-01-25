import userReducer from './Slices/user.slice';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export default store;
