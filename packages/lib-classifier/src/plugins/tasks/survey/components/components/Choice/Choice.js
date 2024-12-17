import { Box, Button, Carousel, Collapsible, Heading, Paragraph, Text } from 'grommet'
import { FormDown, FormUp } from 'grommet-icons'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
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

const StyledButton = styled(Button)`
  border: 1px solid ${props => props.theme.global.colors.brand};
  border-radius: 4px;
  flex: 1 0;
  margin-right: 1ch;
  max-width: 350px;
`

const StyledPrimaryButton = styled(PrimaryButton)`
  border-radius: 4px;
  flex: 1 0;
`

const DEFAULT_HANDLER = () => true

function Choice({
  answers = {},
  choiceId = '',
  handleAnswers = DEFAULT_HANDLER,
  handleCancel = DEFAULT_HANDLER,
  handleChoice = DEFAULT_HANDLER,
  onIdentify = DEFAULT_HANDLER,
  task
}) {
  const [showInfo, setShowInfo] = useState(false)
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
  const InfoLabel = (
    <Box
      align='center'
      direction='row'
      gap='xsmall'
    >
      {showInfo ? (
        <>
          <Text>{t('SurveyTask.Choice.lessInfo')}</Text>
          <FormUp />
        </>
      ) : (
        <>
          <Text>{t('SurveyTask.Choice.moreInfo')}</Text>
          <FormDown />
        </>
      )}
    </Box>
  )

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
          height={{
            max: 'medium',
            min: '160px'
          }}
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
          bottom: '10px',
          top: '20px'
        }}
      >
        <Box
          direction='row'
          fill='horizontal'
          height='auto'
          justify='between'
          margin={{ bottom: '20px' }}
        >
          <Heading
            id='choice-label'
            color={{
              dark: 'accent-1',
              light: 'neutral-7'
            }}
            margin='none'
            size='1.5rem'
            weight='bold'
          >
            {strings.get(`choices.${choiceId}.label`)}
          </Heading>
          <Button
            label={InfoLabel}
            onClick={() => setShowInfo(!showInfo)}          
            plain
          />
        </Box>
        <Collapsible
          open={showInfo}
        >
          <Box margin={{ bottom: '20px' }}>
            <Paragraph margin='none'>
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
          </Box>
        </Collapsible>
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
            side: 'bottom',
            size: 'small'
          }}
          direction='row'
          fill='horizontal'
          justify='center'
          pad={{ vertical: '20px' }}
        >
          <StyledButton
            fill='horizontal'
            label={t('SurveyTask.Choice.cancel')}
            onClick={() => handleCancel(choiceId)}
          />
          <StyledPrimaryButton
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
  handleCancel: PropTypes.func,
  handleChoice: PropTypes.func,
  onIdentify: PropTypes.func,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default withThemeContext(Choice, carouselTheme)
