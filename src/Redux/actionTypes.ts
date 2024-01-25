// userActionTypes.ts

export const SET_USER = 'SET_USER';

export interface User {
  userId: string;
  email: string;
}

export interface UserState {
    currentUser: User | null;
  }

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export type UserAction = SetUserAction;
