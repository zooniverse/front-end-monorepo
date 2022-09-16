export default function getFixedNumber(number, digits) {
  if (number === 0) {
    return 0
  }
  return Math.round(number * 10 ** digits) / 10 ** digits
}
