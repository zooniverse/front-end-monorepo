import { Heading, ResponsiveContext } from 'grommet'
import { object, oneOfType, string } from 'prop-types'
import styled from 'styled-components'
import { useContext } from 'react'

const StyledHeading = styled(Heading)`
  font-size: 0.875rem;
  line-height: 1.4;
`

function Subtitle ({ margin = '0', text }) {
  const size = useContext(ResponsiveContext)

  const textMargin = (size === 'small')
    ? { bottom: 'xsmall', top: 'none' }
    : margin

  return (
    <StyledHeading level='3' margin={textMargin}>
      {text}
    </StyledHeading>
  )
}

Subtitle.propTypes = {
  margin: oneOfType([object, string]),
  screenSize: string,
  text: string.isRequired
}

export default Subtitle
