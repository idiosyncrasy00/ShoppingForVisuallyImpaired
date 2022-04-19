import RegisterForm from '../components/RegisterPage/RegisterUI'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    function updateScreen() {
      alanBtn({
        key: alanKey,
        onCommand: ({ command }) => {
          if (command === 'home_navigation') {
            //do something
            navigate('/');
          }
          if (command === 'login_navigation') {
            //do something
            navigate('/login');
          }
          if (command === 'register_navigation') {
            //do something
            navigate('/register');
          }
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });

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