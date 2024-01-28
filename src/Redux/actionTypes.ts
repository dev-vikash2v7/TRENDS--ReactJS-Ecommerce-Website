// userActionTypes.ts
import { ICartItem } from "../types/types";

export const SET_USER = 'SET_USER';
export const SET_CART = 'SET_CART';

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



export interface CartState {
  cartList: ICartItem[] | [];
  totalPrice: number | 0;
  cartVisible : boolean | false
}

interface SetCartAction {
  type: typeof SET_CART;
  payload: CartState;
}

export type UserAction = SetUserAction;
export type CartAction = SetCartAction;
