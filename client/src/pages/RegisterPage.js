import RegisterForm from '../components/RegisterPage/RegisterUI'
import { useState, useEffect } from 'react';



function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  useEffect(() => {
    console.log('use effect random');
  }, [])

  function registerChange(e) {
    console.log("registerChange");
    const getFieldName = e.target.getAttribute('name');
    const getFieldValue = e.target.value;

    const newTaskForm = { ...registerForm }
    newTaskForm[getFieldName] = getFieldValue;
    setRegisterForm(newTaskForm);
  }

  function registerHandler() {
    console.log("registerHandler");
    const newTaskForm = {
      ...registerForm
    };
    setRegisterForm(newTaskForm);
    console.log("Info register is: " + JSON.stringify(newTaskForm))
  }
  return (
    <>
      <h1>This is the register page</h1>
      <RegisterForm
        registerChange={registerChange}
        registerHandler={registerHandler}
      />
    </>
  );
}

export default RegisterPage