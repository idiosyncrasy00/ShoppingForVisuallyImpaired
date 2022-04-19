export const taskAddForm = (task) => {
  return {
    type: "taskAddForm",
    payload: {
      name: task.name,
      description: task.description,
      isCompleted: task.isCompleted,
    },
  }
}