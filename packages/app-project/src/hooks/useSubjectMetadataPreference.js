import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'

/**
 * A custom hook which returns a visitor's subject metadata expand preference state (true or false)
 * and a callback to set the preference state.
 * Defaults to closed during SSR. Reads localStorage lazily and only writes on user toggle.
 *
 * @returns {[boolean, function(boolean): void]} [isExpanded, handleToggle]
 */
export default function useSubjectMetadataPreference() {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (!isBrowser) return false
    try {
      const stored = window.localStorage.getItem('subjectMetadataExpanded')
      return stored === 'true'
    } catch (error) {
      // If accessing localStorage fails (e.g. blocked), default to closed
      return false
    }
  })

  function handleToggle(newExpandedState) {
    try {
      if (isBrowser) {
        window.localStorage.setItem('subjectMetadataExpanded', String(newExpandedState))
      }
    } catch (error) {
      // Ignore localStorage write errors
    }
    setIsExpanded(newExpandedState)
  }

  return [isExpanded, handleToggle]
}
