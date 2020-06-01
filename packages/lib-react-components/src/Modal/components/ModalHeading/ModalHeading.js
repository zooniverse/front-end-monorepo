import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
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

function ModalHeading ({ background, className = '', closeFn, title = '' }) {
  const horizontalPad = (title) ? 'medium' : 'xsmall'
  return (
    <StyledBox
      align='center'
      background={background || 'brand'}
      className={className}
      direction='row'
      gap='large'
      justify={(title) ? 'between' : 'end'}
      pad={{ horizontal: horizontalPad, vertical: 'none' }}
    >
      {title &&
        <Heading>
          {title}
        </Heading>}
      <CloseButton closeFn={closeFn} />
    </StyledBox>
  )
}

ModalHeading.propTypes = {
  className: PropTypes.string,
  closeFn: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default ModalHeading
