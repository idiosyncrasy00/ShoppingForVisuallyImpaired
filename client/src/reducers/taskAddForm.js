

export const taskAddForm = (state = "", action) => {
  switch (action.type) {
    case "taskAddForm":
      return action.payload.name + " " + action.payload.description + " " + action.payload.isCompleted;
    default:
      return state
  }
}

export default taskAddForm;