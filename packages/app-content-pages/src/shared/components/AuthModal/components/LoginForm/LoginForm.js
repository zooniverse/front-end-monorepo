import counterpart from 'counterpart'
import { Box, Heading, Text } from 'grommet'
import { func, string } from 'prop-types'
import React from 'react'
import Form from './components/Form'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function LoginForm (props) {
  const { generalError, onSubmit, validate } = props
  return (
    <Box width='medium'>
      <Heading size='small' margin={{ bottom: 'xsmall', top: 'none' }}>
        {counterpart('LoginForm.heading')}
      </Heading>
      <Text>
        {counterpart('LoginForm.instruction')}
      </Text>

      {generalError &&
        <Text color={{ light: 'status-critical', dark: 'status-error' }} role='alert'>{generalError}</Text>}

      <Form
        initialValues={{ login: '', password: '' }}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

LoginForm.defaultProps = {
  generalError: ''
}

LoginForm.propTypes = {
  generalError: string,
  onSubmit: func.isRequired
}

export default LoginForm
