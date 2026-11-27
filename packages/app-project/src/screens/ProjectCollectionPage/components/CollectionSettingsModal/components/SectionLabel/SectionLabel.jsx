import { SpacedText } from '@zooniverse/react-components'
import { node } from 'prop-types'

function SectionLabel({ children }) {
  return (
    <SpacedText
      color={{ dark: 'neutral-6', light: 'dark-4' }}
      size='1rem'
      weight='bold'
    >
      {children}
    </SpacedText>
  )
}

SectionLabel.propTypes = {
  children: node.isRequired
}

export default SectionLabel
