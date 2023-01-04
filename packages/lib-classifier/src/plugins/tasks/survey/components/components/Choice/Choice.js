import { Box, Button, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import { PrimaryButton, Media } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'
import { useEffect, useRef } from 'react'

import ConfusedWith from './components/ConfusedWith'
import Questions from './components/Questions'
import allowIdentification from './helpers/allowIdentification'
import getQuestionIds from './helpers/getQuestionIds'
import styled, { withTheme } from 'styled-components'

const StyledBox = styled(Box)`
  &:focus {
    outline: 2px solid ${props => props.theme.global.colors[props.theme.global.colors.focus]};
  }
`

function Choice({
  answers = {},
  choiceId = '',
  handleAnswers = () => {},
  handleChoice = () => {},
  handleDelete = () => {},
  onIdentify = () => {},
  task
}) {
  const {
    choices,
    images,
    questions,
    strings
  } = task
  const choiceRef = useRef(null)

  useEffect(() => {
    if (choiceRef.current) {
      choiceRef.current.focus()
    }
  }, [choiceId])

  const { t } = useTranslation('plugins')

  const choice = choices?.[choiceId] || {}
  const questionIds = getQuestionIds(choiceId, task)
  const allowIdentify = allowIdentification(answers, choiceId, task)

  function handleKeyDown (event) {
    if (event.key === 'Escape') {
      handleDelete(choiceId)
    }
  }

  return (
    <StyledBox
      ref={choiceRef}
      aria-labelledby='choice-label'
      as=‘section’
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      elevation='large'
      flex='grow'
      onKeyDown={handleKeyDown}
      pad='small'
      tabIndex={0}
    >
      {choice.images?.length > 0 && (
        <Carousel
          controls='arrows'
          data-testid='choice-images'
          height={{ max: 'medium' }}
          width={{ max: 'medium' }}
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
      <Heading
        id='choice-label'
      >
        {strings.get(`choices.${choiceId}.label`)}
      </Heading>
      <Paragraph>{strings.get(`choices.${choiceId}.description`)}</Paragraph>
      {choice.confusionsOrder?.length > 0 && (
        <ConfusedWith
          choices={choices}
          choiceId={choiceId}
          confusions={choice.confusions}
          confusionsOrder={choice.confusionsOrder}
          handleChoice={handleChoice}
          images={images}
          strings={strings}
        />
      )}
      {questionIds.length > 0 && (
        <Questions
          answers={answers}
          questionIds={questionIds}
          questions={questions}
          setAnswers={handleAnswers}
          strings={strings}
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
          label={t('SurveyTask.Choice.notThis')}
          onClick={() => handleDelete(choiceId)}
        />
        <PrimaryButton
          data-testid='choice-identify-button'
          disabled={!allowIdentify}
          fill='horizontal'
          label={t('SurveyTask.Choice.identify')}
          onClick={() => onIdentify()}
        />
      </Box>
    </StyledBox>
  )
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

export default withTheme(Choice)
