import { number } from 'prop-types'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'

const Relative = styled(Box)`
  position: relative;
`

const StyledText = styled(SpacedText)`
  position: absolute;
  left: ${props => props.$completeness < 0.7 ? '100%' : 'auto'};
  right: ${props => props.$completeness < 0.7 ? 'auto' : '0'};
  top: 50%;
  transform: translateY(-50%);
`

function CompletionBar({ completeness = 0 }) {
  return (
    <Box height='40px' width='100%' background='accent-1'>
      <Relative
        height='40px'
        background='brand'
        width={`${completeness * 100}%`}
      >
        <StyledText
          margin={{ horizontal: '10px' }}
          size='1.2rem'
          color={completeness < 0.7 ? 'brand' : 'white'}
          $completeness={completeness}
        >
          {completeness * 100}%
        </StyledText>
      </Relative>
    </Box>
  )
}

CompletionBar.propTypes = {
  completeness: number
}

export default CompletionBar
