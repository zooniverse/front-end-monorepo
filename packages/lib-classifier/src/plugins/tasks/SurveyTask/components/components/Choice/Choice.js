import { Box, Button, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { GoldButton, Media } from '@zooniverse/react-components'

import Questions from './components/Questions'

export default function Choice (props) {
  const {
    choiceId,
    onCancel,
    task
  } = props

  const choice = task.choices?.[choiceId]

  return (
    <Box
      flex='grow'
      pad='small'
    >
      {choice.images.length > 0 && (
        <Carousel
          controls='arrows'
        >
          {choice.images.map(filename => (
            <Media
              key={filename}
              src={task.images[filename]}
            />
          ))}
        </Carousel>
      )}
      <Heading>{choice.label}</Heading>
      <Paragraph>{choice.description}</Paragraph>
      <Questions
        choiceId={choiceId}
        task={task}
      />
      <Box
        border={{
          color: 'light-5',
          side: 'top',
          size: 'small'
        }}
        direction='row'
        fill='horizontal'
        gap='xsmall'
        justify='center'
        margin={{ top: 'small' }}
        pad={{ top: 'small' }}
      >
        <Button
          fill='horizontal'
          label='Not this'
          onClick={() => onCancel()}
        />
        <GoldButton
          fill='horizontal'
          label='Identify'
          onClick={() => onCancel()}
        />
      </Box>
    </Box>
  )
}

Choice.defaultProps = {
  choiceId: '',
  onCancel: () => {}
}

Choice.propTypes = {
  choiceId: PropTypes.string,
  onCancel: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
