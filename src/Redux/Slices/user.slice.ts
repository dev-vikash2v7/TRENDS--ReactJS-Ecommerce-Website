import { PayloadAction, createSlice  } from '@reduxjs/toolkit';

import { UserState, User } from '../actionTypes';



const initialState: UserState = {
  currentUser: null,
};

const AuthSlice = createSlice({
    name: 'user',

    initialState ,

    reducers: {
      setUser : (state  , action : PayloadAction<User>) => {
        //   AsyncStorage.setItem('user_'+action.payload?.id, JSON.stringify(action.payload));
        console.log(action.payload)
          state.currentUser = action.payload;
      },
    }
  })

export const {setUser } = AuthSlice.actions;

export default AuthSlice.reducer