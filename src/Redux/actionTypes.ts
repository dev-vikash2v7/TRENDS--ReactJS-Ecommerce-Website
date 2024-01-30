// userActionTypes.ts
import { ICartItem } from "../types/types";

export const SET_USER = 'SET_USER';
export const SET_CART = 'SET_CART';

export interface User {
  userId: string | null;
  email: string | null;
  accessToken : string | null,
  refreshToken : string | null
}

export interface UserState {
    currentUser: User ;
  }

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}


export interface CartState {
  cartList: ICartItem[] | [];
  totalPrice: number | 0;
  cartVisible : boolean | false,
  userId : string | null,

}

export interface IUpdateQuantity {
  productId: number ;
  newQuantity : number ;
}





interface SetCartAction {
  type: typeof SET_CART;
  payload: CartState;
}

export type UserAction = SetUserAction;
export type CartAction = SetCartAction;
