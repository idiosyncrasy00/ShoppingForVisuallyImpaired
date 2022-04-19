import axios from 'axios';
import { getLoginInfo } from "../redux/loginInfo";

const API_URL = "http://localhost:3001/api/users/"
export const login = (username, password) => (dispatch) => {
  return axios.post(API_URL + "login", {
    username, password,
  })
    .then((res) => {
      if (res.status !== 400) {
        console.log(res.data)
        dispatch(getLoginInfo(res.data));
        return Promise.resolve();
      }
    })
    .catch((err) => {
      console.log(err.message);
      return Promise.reject();
    })
}

// const register = (username, email, password) => {

// }
