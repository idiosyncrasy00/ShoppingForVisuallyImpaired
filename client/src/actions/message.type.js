import { set_message, clear_message } from './action.type'

const setMessage = (message) => ({
  type: set_message,
  payload: message,
});

const clearMessage = () => ({
  type: clear_message,
});

export { setMessage, clearMessage };