import counterpart from 'counterpart'
import { Box, Button } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import CloseIcon from '../CloseIcon'

counterpart.registerTranslations('en', en)

const Heading = styled.h5`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.18em;
  margin: 0;
  text-shadow: 0 2px 2px rgba(0,0,0,0.22);
  text-transform: uppercase;
`

const StyledButton = styled(Button)`
  height: 1rem;
  width: 1rem;

  svg {
    opacity: 0.7;
  }

  &:active svg,
  &:hover svg {
    opacity: 1;
  }
`

function ModalHeading ({ closeFn, title }) {
  return (
    <Box
      align='center'
      background='teal'
      direction='row'
      gap='large'
      justify='between'
      pad={{ horizontal: 'medium', vertical: 'xsmall' }}
    >
      <Heading>
        {title}
      </Heading>
      <StyledButton
        a11yTitle={counterpart('ModalHeading.close')}
        onClick={closeFn}
      >
        <CloseIcon />
      </StyledButton>
    </Box>
  )
}

ModalHeading.propTypes = {
  closeFn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ModalHeading
