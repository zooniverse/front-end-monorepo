export default function preventDefaultAction(event) {
  event.stopPropagation()
  event.preventDefault()
}
