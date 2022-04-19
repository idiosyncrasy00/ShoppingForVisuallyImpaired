import LoginForm from '../components/LoginPage/LoginUI'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../adapters/auth.service"
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
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

  function loginChange(e) {
    console.log("loginChange");
    const getFieldName = e.target.getAttribute('name');
    const getFieldValue = e.target.value;

    const newTaskForm = { ...loginForm }
    newTaskForm[getFieldName] = getFieldValue;
    setLoginForm(newTaskForm);
  }

  function loginHandler(e) {
    console.log("loginHandler");
    e.preventDefault();
    const _loginForm = {
      ...loginForm
    };
    setLoginForm(_loginForm);
    dispatch(login(_loginForm.username, _loginForm.password)).then(() => {
      navigate("/");
      //IsLoggedIn = true;
    }).catch((err) => {
      //dispatch(loginError());
      console.log(err.message);
    })
  }
  return (
    <>
      <h1>This is the login page</h1>
      <LoginForm
        loginChange={loginChange}
        loginHandler={loginHandler}
      //loginChange={e => setLoginForm(e.target.value)}
      />
    </>
  );
}

export default LoginPage