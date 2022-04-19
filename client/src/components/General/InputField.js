import classnames from 'classnames';

function InputField(props) {
  //const className = props.className;
  const size = props.size;
  const width = props.width;
  const height = props.height;
  const name = props.name;
  const type = props.type;
  const placeholder = props.placeholder;
  const onChange = props.onChange;
  const defaultValue = props.defaultValue;
  //const paddingRight = props.paddingRight;
  return (
    //w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline
    <input
      className={classnames(`w-${width} h-${height} px-4 py-2.5 mt-1 text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline`, {
        "text-xs": size === 'sm',
        "text-xl": size === 'lg',
      })}
      name={name} type={type} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} />
  );
}

export default InputField;