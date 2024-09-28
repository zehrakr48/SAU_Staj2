export default function FunctionButton({
  paths,
  name,
  index,
  onClickModifier,
  symbol,
}) {
  const onClick = () => {
    if (onClickModifier) {
      onClickModifier(name, index)
    }
  }

  return (
    <button
      onClick={onClick}
      className="middle none font-sans font-bold center bg-inherit transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-gradient-to-tr from-blue-600 to-blue-400 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
      type="button">
      {paths && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="w-5 h-5 text-inherit">
          {paths.map((path) => (
            <path d={path} />
          ))}
        </svg>
      )}
      {symbol && <i class={`fa-solid fa-${symbol}`}></i>}
      <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
        {name}
      </p>
    </button>
  )
}
