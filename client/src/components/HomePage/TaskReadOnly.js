import './home.css'
import InputField from '../General/InputField'
import Button from '../General/Button'

function TaskReadOnly(props) {
  const tasks = props.tasks;
  const deleteTask = props.deleteTask;
  const editTask = props.editTask;
  const isDone = props.isDone;
  const index = props.index

  return (
    <div class="grid place-items-center border-1 border-sky-500 mx-96">
      <div class="px-6 py-6">
        <div class="font-bold text-xl mb-2">{tasks[index].name}</div>
        <p class="text-gray-700 text-base">
          {tasks[index].description}
        </p>
      </div>
      <br />
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Done: <InputField
            type={"checkbox"}
            name={"check"}
            onChange={(e) => isDone(e, index)} defaultChecked={tasks[index].isCompleted} />
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <Button onClick={(e) => deleteTask(e, index)} buttonName="Delete Task"></Button>
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <Button onClick={(e) => editTask(e, index)} buttonName="Edit Task"></Button>
        </span>
      </div>
    </div>
  );
}

export default TaskReadOnly;