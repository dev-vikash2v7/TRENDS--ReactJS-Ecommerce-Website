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
  userId : null
};

interface ISetCart {
 products : ICartItem[],
 userId : string
}

const CartSlice = createSlice({
    name: 'cart',

    initialState ,


    reducers: {

      setCartList : (state , action : PayloadAction<ISetCart> ) => {
          state.cartList = action.payload.products
          state.userId = action.payload.userId
          state.totalPrice =  state.cartList.reduce( (acc , item ) => acc + (item.price * item.quantity) , 0) 
      },



      setCartVisible : (state , action: PayloadAction<boolean> ) => {
          state.cartVisible = action.payload;
      },


      addItemToCart : (state , action: PayloadAction<ICartItem> ) =>{
        try {

          const cartItem  = action.payload
        
          axios.post(`${BASE_URL}/cart/addToUserCart?userId=${state.userId}`,      {product : cartItem }    )
          .then(res =>{

          }) 
          .catch(err=>{
            alert(err.message)
            return
          })
          state.cartVisible = true; 
          state.cartList = [  cartItem  ,     ...state.cartList]
          state.totalPrice +=  cartItem.price * cartItem.quantity
        }
        catch(err:any){
          alert(err.message)
        }
      },


  updateQuantity : (state , action: PayloadAction<IUpdateQuantity> ) =>{

    const {productId , newQuantity} = action.payload 

    axios.post(`${BASE_URL}/cart/updateCartItemQuantity?userId=${state.userId}`, {productId, newQuantity}    )
    .then()
     .catch((err)=>{
    alert(err.message)
    return
     })

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

export const {setCartList , setCartVisible  ,addItemToCart ,updateQuantity} = CartSlice.actions;

export default CartSlice.reducer