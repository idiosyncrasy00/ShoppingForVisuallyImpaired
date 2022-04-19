import { useState, Fragment, useEffect } from 'react';
import InputField from "../General/InputField"
import Button from "../General/Button"

function Chat() {
  //contain input and enter from current user
  const [message, setMessage] = useState("");
  function messageChange(e) {
    console.log("loginChange");
    const getFieldName = e.target.getAttribute('name');
    const getFieldValue = e.target.value;

    const newForm = { ...message }
    newForm[getFieldName] = getFieldValue;
    setMessage(newForm);
  }
  return (
    <div className="">
      <InputField
        className={"block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
        name={"chat"} type={"text"} placeholder={"Enter your message here"} onChange={e => { messageChange(e) }}></InputField>
      <Button className={""}
        type={"button"}
        // onClick={e => { }}
        buttonName={"Send message"}>
      </Button>
    </div>
  );
}

export default Chat;