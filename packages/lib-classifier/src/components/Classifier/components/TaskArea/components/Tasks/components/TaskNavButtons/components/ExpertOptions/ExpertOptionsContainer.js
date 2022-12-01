import PropTypes from 'prop-types'
import ExpertOptions from './ExpertOptions'

function ExpertOptionsContainer ({ storeDemoMode, setDemoMode, ...rest }) {
  const showDemoModeToggle = window?.location?.search?.includes('demo=true')

  if (showDemoModeToggle && storeDemoMode === undefined) {
    setDemoMode(true)
  }

  if (showDemoModeToggle) {
    return (
      <ExpertOptions {...rest} />
    );
  }

  return null
}

ExpertOptionsContainer.propTypes = {
  setDemoMode: PropTypes.func,
  storeDemoMode: PropTypes.bool
}

export default ExpertOptionsContainer