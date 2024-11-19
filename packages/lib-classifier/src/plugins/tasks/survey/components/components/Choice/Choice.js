import { Box, Button, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'
import { PrimaryButton, Media } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'

import ConfusedWith from './components/ConfusedWith'
import Questions from './components/Questions'
import allowIdentification from './helpers/allowIdentification'
import getQuestionIds from './helpers/getQuestionIds'
import carouselTheme from './carouselTheme'

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

  const choice = choices?.get(choiceId) || {}
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
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      elevation='large'
      flex='grow'
      forwardedAs='section'
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {choice.images?.length > 0 && (
        <Carousel
          alignSelf='center'
          controls='arrows'
          data-testid='choice-images'
          height={{ max: 'medium' }}
          width='100%'
        >
          {choice.images.map((filename, index) => (
            <Media
              key={filename}
              alt={`${choice.label}-image${index}`}
              src={images.get(filename)}
            />
          ))}
        </Carousel>
      )}
      <Box
        pad={{
          horizontal: '20px',
          vertical: '30px'
        }}
      >
        <Heading
          id='choice-label'
          color={{
            dark: 'accent-1',
            light: 'neutral-7'
          }}
          size='1.5rem'
          weight='bold'
        >
          {strings.get(`choices.${choiceId}.label`)}
        </Heading>
        <Paragraph>
          {strings.get(`choices.${choiceId}.description`)}
        </Paragraph>
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
            color: 'light-3',
            side: 'top',
            size: 'small'
          }}
          direction='row'
          fill='horizontal'
          gap='xsmall'
          justify='center'
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

export default withThemeContext(Choice, carouselTheme)
