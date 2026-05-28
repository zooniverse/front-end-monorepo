/* The styling of this component matches TitleStat in lib-user */

import { Box } from 'grommet'
import { number, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'

const StyledText = styled(SpacedText)`
  text-wrap: nowrap;
  text-align: center;
`

import AnimatedNumber from '@zooniverse/react-components/AnimatedNumber'

function Stat({ label, value }) {
  return (
    <Box align='center'>
      <StyledText
        color={{ dark: 'neutral-6', light: 'dark-4' }}
        uppercase={false}
        size='1rem'
      >
        {label}
      </StyledText>
      <SpacedText
        color={{ dark: 'accent-1', light: 'neutral-1' }}
        size='xxlarge'
      >
        <AnimatedNumber value={value} />
      </SpacedText>
    </Box>
  )
}

Stat.propTypes = {
  label: string.isRequired,
  value: number.isRequired
}

export default Stat
