import React from 'react'
import { Box, Text } from 'grommet'
import { PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function TextTagButtons ({ disabled, task, onClick }) {
  return (
    <>
      {(task.text_tags.length > 0) &&
        <Text
          id={`textModifiers-${task.taskKey}`}
          weight='bold'
        >
          {counterpart('TextTask.modifiers')}
        </Text>
      }
      <Box
        gap='small'
        justify='start'
        direction='row'
      >
        {task.text_tags.map(tag => (
          <PlainButton
            aria-labelledby={`textModifiers-${task.taskKey} ${task.taskKey}-${tag}`}
            id={`${task.taskKey}-${tag}`}
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