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

function ModalHeading ({ className, closeFn, title }) {
  return (
    <StyledBox
      align='center'
      background='brand'
      className={className}
      direction='row'
      gap='large'
      justify='between'
      pad={{ horizontal: 'medium', vertical: 'none' }}
    >
      <Heading>
        {title}
      </Heading>
      <CloseButton closeFn={closeFn} />
    </StyledBox>
  )
}

ModalHeading.propTypes = {
  className: PropTypes.string,
  closeFn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

ModalHeading.defaultProps = {
  className: ''
}

export default ModalHeading
