import { Box, Button, Carousel, Heading, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import { PrimaryButton, Media } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

import ConfusedWith from './components/ConfusedWith'
import Questions from './components/Questions'
import allowIdentification from './helpers/allowIdentification'
import getQuestionIds from './helpers/getQuestionIds'

export default function Choice({
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

  const { t } = useTranslation('plugins')

  const choice = choices?.[choiceId] || {}
  const questionIds = getQuestionIds(choiceId, task)
  const allowIdentify = allowIdentification(answers, choiceId, task)

  return (
    <Box
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      elevation='large'
      flex='grow'
      pad='small'
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
      <Heading>{strings.get(`choices.${choiceId}.label`)}</Heading>
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
    </Box>
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
