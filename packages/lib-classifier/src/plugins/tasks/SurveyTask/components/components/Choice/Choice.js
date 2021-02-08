import { Box, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { Media } from '@zooniverse/react-components'

export default function Choice (props) {
  const {
    choiceId,
    task
  } = props

  const choice = task.choices[choiceId]

  return (
    <Box
      pad='small'
    >
      {choice.images.length > 0 && (
        <Carousel
          controls='arrows'
        >
          {choice.images.map(filename => (
            <Media 
              src={task.images[filename]}
            />
          ))}
        </Carousel>
      )}
      <Heading>{choice.label}</Heading>
      <Paragraph>{choice.description}</Paragraph>
      <Box>Questions go here.</Box>
      <Box>Buttons go here.</Box>
    </Box>
  )
}

Choice.defaultProps = {
  choiceId: ''
}

Choice.propTypes = {
  choiceId: PropTypes.string,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
