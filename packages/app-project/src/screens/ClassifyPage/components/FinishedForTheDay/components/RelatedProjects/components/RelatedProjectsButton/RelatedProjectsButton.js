import counterpart from 'counterpart'
import { Button, Text } from 'grommet'
import { func } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  border-width: 1px;
  flex: 1 1 300px;
  margin: 0 10px 10px 0;
`

function RelatedProjectsButton (props) {
  const { onClick } = props
  const buttonText = counterpart('RelatedProjectsButton.label')
  return (
    <StyledButton
      a11yTitle={buttonText}
      onClick={onClick}
      label={(
        <Text size='small'>
          {buttonText}
        </Text>
      )}
    />
  )
}

RelatedProjectsButton.propTypes = {
  onClick: func.isRequired
}

export default RelatedProjectsButton
