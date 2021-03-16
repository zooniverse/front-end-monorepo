import { Box, Button, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { PrimaryButton, Media } from '@zooniverse/react-components'

import Questions from './components/Questions'
import allowIdentification from './helpers/allowIdentification'
import getQuestionIds from './helpers/getQuestionIds'

import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function Choice (props) {
  const {
    choiceId,
    onCancel,
    task
  } = props
  const {
    choices,
    images,
    questions
  } = task
  
  const [ answers, setAnswers ] = useState({})
  console.log('answers', answers)

  const choice = choices?.[choiceId]
  const questionIds = getQuestionIds(choiceId, task)
  const allowIdentify = allowIdentification(answers, choiceId, task)

  return (
    <Box
      flex='grow'
      pad='small'
    >
      {choice.images?.length > 0 && (
        <Carousel
          controls='arrows'
        >
          {choice.images.map((filename, index) => (
            <Media
              key={filename}
              alt={`${choice.label}-image${index}`}
              src={images[filename]}
            />
          ))}
        </Carousel>
      )}
      <Heading>{choice.label}</Heading>
      <Paragraph>{choice.description}</Paragraph>
      {questionIds.length > 0 && (
        <Questions
          answers={answers}
          choiceId={choiceId}
          questionIds={questionIds}
          questions={questions}
          setAnswers={setAnswers}
        />
      )}
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
          label={counterpart('Choice.notThis')}
          onClick={() => onCancel()}
        />
        <PrimaryButton
          disabled={!allowIdentify}
          fill='horizontal'
          label={counterpart('Choice.identify')}
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
