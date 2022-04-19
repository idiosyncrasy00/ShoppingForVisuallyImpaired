import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = "";

export const querySlice = createSlice({
  name: 'query',
  initialState: {
    value: initialStateValue,
  },
  //initialState,
  reducers: {
    getQuery: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getQuery } = querySlice.actions

export default querySlice.reducer