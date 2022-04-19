import TaskReadOnly from '../components/HomePage/TaskReadOnly'
import TaskEditable from '../components/HomePage/TaskEditable'
import Contacts from '../components/HomePage/contacts'
import TaskAddForm from '../components/HomePage/TaskAddForm'
import LanguageChange from '../components/HomePage/LanguageChange'
import { useState, Fragment, useEffect } from 'react';
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counter";
import { taskAddForm } from "../actions/taskAddForm";

function HomePage() {
  // const counter = useSelector((state) => state.counter);
  // const login_ = useSelector((state) => state.loginInfo.username);
  //const dispatch = useDispatch();
  const taskAddForm_ = useSelector((state) => state.taskAddForm)
  const counter = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("random");
  }, [])

  var infos = [{
    name: "Hoang",
    age: 18,
    hobbies: "football, basketball...",
    phoneNumber: "4123412",
  },
  {
    name: "Hoang 1",
    age: 19,
    hobbies: "football, volleyball...",
    phoneNumber: "72434127",
  },
  {
    name: "Hoang 2",
    age: 20,
    hobbies: "swimming, volleyball...",
    phoneNumber: "041234132",
  }
  ];
  const [tasks, setTasks] = useState([]);
  const [addFormTask, setAddFormTask] = useState({
    name: '',
    description: '',
    isCompleted: false,
  });
  const [editFormTask, setEditFormTask] = useState({
    name: addFormTask.name,
    description: addFormTask.description,
    isCompleted: addFormTask.isCompleted,
  });
  const [isEditID, setIsEditID] = useState(null);
  function addTask(e) {
    console.log("addTask");
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      name: addFormTask.name,
      description: addFormTask.description,
      isCompleted: addFormTask.isCompleted,
    }
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    console.log("New task added with id: " + newTask.id + " with task status is: " + newTask.isCompleted)
  }
  //onchange
  function addTaskChange(e) {
    console.log("addTaskChange");
    const getFieldName = e.target.getAttribute('name');
    const getFieldValue = e.target.value;

    const newTaskForm = { ...addFormTask }
    newTaskForm[getFieldName] = getFieldValue;
    setAddFormTask(newTaskForm);
  }

  function handleOnChange(e, state) {
    console.log("addTaskChange");
    const getFieldName = e.target.getAttribute('name');
    const getFieldValue = e.target.value;

    const newTaskForm = { ...state }
    newTaskForm[getFieldName] = getFieldValue;
    //setAddFormTask(newTaskForm);
    return newTaskForm;
  }

  function isDone(e, index) {
    console.log("IsDone check");
    const formValues = {
      name: tasks[index].name,
      description: tasks[index].description,
      isCompleted: !tasks[index].isCompleted
    }
    const newTasks = [...tasks];
    newTasks[index] = formValues;
    setTasks(newTasks);
  }

  function editTask(e, index) {
    console.log("The index is: " + index)
    if (tasks[index].isCompleted === false) {
      console.log('editTask');
      e.preventDefault();
      setIsEditID(tasks[index].id);
      const formValues = {
        name: tasks[index].name,
        description: tasks[index].description,
        isCompleted: tasks[index].isCompleted,
      }
      setEditFormTask(formValues);
    } else {
      console.log("Cannot change task!!!");
    }
  }

  //onchange
  function editTaskChange(e) {
    console.log('editTaskChange');
    e.preventDefault();
    const getFieldName = e.target.getAttribute('name');
    const getFieldValue = e.target.value;
    const newTaskForm = { ...editFormTask }
    newTaskForm[getFieldName] = getFieldValue;
    setEditFormTask(newTaskForm);
  }

  function submitChanges(e, index) {
    e.preventDefault();

    const editedTask = {
      id: nanoid(),
      name: editFormTask.name,
      description: editFormTask.description,
      isCompleted: editFormTask.isCompleted,
    }

    const newTasks = [...tasks];
    newTasks[index] = editedTask;
    setTasks(newTasks);
    setIsEditID(null);
  }

  function deleteTask(e, index) {
    e.preventDefault();
    let newTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      if (i !== index) {
        newTasks.push(tasks[i]);
      }
    }
    console.log(newTasks)
    setTasks(newTasks);
    console.log('deleteTask with index' + index);
  }

  function cancelChanges(e) {
    console.log('cancelChanges');
    setIsEditID(null);
  }

  var list = infos.map((info) => {
    return (
      <Contacts
        name={info.name}
        age={info.age}
        hobbies={info.hobbies}
        phoneNumber={info.phoneNumber}
      />
    );
  })

  var taskList =
    tasks.map((task, index) => {
      return (
        <Fragment>
          {
            isEditID === task.id ? (
              <TaskEditable
                editTaskChange={editTaskChange}
                editFormTask={editFormTask}
                cancelChanges={cancelChanges}
                submitChanges={submitChanges}
                index={index}
              />
            ) : (
              <TaskReadOnly
                tasks={tasks}
                deleteTask={deleteTask}
                editTask={editTask}
                isDone={isDone}
                index={index}
              />
            )
          }
        </Fragment>
      )
    }
    )

  return (
    <div>
      <h1> This is home page - Welcome to our watch2gether app!</h1>
      <LanguageChange />
      {/* <h2>Hello user {(login_)}</h2> */}
      <h2>Counter {counter}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(taskAddForm(addFormTask))}>cllll</button>
      {/* <button onClick={(e) => setAddFormTask(handleOnChange(e, addFormTask))}>cllll</button> */}
      <TaskAddForm
        addTaskChange={addTaskChange}
        addTask={addTask}
      //className="grid place-items-center h-screen"
      />
      {
        taskList
      }
      <br></br>
      {
        list
      }
    </div>
  );
}

export default HomePage