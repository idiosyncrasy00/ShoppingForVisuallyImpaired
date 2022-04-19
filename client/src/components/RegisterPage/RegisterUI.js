import InputField from '../General/InputField'
import Button from '../General/Button'

function RegisterUI(props) {
  const registerChange = props.registerChange;
  const registerHandler = props.registerHandler;
  return (
    <div className="my-28 flex justify-center items-center">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="mr-48 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Email
            </label>
            <InputField
              width={"full"}
              height={"50"}
              name={"email"}
              type={"text"}
              placeholder={"email"}
              onChange={registerChange}></InputField>
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="mr-32 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Phone number:
            </label>
            <InputField
              width={"full"}
              height={"50"}
              name={"phone"}
              type={"text"}
              placeholder={"phoneNumber"}
              onChange={registerChange}></InputField>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="mr-96 w-full px-3">
            <label class="mr-96 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Username:
            </label>
            <InputField
              width={"full"}
              height={"50"}
              name={"username"}
              type={"text"}
              placeholder={"username"}
              onChange={registerChange}></InputField>
            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="mr-96 w-full px-3">
            <label class="mr-96 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Password
            </label>
            <InputField
              width={"full"}
              height={"50"}
              name={"password"}
              type={"password"}
              placeholder={"Enter your password here"}
              onChange={registerChange}></InputField>
            <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <Button size="lg" textColor="black" bgColor="blue-500"
          onClick={(e) => { registerHandler(e) }}
          buttonName={"Register"}></Button>
      </form>
    </div>
  )
}

export default RegisterUI