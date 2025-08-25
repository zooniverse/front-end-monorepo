import { Heading } from 'grommet'
import withResponsiveContext from '@zooniverse/react-components/helpers/withResponsiveContext'
import { object, oneOfType, string } from 'prop-types'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  font-size: 0.875rem;
  line-height: 1.4;
`

function Subtitle ({ margin = '0', screenSize = '', text }) {
  const textMargin = (screenSize === 'small')
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

export default withResponsiveContext(Subtitle)
