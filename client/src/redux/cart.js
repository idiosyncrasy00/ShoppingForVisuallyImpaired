import { createSlice } from '@reduxjs/toolkit'

const productState = []

export const CartInfoSlice = createSlice({
  name: 'cartInfo',
  initialState: {
    items: productState,
    total_price: 0
  },
  //initialState,
  reducers: {
    // getCartInfo: (state, action) => {
    //   // switch (action.type) {
    //   //   case "ADD_TO_CART":
    //   //     //state.value = action.payload
    //   //     return [...state, action.title];
    //   //   default:
    //   //     return state;
    //   // }
    //   //state.value.push(action.payload);
    //   state.value = action.payload
    // },
    addToCart: (state, action) => {
      //const id = action.payload;
      //state.items.push(id)
      //tempArr.push(action.payload);
      const tempArr = state.items;
      tempArr.push(action.payload);
      state.items = tempArr;
      state.total_price += action.payload.price;
      //state.value = [...state.value, action.payload];
    },
    removeFromCart: (state, action) => {
      let tempArr = state.items;
      tempArr.splice(action.payload.index, 1);
      state.items = tempArr;
      state.total_price -= action.payload.price;
    },
    // totalPrice: (state, action) => {
    //   state.total_price += action.payload;
    // }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = CartInfoSlice.actions

export default CartInfoSlice.reducer