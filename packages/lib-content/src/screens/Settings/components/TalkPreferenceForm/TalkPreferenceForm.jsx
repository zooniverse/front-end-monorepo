import { useId } from 'react'
import { Box, Form, Text } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import useTalkPreferences from '../../helpers/useTalkPreferences'

const EMAIL_DIGEST_OPTIONS = [
  'immediate',
  'daily',
  'weekly',
  'never',
]

const PseudoTable = styled(Box)`
  display: grid;
  gap: 0.5rem;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  /* A row of "table cells" with specific widths. */
  .pseudo-row {
    display: grid;
    grid-template-columns: 5fr ${'1fr '.repeat(EMAIL_DIGEST_OPTIONS.length)};
    align-items: center;
    column-gap: 0.5rem;
  }

  .header-cell {
    color: ${props => props.theme.global.colors['dark-5']};
    padding-bottom: 0.5rem;
  }

  .option-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`



function TalkPreferenceForm ({
  authUser,
  ...rest
}) {
  const { t } = useTranslation()
  const { data: talkPreferences, isLoading, error: loadError, isValidating, mutate } = useTalkPreferences({ login: authUser?.login })

  const isReady = !isLoading && !loadError

  return (
    <Form className="TalkPreferenceForm" {...rest}>

      {isLoading && 'isLoading'} --

      {isValidating && 'isValidating'} --

      {loadError && 'loadError'}

      <Text>EXAMPLE TEXT</Text>

      <PseudoTable>
        <div className='pseudo-row'>
          <div className='header-cell'>
            <Text>
              {t('Settings.EmailSettings.talkPreferences.sendEmail')}
            </Text>
          </div>
          {EMAIL_DIGEST_OPTIONS.map(option => (
            <div
              key={option}
              className='header-cell option-cell'
            >
              <Text>
                {t(`Settings.EmailSettings.talkPreferences.emailDigestOptions.${option}`)}
              </Text>
            </div>
          ))}
        </div>
        {isReady && talkPreferences?.map?.(tpref => (
          <TalkPreferenceRow
            key={tpref.id}
            talkPreference={tpref}
          />
        ))}
      </PseudoTable>

    </Form>
  )
}

function TalkPreferenceRow ({
  talkPreference
}) {
  const { t } = useTranslation()
  const idPrefix = useId()
  const name = `talkPreference-${talkPreference.category}`

  return (
    <fieldset>
      <legend className="sr-only">
        {t(`Settings.EmailSettings.talkPreferences.categories.${talkPreference.category}`)}
      </legend>
      <div className='pseudo-row'>
        <Text>
          {t(`Settings.EmailSettings.talkPreferences.categories.${talkPreference.category}`)}
        </Text>
        {EMAIL_DIGEST_OPTIONS.map((option, index) => {
          const optionId = `${idPrefix}-option-${index}`
          const isSelected = talkPreference.email_digest === option
          return (
            <div
              key={option}
              className="option-cell"
            >
              <input
                id={optionId}
                name={name}
                type="radio"
                checked={isSelected}
                value={option}
              />
              <label className='sr-only' htmlFor={optionId}>
                {t(`Settings.EmailSettings.talkPreferences.emailDigestOptions.${option}`)}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export default TalkPreferenceForm