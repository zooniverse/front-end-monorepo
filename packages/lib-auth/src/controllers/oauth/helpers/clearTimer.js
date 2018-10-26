function clearTimer (timerRef) {
  clearTimeout(timerRef)
  timerRef = -1
}

export default clearTimer
