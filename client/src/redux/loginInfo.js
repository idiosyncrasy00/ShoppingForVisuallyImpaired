import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {}

export const loginInfoSlice = createSlice({
  name: 'loginInfo',
  initialState: {
    value: initialStateValue,
  },
  //initialState,
  reducers: {
    getLoginInfo: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getLoginInfo, logOut, loginError } = loginInfoSlice.actions

export default loginInfoSlice.reducer