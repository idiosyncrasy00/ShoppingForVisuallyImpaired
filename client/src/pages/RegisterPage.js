//import RegisterForm from '../components/RegisterPage/RegisterUI'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import alanBtn from '@alan-ai/alan-sdk-web';
const alanKey = '57c5f11b359672b1fc9ce54571064ed92e956eca572e1d8b807a3e2338fdd0dc/stage';

function RegisterPage() {
  // const [registerForm, setRegisterForm] = useState({
  //   email: '',
  //   phone: '',
  //   username: '',
  //   password: '',
  // });
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
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
            case 'start_filling_in_the_register':
              console.log("Ready to fill....");
              break;
            case 'get_email':
              //setUserName(commandData.text);
              if (/\s/.test(commandData.item)) {
                commandData.item = commandData.item.replace(/\s+/g, '');
              }
              alert(commandData.item);
              //document.getElementById('email').value = commandData.item;
              setEmail(commandData.item);
              break;
            case 'get_phone_number':
              alert(commandData.item);
              document.getElementById('phone-number').value = commandData.item;
              break;
            case 'get_username':
              //setUserName(commandData.text);
              if (/\s/.test(commandData.item)) {
                commandData.item = commandData.item.replace(/\s+/g, '');
              }
              alert(commandData.item);
              document.getElementById('username').value = commandData.item;
              break;
            case 'get_password':
              if (/\s/.test(commandData.item)) {
                commandData.item = commandData.item.replace(/\s+/g, '');
              }
              alert(commandData.item);
              document.getElementById('password').value = commandData.item;
              //setPassword(commandData.text);
              break;
            default:
              console.log('Unknown command: ' + commandData.command);
          }
        }
      })
    }
    requestAnimationFrame(updateScreen)
  });

  function registerHandler() {
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log("Email is " + email + ". Phone number: " + phoneNumber + ". Username: " + username + " Password: " + password);
    
  }
  return (
    <>
      <h1>This is the register page</h1>
      {/* <RegisterForm
        registerChange={registerChange}
        registerHandler={registerHandler}
      /> */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          {/* <Form.Control type="email" placeholder="Enter email" /> */}
          <input type="email" name="email" id="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone number</Form.Label>
          {/* <Form.Control type="email" placeholder="Enter email" /> */}
          <input type="number" name="phone-number" id="phone-number" placeholder="Enter phone number" onChange={e => setPhoneNumber(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          {/* <Form.Control type="email" placeholder="Enter email" /> */}
          <input type="username" name="username" id="username" placeholder="Enter username" onChange={e => setUserName(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          {/* <Form.Control type="password" placeholder="Password" /> */}
          <input type="password" name="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" onClick={registerHandler}>
          Register
        </Button>
      </Form>
    </>
  );
}

export default RegisterPage