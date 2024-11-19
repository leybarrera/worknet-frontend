const Input = ({ _type, _placeholder, _name, _onChange, value }) => {
  return (
    <input
      type={_type}
      placeholder={_placeholder}
      name={_name}
      onChange={_onChange}
      className="w-full px-4 py-3 text-gray-600 outline-none text-base"
      defaultValue={value}
    />
  )
}

export default Input
