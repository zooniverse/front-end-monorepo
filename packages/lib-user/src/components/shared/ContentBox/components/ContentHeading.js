import { SpacedText } from '@zooniverse/react-components'
import { Heading } from 'grommet'
import { node, number, string } from 'prop-types'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  font-size: 18px;
  line-height: normal;
`

function ContentHeading ({
  children
}) {
  return (
    <StyledHeading
      level={2}
      margin='none'
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
  level: number,
  text: string
}

export default ContentHeading
