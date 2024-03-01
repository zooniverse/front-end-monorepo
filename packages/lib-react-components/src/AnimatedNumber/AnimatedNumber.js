import PropTypes from 'prop-types'
import { format, interpolateRound, select } from 'd3'
import { useEffect, useRef } from 'react'

function AnimatedNumber({ duration = 1000, value }) {
  if (!value) return

  const numRef = useRef(null)

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: true)'
  ).matches

  function animateValue() {
    select(numRef.current)
      .data([value])
      .transition()
      .duration(duration)
      .textTween(() => interpolateRound(0, value))
  }

  function formatValue(value) {
    return format(',d')(value)
  }

  useEffect(() => {
    const numElement = numRef.current

    const intersectionObserver = new window.IntersectionObserver(entries => {
      // If intersectionRatio is 0, the target is out of view and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) return

      // Once target element is in viewport, animate it
      if (!prefersReducedMotion) {
        animateValue()
      } else {
        select(numRef.current).data([value])
      }
    })

    intersectionObserver.observe(numElement)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [numRef.current])

  return <span ref={numRef}>{formatValue(value)}</span>
}

AnimatedNumber.propTypes = {
  duration: PropTypes.number,
  value: PropTypes.number.isRequired
}

export default AnimatedNumber
