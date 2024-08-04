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
  const interpolator = interpolate(initialValue, value)
  return select(element)
    .data([value])
    .transition()
    .duration(duration)
    .textTween(() => t => formatValue(interpolator(t)))
    .end()
}

const initialValue = 0

function AnimatedNumber({ duration = 1000, value = 0 }) {
  const numRef = useRef(null)
  const [animated, setAnimated] = useState(false)
  // render the value directly after the animation is complete.
  const displayedValue = animated ? value : initialValue

  useEffect(() => {
    /*
     * We're animating the DOM node content outside of the React render cycle
     * so use node.textContent to check if we've already rendered the value.
     */
    const numElement = numRef.current
    if (animated) return // only run the intersection observer once.
    if (formatValue(value) === numElement.textContent) return // nothing to animate yet.

    const intersectionObserver = new window.IntersectionObserver(async entries => {
      // If intersectionRatio is 0, the target is out of view and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) return

      /*
       * Once target element is in viewport, animate it then unobserve.
       * Only run the full animation if prefers reduced motion is false
       * and d3 hasn't already started an animation.
       */
      const animationInProgress = numElement.textContent !== formatValue(initialValue)
      const animationDuration =
        !prefersReducedMotion() && !animationInProgress ? duration : 0
      intersectionObserver.unobserve(numElement)
      await animateValue(numElement, initialValue, value, animationDuration)
      setAnimated(true)
    })

    intersectionObserver.observe(numElement)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [initialValue, value, duration])

  return <span ref={numRef}>{formatValue(displayedValue)}</span>
}

AnimatedNumber.propTypes = {
  duration: PropTypes.number,
  value: PropTypes.number.isRequired
}

export default AnimatedNumber
