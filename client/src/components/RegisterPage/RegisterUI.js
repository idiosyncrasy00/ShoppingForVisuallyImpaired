import { Form, Button } from 'react-bootstrap';

function RegisterUI(props) {
  const registerChange = props.registerChange;
  const registerHandler = props.registerHandler;
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        {/* <Form.Control type="email" placeholder="Enter email" /> */}
        <input type="text" name="username" placeholder="Enter username" onChange={registerChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        {/* <Form.Control type="email" placeholder="Enter email" /> */}
        <input type="email" name="email" placeholder="Enter email" onChange={registerChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        {/* <Form.Control type="password" placeholder="Password" /> */}
        <input type="password" name="password" placeholder="Enter password" onChange={registerChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" onClick={registerHandler}>
        Register
      </Button>
    </Form>
  )
}

export default RegisterUI