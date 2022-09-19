export default function getFixedNumber(number, digits) {
  if (!digits) {
    console.log('getFixedNumber: Missing digits variable')
  }
  return Math.round(number * 10 ** digits) / 10 ** digits
}
