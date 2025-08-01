import { Box, Heading } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

function SectionHeading({
  icon,
  title
}) {
  return (
    <Box
      align='center'
      direction='row'
      gap='xsmall'
    >
      {icon}
      <StyledHeading
        color={{ dark: 'light-1', light: 'dark-4' }}
        level={3}
        size='1rem'
      >
        {title}
      </StyledHeading>
    </Box>
  )
}

SectionHeading.propTypes = {
  title: string
}

export default SectionHeading
