// import { createSlice } from '@reduxjs/toolkit'

// //const user = JSON.parse(localStorage.getItem('user'));

// const initialStateValue = {
//   id: '',
//   username: '',
//   //password: '',
// }

// const initialState = {
//   LOGIN_SUCCESS: "LOGIN_SUCCESS",
//   LOGIN_FAIL: "LOGIN_FAIL",
//   SET_MESSAGE: "SET_MESSAGE",
//   CLEAR_MESSAGE: "CLEAR_MESSAGE"
// }

// // const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// // const LOGIN_FAIL = "LOGIN_FAIL";
// // const SET_MESSAGE = "SET_MESSAGE";
// // const CLEAR_MESSAGE = "CLEAR_MESSAGE";

// export const authMessageSlice = createSlice({
//   name: 'authMessage',
//   // initialState: {
//   //   value: initialStateValue,
//   // },
//   initialState,
//   reducers: {
//     // getLoginInfo: (state, action) => {
//     //   if (user !== "") {
//     //     state.value = action.payload
//     //   }
//     //   //state.username += action.payload
//     // }
//     authMessage: (state, action) => {
//       state.value = action.payload
//     }

//   },
// })

// // Action creators are generated for each case reducer function
// export const { getAuthMessage } = authMessageSlice.actions

// export default authMessageSlice.reducer