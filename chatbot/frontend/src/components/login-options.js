export default function LoginOptions() {
  return (
    <div className="mt-7 flex">
      <label
        htmlFor="remember_me"
        className="inline-flex items-center w-full cursor-pointer">
        <input
          id="remember_me"
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          name="remember"
        />
        <span className="ml-2 text-sm text-gray-600">Beni Hatırla</span>
      </label>

      <div className="w-full text-right">
        <a
          className="underline text-sm text-gray-600 hover:text-gray-900"
          href="#">
          Şifrenizi mi unuttunuz?
        </a>
      </div>
    </div>
  )
}
