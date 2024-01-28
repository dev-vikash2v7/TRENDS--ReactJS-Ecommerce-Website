import { PayloadAction, createSlice  } from '@reduxjs/toolkit';

import { CartState } from '../actionTypes';


const initialState: CartState = {
  cartList: [],
  totalPrice: 0,
  cartVisible : false
};

const CartSlice = createSlice({
    name: 'cart',

    initialState ,

    reducers: {
      setCartList : (state  , action : PayloadAction<CartState>) => {
          state.cartList = action.payload.cartList;
          state.totalPrice = action.payload.totalPrice;
      },
      changeCartVisible : (state  ) => {
          state.cartVisible = !state.cartVisible;
      },
    }
  })

export const {setCartList , changeCartVisible } = CartSlice.actions;

export default CartSlice.reducer