import { PayloadAction, createSlice  } from '@reduxjs/toolkit';

import { UserState, User } from '../actionTypes';



const initialState: UserState = {
  currentUser: {
    userId : '',
    email : '',
    refreshToken : '',
    accessToken : '',
  },
};

const AuthSlice = createSlice({
    name: 'user',

    initialState ,

    reducers: {
      setUser : (state  , action : PayloadAction<User>) => {
          state.currentUser = action.payload;
      },
    }
  })

export const {setUser } = AuthSlice.actions;

export default AuthSlice.reducer