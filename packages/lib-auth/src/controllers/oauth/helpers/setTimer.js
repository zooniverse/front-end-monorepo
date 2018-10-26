import clearTimer from './clearTimer'

function setTimer ({
  onComplete,
  duration,
  ref
}) {
  if (ref > -1) {
    clearTimer(ref)
  }
  return setTimeout(onComplete, duration)
}

export default setTimer
