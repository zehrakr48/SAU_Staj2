export default function DeleteButton({
  index,
  controlState,
  setControlState,
  onClickModifier,
}) {
  const onClick = () => {
    if (onClickModifier) {
      onClickModifier(index)
    }
    const newControlState = [...controlState]
    newControlState.splice(index, 1)
    setControlState(newControlState)
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-gradient-to-tr from-blue-600 to-blue-400"
      type="button">
      <i className="fa-solid fa-trash-can m-2"></i>
    </button>
  )
}
