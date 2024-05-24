import { SpacedText } from '@zooniverse/react-components'
import { node } from 'prop-types'

function RadioInputLabel({ children, ...props }) {
  return (
    <SpacedText
      uppercase={false}
      style={{ whiteSpace: 'pre' }}
      {...props}
    >
      {children}
    </SpacedText>
  )
}

RadioInputLabel.propTypes = {
  children: node
}

export default RadioInputLabel
