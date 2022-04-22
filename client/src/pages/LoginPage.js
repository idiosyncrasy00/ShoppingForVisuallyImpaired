//import LoginForm from '../components/LoginPage/LoginUI'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../adapters/auth.service"
import { Form, Button } from 'react-bootstrap';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect((e) => {
    function updateScreen() {
      alanBtn({
        key: alanKey,
        onCommand: function (commandData) {
          if (commandData.command === 'home_navigation') {
            //do something
            navigate('/');
          }
          if (commandData.command === 'login_navigation') {
            //do something
            navigate('/login');
          }
          if (commandData.command === 'register_navigation') {
            //do something
            navigate('/register');
          }
          //form filling
          if (commandData.command === 'start_filling_in_the_login') {
            console.log("Ready to fill....");
          }
          if (commandData.command === 'get_username') {
            alert(commandData.text);
            setUserName(commandData.text);
            //document.getElementById('username').value = commandData.text;
          }
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });



  function loginHandler(e) {
    console.log("Username is " + username + " and Password is " + password);
  }
  return (
    <>
      <h1>This is the login page</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ "padding-left": "4rem;" }}>Username</Form.Label>
          <input type="text" name="username"
            placeholder="Enter username"
            class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
            onChange={e => setUserName(e.target.value)}
            id="username"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <input type="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)}
            id="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" onClick={e => loginHandler(e)}>
          Login
        </Button>
      </Form>
    </>
  );
}

export default LoginPage