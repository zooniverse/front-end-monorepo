import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import SpacedHeading from '../../../SpacedHeading'
import CloseButton from '../../../CloseButton'

const StyledBox = styled(Box)`
  min-height: 30px;
`

const Heading = styled.h2`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.18em;
  margin: 0;
  text-shadow: 0 2px 2px rgba(0,0,0,0.22);
  text-transform: uppercase;
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
        <SpacedHeading color={color}>
          {title}
        </SpacedHeading>}
      <CloseButton closeFn={closeFn} />
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
