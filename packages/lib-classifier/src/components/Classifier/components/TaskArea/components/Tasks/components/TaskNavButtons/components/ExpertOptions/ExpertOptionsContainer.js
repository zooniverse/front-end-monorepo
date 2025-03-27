import { bool, func } from 'prop-types'
import ExpertOptions from './ExpertOptions'

const DEFAULT_HANDLER = () => {}

function ExpertOptionsContainer({
  storeDemoMode,
  setDemoMode = DEFAULT_HANDLER,
  ...rest
}) {
  const showDemoModeToggle = window?.location?.search?.includes('demo=true')

  if (showDemoModeToggle && storeDemoMode === undefined) {
    setDemoMode(true)
  }

  if (showDemoModeToggle) {
    return <ExpertOptions {...rest} />
  }

  return null
}

ExpertOptionsContainer.propTypes = {
  setDemoMode: func,
  storeDemoMode: bool
}

export default ExpertOptionsContainer
