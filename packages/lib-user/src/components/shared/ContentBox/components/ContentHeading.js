import { SpacedText } from '@zooniverse/react-components'
import { Heading } from 'grommet'
import { node } from 'prop-types'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  font-size: 1rem;
  line-height: normal;
`

function ContentHeading({
  children
}) {
  return (
    <StyledHeading
      level={2}
      margin='0'
    >
      <SpacedText
        color={{
          dark: 'light-1',
          light: 'black'
        }}
        size='inherit'
        weight='bold'
      >
        {children}
      </SpacedText>
    </StyledHeading>
  )
}

ContentHeading.propTypes = {
  children: node.isRequired,
}

export default ContentHeading
