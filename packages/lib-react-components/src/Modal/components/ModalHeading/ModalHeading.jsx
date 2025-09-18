import { Box } from 'grommet'
import { func, object, oneOfType, string } from 'prop-types'
import styled from 'styled-components'
import SpacedHeading from '../../../SpacedHeading'
import CloseButton from '../../../CloseButton'

const StyledBox = styled(Box)`
  min-height: 30px;
`

const StyledHeading = styled(SpacedHeading)`
  line-height: 0;
`

function ModalHeading ({ background = 'brand', color = 'neutral-6', className = '', closeFn, title = '' }) {
  const horizontalPad = (title) ? 'medium' : 'xsmall'
  const headingMargin = 'none'
  return (
    <StyledBox
      align='center'
      background={background}
      className={className}
      direction='row'
      gap='large'
      justify={(title) ? 'between' : 'end'}
      pad={{ horizontal: horizontalPad, vertical: 'none' }}
    >
      {title &&
        <StyledHeading
          color={color}
          margin={headingMargin}
        >
          {title}
        </StyledHeading>}
      {closeFn &&
        <CloseButton
          className='element-that-ignores-drag-actions'
          closeFn={closeFn}
          color={color}
        />
      }
    </StyledBox>
  )
}

ModalHeading.propTypes = {
  background: oneOfType([ object, string ]),
  className: string,
  closeFn: func,
  color: oneOfType([object, string]),
  title: string
}

export default ModalHeading
export { StyledHeading }
