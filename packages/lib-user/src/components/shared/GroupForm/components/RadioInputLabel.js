import { SpacedText } from '@zooniverse/react-components'
import { node } from 'prop-types'

function RadioInputLabel({ children, ...props }) {
  return (
    <SpacedText
      uppercase={false}
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
