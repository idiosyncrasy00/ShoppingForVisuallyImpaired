import InputField from '../General/InputField'
import Button from '../General/Button'
import { useState, useContext } from 'react';

function TaskAddForm(props) {
  const addTaskChange = props.addTaskChange
  const addTask = props.addTask
  return (
    //Center a div
      <div className="flex justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Task Name:
            </label>
            <InputField
              className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
              name={"name"}
              type={"text"}
              placeholder={"taskname"}
              onChange={addTaskChange} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Task Description:
            </label>
            <InputField
              className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
              name={"description"}
              type={"text"}
              placeholder={"taskdescription"}
              onChange={addTaskChange} />
          </div>
          <div className="flex items-center justify-center">
            <Button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
              type={"button"}
              onClick={(e) => addTask(e)}
              buttonName={"Submit"}>
            </Button>
          </div>
        </form>
      </div>
  );
}

export default TaskAddForm;