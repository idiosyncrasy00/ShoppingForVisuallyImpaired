import './home.css'
import InputField from '../General/InputField'
import Button from '../General/Button'

function TaskEditable(props) {
  const editTaskChange = props.editTaskChange;
  const editFormTask = props.editFormTask;
  const cancelChanges = props.cancelChanges;
  const submitChanges = props.submitChanges;
  const index = props.index;
  return (
    <div class="grid place-items-center border-1 border-sky-500 mx-96">
      <div class="px-6 py-4">
        <div class="text-gray-700 text-base">
          Task name:
          <InputField
            type={"text"}
            name={"name"}
            value={editFormTask.name}
            onChange={editTaskChange}
          ></InputField>
        </div>
        <div class="text-gray-700 text-base">
          Task description:
          <InputField
            type={"text"}
            name={"description"}
            value={editFormTask.description}
            onChange={editTaskChange}
          ></InputField>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <Button onClick={(e) => submitChanges(e, index)} buttonName={"Save changes"}></Button>
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <Button onClick={cancelChanges} buttonName={"Cancel"}></Button>
        </span>
      </div>
    </div>
  );
}

export default TaskEditable;