import InputField from "./InputField"
import Button from "./Button"

function SearchBar(props) {
  const searchResult = props.searchResult;
  const onChange = props.onChange;
  const defaultValue = props.defaultValue;
  return (
    <div>
      <InputField
        className={"shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
        name={"SearchBar"} type={"text"} placeholder={"Search bar"} onChange={(e) => onChange(e)} defaultValue={defaultValue}
        //value={"fasdffs"}
      ></InputField>
      <Button
        className={"btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"}
        type={"button"}
        onClick={(e) => { searchResult(e); }}
        buttonName={"Search"}></Button>
    </div>
  )
}

export default SearchBar;