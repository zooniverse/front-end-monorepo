import React from 'react'
import PropTypes from 'prop-types'
import ExpertOptions from './ExpertOptions'
import queryString from 'query-string'

function ExpertOptionsContainer (props) {
  const [ showDemoModeToggle, setShowDemoModeToggle ] = React.useState(false)

  React.useEffect(() => {
    const { demo } = (window?.location?.search) ? queryString.parse(window.location.search) : { demo: props.demo }
    const demoState = (demo === 'true') ? true : false
    setShowDemoModeToggle(demoState)
  })

  if (showDemoModeToggle) {
    return (
      <ExpertOptions {...props} />
    );
  }

  return null
}

ExpertOptionsContainer.propTypes = {
  demo: PropTypes.bool
}

ExpertOptionsContainer.defaultProps = {
  demo: false
}

export default ExpertOptionsContainer