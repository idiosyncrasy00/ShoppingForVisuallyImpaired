export const login = (userInfo) => {
  return {
    type: "login",
    payload: {
      username: userInfo.username,
      password: userInfo.password,
    },
  }
}