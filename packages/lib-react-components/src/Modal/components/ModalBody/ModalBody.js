import { Box } from 'grommet'
import PropTypes from 'prop-types'

function ModalBody ({
  background = {
    dark: 'dark-5',
    light: 'neutral-6'
  },
  children,
  className = '',
  overflow = 'auto',
  pad = {
    bottom: 'medium',
    horizontal: 'medium',
    top: 'small'
  }
}) {
  return (
    <Box
      background={background}
      className={className}
      overflow={overflow}
      pad={pad}
    >
      {children}
    </Box>
  )
}

ModalBody.propTypes = {
  background: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default ModalBody
