import PropTypes from 'prop-types'
import { format } from '@visx/vendor/d3-format'
import { interpolate } from '@visx/vendor/d3-interpolate'
import { select } from 'd3'
import { useEffect, useRef, useState } from 'react'

let prefersReducedMotion
const isBrowser = typeof window !== 'undefined'
if (isBrowser) {
  prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
export { prefersReducedMotion }

function formatValue(num) {
  return format(',d')(num)
}

/**
 * Use d3 to animate `element` from `initialValue` to `value` over `duration` in milliseconds.
 * @param {HTMLElement} element 
 * @param {number} initialValue 
 * @param {number} value
 * @param {number} duration 
 * @returns a Promise that resolves once the animation is complete.
 */
function animateValue(element, initialValue, value, duration) {
  if (value === initialValue) {
    return
  }
  return new Promise((resolve) => {
    select(element)
      .data([value])
      .transition()
      .duration(duration)
      .textTween(() => {
        const interpolator = interpolate(initialValue, value)
        return t => {
          const interpolatedValue = interpolator(t)
          if (interpolatedValue === value) {
            resolve() // animation complete!
          }
          const niceValue = formatValue(interpolatedValue)
          return niceValue
        }
      })
  })
}

/**
 * Use d3 to tween `element` from `initialValue` to `value`.
 * @param {HTMLElement} element 
 * @param {number} initialValue
 * @param {number} value 
 * @returns a Promise that resolves once the animation is complete.
 */
function lessAnimation(element, initialValue, value) {
  if (value === initialValue) {
    return
  }
  return new Promise((resolve) => {
    select(element)
      .data([value])
      .transition()
      .duration(0)
      .textTween(() => {
        return () => {
          resolve() // animation complete!
          return formatValue(value)
        }
      })
  })
}

function AnimatedNumber({ duration = 1000, value }) {
  const numRef = useRef(null)
  const initialValueRef = useRef(0)
  const initialValue = initialValueRef.current
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    // If we already animated the number once, don't observe intersection
    // This could happen if the value prop updates, but page did not refresh
    if (animated || value === initialValue) return

    const numElement = numRef.current

    const intersectionObserver = new window.IntersectionObserver(async entries => {
      // If intersectionRatio is 0, the target is out of view and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) return

      // Once target element is in viewport, animate it then unobserve
      if (!prefersReducedMotion() && !animated) {
        await animateValue(numElement, initialValue, value, duration)
      } else {
        await lessAnimation(numElement, initialValue, value)
      }
      setAnimated(true)
      initialValueRef.current = value
      intersectionObserver.unobserve(numElement)
    })

    intersectionObserver.observe(numElement)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [numRef.current, animated, value, duration])

  return <span ref={numRef}>{!animated ? initialValue : formatValue(value)}</span>
}

AnimatedNumber.propTypes = {
  duration: PropTypes.number,
  value: PropTypes.number.isRequired
}

export default AnimatedNumber
