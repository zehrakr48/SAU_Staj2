import { useNavigate } from "react-router-dom"

export default function RedirectButton({
  text,
  className,
  redirectPath,
  onClickModifier,
}) {
  const navigate = useNavigate()

  const onClick = async () => {
    try {
      if (onClickModifier) {
        await onClickModifier()
      }
      navigate(redirectPath)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  )
}
