

export default function Headline({ showNavbar }) {
  return (
    <div className="p-1 w-full">
      <div className="flex items-center justify-center bg-gradient-to-tr from-blue-700 to-blue-500 rounded-md font-sans w-full text-white text-lg p-1">

        <button
          className="absolute left-2 rounded-xl w-8 h-8 lg:hidden"
          onClick={showNavbar}>
          <i class="fa-solid fa-bars text-white"></i>
        </button>

        <h1>EDS AI</h1>
      </div>
    </div>
  )
}
