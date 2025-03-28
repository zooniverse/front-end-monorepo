import { bool, func } from 'prop-types'
import { useEffect } from 'react'

import ExpertOptions from './ExpertOptions'

const DEFAULT_HANDLER = () => {}

function ExpertOptionsContainer({
  storeDemoMode,
  setDemoMode = DEFAULT_HANDLER
}) {
  const showDemoModeToggle = window?.location?.search?.includes('demo=true')

  useEffect(() => {
    if (showDemoModeToggle && storeDemoMode === undefined) {
      setDemoMode(true)
    }
  }, [storeDemoMode, setDemoMode])

  return showDemoModeToggle ? <ExpertOptions /> : null
}

ExpertOptionsContainer.propTypes = {
  setDemoMode: func,
  storeDemoMode: bool
}

export default ExpertOptionsContainer
