import RegisterCard from "../components/divs/register-card"

export default function RegisterPage() {
  return (
    <div className="font-sans w-full">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-700 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-indigo-600 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <RegisterCard />
        </div>
      </div>
    </div>
  )
}
