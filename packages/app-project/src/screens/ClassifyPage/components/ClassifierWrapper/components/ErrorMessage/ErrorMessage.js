import counterpart from 'counterpart'
import { Box, Heading, Text } from 'grommet'
import { shape, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const Pre = styled.pre`
  margin: 0;
`

function ErrorMessage ({ error }) {
  const { message, name, stack } = error
  const errorString = stack || `${name}: ${message}`

  return (
    <Box
      background='#FFF2E9'
      border={{ color: 'tomato' }}
      pad='medium'
    >
      <Heading
        level='3'
        margin='none'
        size='small'
      >
        {counterpart('ErrorMessage.title')}
      </Heading>

      <Text size='small' margin={{ top: 'medium' }}>
        <Pre>
          {errorString}
        </Pre>
      </Text>
    </Box>
  )
}

ErrorMessage.propTypes = {
  error: shape({
    message: string.isRequired,
    name: string.isRequired,
    stack: string
  })
}

export default ErrorMessage
