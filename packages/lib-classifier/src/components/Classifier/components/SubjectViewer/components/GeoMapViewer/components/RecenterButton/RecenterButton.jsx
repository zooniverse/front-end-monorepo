import { Location } from 'grommet-icons'
import { func } from 'prop-types'

import ControlButton from '../ControlButton'

function RecenterButton({ onClick }) {
  return (
    <ControlButton
      a11yTitle='Recenter map to features'
      icon={<Location color='dark-5' size='small' />}
      onClick={onClick}
      title='Recenter map to features'
    />
  )
}

RecenterButton.propTypes = {
  onClick: func.isRequired
}

export default RecenterButton
