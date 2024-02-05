import { PayloadAction, createSlice  } from '@reduxjs/toolkit';

import { CartState, IUpdateQuantity } from '../actionTypes';

import axios from "axios";
import { BASE_URL } from "../../config";
import { ICartItem } from '../../types/types';
import { RootState } from '../store';
import { getStoredState } from 'redux-persist';


  
const initialState: CartState = {
  cartList: [],
  totalPrice: 0,
  cartVisible : false,
};

interface ISetCart {
 products : ICartItem[],
}

const CartSlice = createSlice({
    name: 'cart',

    initialState ,


    reducers: {

      setCartList : (state , action : PayloadAction<ISetCart> ) => {
          state.cartList = action.payload.products
          state.totalPrice =  state.cartList.reduce( (acc , item ) => acc + (item.price * item.quantity) , 0) 
      },



      setCartVisible : (state , action: PayloadAction<boolean> ) => {
          state.cartVisible = action.payload;
      },


      addItemToCart : (state , action: PayloadAction<ICartItem> ) =>{
      
          const cartItem  = action.payload
          state.cartList = [  cartItem  ,     ...state.cartList]
          state.totalPrice +=  cartItem.price * cartItem.quantity
       
      },

      removeItemFromCart : (state , action: PayloadAction<ICartItem> ) =>{
      
           const cartItem  = action.payload
          state.cartList = state.cartList.filter(item => item.id !== cartItem.id)
          state.totalPrice -=  cartItem.price * cartItem.quantity
       
      },


  updateQuantity : (state , action: PayloadAction<IUpdateQuantity> ) =>{

    const {productId , newQuantity} = action.payload 

    const itemIndex = state.cartList.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
      // Update quantity or remove if quantity is zero
      if (newQuantity > 0) {
        state.cartList[itemIndex].quantity = newQuantity;
      } else {
        state.cartList.splice(itemIndex, 1);
      }
    }

    state.totalPrice =  [...state.cartList].reduce( (acc , item ) => acc + (item.price * item.quantity) , 0) 
    
    }

  }
  })

export const {setCartList , setCartVisible  ,addItemToCart ,updateQuantity , removeItemFromCart} = CartSlice.actions;

export default CartSlice.reducer