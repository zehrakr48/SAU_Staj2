export default function UploadButton({ onChange }) {
  return (
    <input
      type="file"
      multiple
      className="middle none font-sans font-bold center bg-inherit transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-gradient-to-tr from-blue-600 to-blue-400 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
      onChange={onChange}
    />
  )
}
