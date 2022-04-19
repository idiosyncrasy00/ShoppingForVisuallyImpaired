

export const login = (state = "", action) => {
  // state = action.payload;
  switch (action.type) {
    case "login":
      return action.payload.username
    default:
      return state
  }
  //return state + action.payload;
}

export default login;