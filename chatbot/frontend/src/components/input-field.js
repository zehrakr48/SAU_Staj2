export default function InputField({ type, value, onChange, placeholder }) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
      />
    </>
  )
}
