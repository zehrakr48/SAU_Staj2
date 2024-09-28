export default function Title({ text }) {
  return (
    <div className="flex items-center gap-4 py-6 px-8">
      <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
        {text}
      </h6>
    </div>
  )
}
