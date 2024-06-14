import { SpacedText } from '@zooniverse/react-components'
import { node } from 'prop-types'

function FieldLabel({ children }) {
  return (
    <SpacedText
      color={{ dark: 'neutral-6', light: 'neutral-7' }}
      size='1rem'
      uppercase={false}
    >
      {children}
    </SpacedText>
  )
}

FieldLabel.propTypes = {
  children: node
}

export default FieldLabel
