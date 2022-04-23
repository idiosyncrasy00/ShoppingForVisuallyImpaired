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
          switch (commandData.command) {
            case 'home_navigation':
              navigate('/');
              break;
            case 'login_navigation':
              navigate('/login');
              break;
            case 'register_navigation':
              navigate('/register');
              break;
            case 'start_filling_in_the_login':
              console.log("Ready to fill....");
              break;
            case 'get_username':
              //setUserName(commandData.text);
              if (/\s/.test(commandData.item)) {
                commandData.item = commandData.item.replace(/\s+/g, '');
              }
              alert(commandData.item);
              setUserName(commandData.item);
              document.getElementById('username').value = commandData.item;
              break;
            case 'get_password':
              if (/\s/.test(commandData.item)) {
                commandData.item = commandData.item.replace(/\s+/g, '');
              }
              alert(commandData.item);
              setPassword(commandData.item);
              document.getElementById('password').value = commandData.item;
              break;
            case 'click_login':
              //loginHandler(e);
              //e.preventDefault();
              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              alert("Username: " + username + " Password: " + password);
              break;
            default:
              console.log('Unknown command: ' + commandData.command);
          }
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });



  function loginHandler(e) {
    //console.log("Username is " + username + " and Password is " + password);
    // const email = document.getElementById('email').value;
    // const phoneNumber = document.getElementById('phone-number').value;
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log("Username: " + username + " Password: " + password);
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