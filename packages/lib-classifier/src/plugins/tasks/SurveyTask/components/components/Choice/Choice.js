import { Box, Button, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { PrimaryButton, Media } from '@zooniverse/react-components'

import ConfusedWith from './components/ConfusedWith'
import Questions from './components/Questions'
import allowIdentification from './helpers/allowIdentification'
import getQuestionIds from './helpers/getQuestionIds'

import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function Choice (props) {
  const {
    answers,
    choiceId,
    handleAnswers,
    handleChoice,
    handleDelete,
    onIdentify,
    task
  } = props
  const {
    choices,
    images,
    questions
  } = task

  const choice = choices?.[choiceId] || {}
  const questionIds = getQuestionIds(choiceId, task)
  const allowIdentify = allowIdentification(answers, choiceId, task)

  return (
    <Box
      background='light-1'
      elevation='large'
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
      {choice.confusionsOrder?.length > 0 && (
        <ConfusedWith
          choices={choices}
          confusions={choice.confusions}
          confusionsOrder={choice.confusionsOrder}
          handleChoice={handleChoice}
          images={images}
        />
      )}
      {questionIds.length > 0 && (
        <Questions
          answers={answers}
          choiceId={choiceId}
          questionIds={questionIds}
          questions={questions}
          setAnswers={handleAnswers}
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
          onClick={() => handleDelete(choiceId)}
        />
        <PrimaryButton
          disabled={!allowIdentify}
          fill='horizontal'
          label={counterpart('Choice.identify')}
          onClick={() => onIdentify()}
        />
      </Box>
    </Box>
  )
}

Choice.defaultProps = {
  answers: {},
  choiceId: '',
  handleAnswers: () => {},
  handleChoice: () => {},
  handleDelete: () => {},
  onIdentify: () => {}
}

Choice.propTypes = {
  answers: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ])
  ),
  choiceId: PropTypes.string,
  handleAnswers: PropTypes.func,
  handleChoice: PropTypes.func,
  handleDelete: PropTypes.func,
  onIdentify: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
