export default function (string) {
  return string.replace(/([A-Z])/g, function (char) { return `_${char.toLowerCase()}` })
}