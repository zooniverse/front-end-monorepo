import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import { PlainButton } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

export default function TextTagButtons ({ disabled, tags, taskKey, onClick }) {
  const { t } = useTranslation('plugins')
  if (tags.length > 0) {
    return (
      <>
        <Text
          id={`textModifiers-${taskKey}`}
          weight='bold'
        >
          {t('TextTask.TextTagButtons.modifiers')}
        </Text>
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
      </>
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
