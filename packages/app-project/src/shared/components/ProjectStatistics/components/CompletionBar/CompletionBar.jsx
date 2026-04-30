import { number } from 'prop-types'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'

const ContainerBox = styled(Box)`
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
`

const Bar = styled(Box)`
  position: relative;
`

const StyledText = styled(SpacedText)`
  position: absolute;
  left: ${props => (props.$completeness < 0.2 ? '100%' : 'auto')};
  right: ${props => (props.$completeness < 0.2 ? 'auto' : '0')};
  top: 50%;
  transform: translateY(-50%);
`

function CompletionBar({ completeness = 0 }) {
  return (
    <ContainerBox height='60px' width='100%' background='brand'>
      <Bar
        height='60px'
        background='neutral-1'
        width={`${Math.round(completeness * 100)}%`}
      >
        <StyledText
          margin={{ horizontal: '15px' }}
          size='1.125rem'
          color={completeness < 0.2 ? 'black' : 'white'}
          $completeness={completeness}
        >
          {Math.round(completeness * 100)}%
        </StyledText>
      </Bar>
    </ContainerBox>
  )
}

CompletionBar.propTypes = {
  completeness: number
}

export default CompletionBar
