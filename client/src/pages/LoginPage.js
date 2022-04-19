import LoginForm from '../components/LoginPage/LoginUI'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
//import { login } from "../actions/login";
//import { loginError } from "../redux/loginInfo";
//import PageNavigation from "./index"
import { login } from "../adapters/auth.service"

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  //let IsLoggedIn = false;
  useEffect(() => {
    console.log('use effect random');
  }, [])
  const navigate = useNavigate();
  //const errorMsg = useSelector((state) => state.loginError);

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