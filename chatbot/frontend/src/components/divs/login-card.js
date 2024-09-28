import Label from "../label"
import LoginForm from "./login-form"

export default function LoginCard() {
  return (
    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-200 shadow-md">
      <Label
        text={"GİRİŞ YAP"}
        className={"block mt-3 text-sm text-sky-700 text-center font-semibold"}
      />
      <LoginForm />
    </div>
  )
}
