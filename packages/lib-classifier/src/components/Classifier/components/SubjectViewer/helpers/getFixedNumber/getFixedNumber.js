export default function getFixedNumber(number, digits) {
  return Math.round(number * 10 ** digits) / 10 ** digits
}
