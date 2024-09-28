import Label from "../label"
import RegisterForm from "./register-form"

export default function RegisterCard() {
  return (
    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-200 shadow-md">
      <Label
        text={"KAYDOL"}
        className={"block mt-3 text-sm text-sky-700 text-center font-semibold"}
      />
      <RegisterForm />
    </div>
  )
}
