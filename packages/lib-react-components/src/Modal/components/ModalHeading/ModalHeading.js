import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import SpacedHeading from '../../../SpacedHeading'
import CloseButton from '../../../CloseButton'

const StyledBox = styled(Box)`
  min-height: 30px;
`

function ModalHeading ({ background = 'brand', color = 'neutral-6', className = '', closeFn, title = '' }) {
  const horizontalPad = (title) ? 'medium' : 'xsmall'
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
        <SpacedHeading
          color={color}
        >
          {title}
        </SpacedHeading>}
      <CloseButton
        closeFn={closeFn}
        color={color}
      />
    </StyledBox>
  )
}

ModalHeading.propTypes = {
  background: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  className: PropTypes.string,
  closeFn: PropTypes.func.isRequired,
  color: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string
}

export default ModalHeading
