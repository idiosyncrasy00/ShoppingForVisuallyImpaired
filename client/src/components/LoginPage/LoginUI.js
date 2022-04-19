import { Form, Button } from 'react-bootstrap';

function LoginUI(props) {
  const loginChange = props.loginChange;
  const loginHandler = props.loginHandler;
  return (
    // <div className="my-32 flex justify-center items-center">
    //   <form class="w-full max-w-lg">
    //     <div class="flex flex-wrap -mx-3 mb-6">
    //       {/* <div class="w-full px-3"> */}
    //       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
    //         Username:
    //       </label>
    //       <InputField
    //         width={"full"}
    //         height={"100"}
    //         name={"username"}
    //         type={"text"}
    //         placeholder={"username"}
    //         onChange={loginChange}></InputField>
    //       {/* </div> */}
    //     </div>
    //     <div class="flex flex-wrap -mx-3 mb-6">
    //       {/* <div class="w-full px-3"> */}
    //       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
    //         Password
    //       </label>
    //       <InputField
    //         width={"full"}
    //         height={"100"}
    //         name={"password"}
    //         type={"password"}
    //         placeholder={"password"}
    //         marginRight={"50"}
    //         onChange={loginChange}></InputField>
    //       {/* </div> */}
    //     </div>
    //     <div className="flex items-center justify-center">
    //       <Button size="lg" textColor="black" bgColor="blue-500"
    //         onClick={(e) => { loginHandler(e) }}
    //         buttonName={"Login"}></Button>
    //     </div>
    //   </form>
    // </div>
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ "padding-left": "4rem;" }}>Username</Form.Label>
          <input type="text" name="username"
            placeholder="Enter username"
            class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
            onChange={loginChange} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <input type="password" name="password" placeholder="Enter password" onChange={loginChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" onClick={loginHandler}>
          Login
        </Button>
      </Form>
    </>
  )
}

export default LoginUI