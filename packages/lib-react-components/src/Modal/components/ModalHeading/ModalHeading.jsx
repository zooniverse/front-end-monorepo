import { Box } from 'grommet'
import { elementType, func, object, oneOfType, string } from 'prop-types'
import styled from 'styled-components'
import SpacedHeading from '../../../SpacedHeading'
import CloseButton from '../../../CloseButton'

const StyledBox = styled(Box)`
  min-height: 30px;
`

const StyledHeading = styled(SpacedHeading)`
  line-height: 0;
`

function ModalHeading ({ background = 'brand', color = 'neutral-6', className = '', closeFn, icon: Icon, title = '' }) {
  const horizontalPad = (title) ? 'medium' : 'xsmall'
  const headingMargin = 'none'
  const heading = title &&
    <StyledHeading
      color={color}
      margin={headingMargin}
    >
      {title}
    </StyledHeading>
  return (
    <StyledBox
      align='center'
      background={background}
      className={className}
      direction='row'
      gap='large'
      justify={(title || Icon) ? 'between' : 'end'}
      pad={{ horizontal: horizontalPad, vertical: 'none' }}
    >
      {Icon
        ? <Box align='center' direction='row' gap='xsmall'>
            <Icon aria-hidden='true' color={color} size='15px' />
            {heading}
          </Box>
        : heading}
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
  icon: elementType,
  title: string
}

export default ModalHeading
export { StyledHeading }
