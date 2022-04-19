import InputField from '../General/InputField'
import Button from '../General/Button'

function LoginUI(props) {
  const loginChange = props.loginChange;
  const loginHandler = props.loginHandler;
  return (
    <div className="my-32 flex justify-center items-center">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          {/* <div class="w-full px-3"> */}
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Username:
          </label>
          <InputField
            width={"full"}
            height={"100"}
            name={"username"}
            type={"text"}
            placeholder={"username"}
            onChange={loginChange}></InputField>
          {/* </div> */}
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          {/* <div class="w-full px-3"> */}
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Password
          </label>
          <InputField
            width={"full"}
            height={"100"}
            name={"password"}
            type={"password"}
            placeholder={"password"}
            marginRight={"50"}
            onChange={loginChange}></InputField>
          {/* </div> */}
        </div>
        <div className="flex items-center justify-center">
          <Button size="lg" textColor="black" bgColor="blue-500"
            onClick={(e) => { loginHandler(e) }}
            buttonName={"Login"}></Button>
        </div>
      </form>
    </div>
  )
}

export default LoginUI