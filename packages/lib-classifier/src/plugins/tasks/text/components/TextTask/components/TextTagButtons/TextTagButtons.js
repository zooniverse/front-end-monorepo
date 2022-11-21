import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import { PlainButton } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'

const Fieldset = styled('fieldset')`
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
`
  
export default function TextTagButtons ({ disabled, tags, taskKey, onClick }) {
  const { t } = useTranslation('plugins')
  if (tags.length > 0) {
    return (
      <Fieldset>
        <legend>
          <Text
            id={`textModifiers-${taskKey}`}
            weight='bold'
          >
            {t('TextTask.TextTagButtons.modifiers')}
          </Text>
        </legend>
        <Box
          gap='small'
          justify='start'
          direction='row'
        >
          {tags.map(tag => (
            <PlainButton
              aria-labelledby={`textModifiers-${taskKey} ${taskKey}-${tag}`}
              id={`${taskKey}-${tag}`}
              key={tag}
              disabled={disabled}
              justify='start'
              onClick={(event) => onClick(event)}
              text={tag}
              value={tag}
            />
          ))}
        </Box>
      </Fieldset>
    )
  }

  return null
}

TextTagButtons.defaultProps = {
  disabled: false,
  onClick: () => {},
  tags: []
}

TextTagButtons.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  taskKey: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
}
