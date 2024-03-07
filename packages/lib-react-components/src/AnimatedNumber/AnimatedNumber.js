import PropTypes from 'prop-types'
import { format, interpolate, select } from 'd3'
import { useEffect, useRef } from 'react'

const initialValue = 0

let prefersReducedMotion
const isBrowser = typeof window !== 'undefined'
if (isBrowser) {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function AnimatedNumber({ duration = 1000, value }) {
  const numRef = useRef(null)

  function animateValue() {
    select(numRef.current)
      .data([value])
      .transition()
      .duration(duration)
      .textTween(() => {
        const interpolator = interpolate(initialValue, value)
        return t => {
          const interpolatedValue = interpolator(t)
          const niceValue = formatValue(interpolatedValue)
          return niceValue
        }
      })
  }

  function lessAnimation() {
    select(numRef.current)
    .data([value])
    .transition()
    .duration(0)
    .textTween(() => {
      return () => {
        return formatValue(value)
      }
    })
  }

  function formatValue(num) {
    return format(',d')(num)
  }

  useEffect(() => {
    const numElement = numRef.current

    const intersectionObserver = new window.IntersectionObserver(entries => {
      // If intersectionRatio is 0, the target is out of view and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) return

      // Once target element is in viewport, animate it only once
      if (!prefersReducedMotion) {
        animateValue()
        intersectionObserver.unobserve(numElement)
      } else {
        lessAnimation()
      }
    })

    intersectionObserver.observe(numElement)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [numRef.current])

  return <span ref={numRef}>{formatValue(initialValue)}</span>
}

AnimatedNumber.propTypes = {
  duration: PropTypes.number,
  value: PropTypes.number.isRequired
}

export default AnimatedNumber
