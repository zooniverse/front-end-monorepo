import { useEffect, useId, useRef, useState } from 'react'
import { Box, Form, Text } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loader, StatusMessage } from '@zooniverse/react-components'

import useTalkPreferences from '../../helpers/useTalkPreferences'
import updateTalkPreference from '../../helpers/updateTalkPreference'

const DEBOUNCE = 500

const BigLabel = styled(Text)`
  font-weight: 700;
  font-size: 1rem;
  font-style: bold;
  text-transform: uppercase;
`

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
  const [ saveError, setSaveError ] = useState(null)  // If the save failed, this is the error object.
  // ⚠️ Note that saveError is NEVER cleared, because multiple save operations
  // can occur at the same time and we don't know which will finish first.

  // Use one timer per preference ID, so that changing different rows doesn't cancel the other rows' saves.
  const timers = useRef({})

  // Flush on unmount so a pending change isn't lost.
  useEffect(() => {
    const pending = timers.current
    return () => {
      Object.values(pending).forEach(clearTimeout)
    }
  }, [])

  // Do the async update to panoptes.
  // updateTalkPreference runs once, 500ms after the last input change, with the final value.
  function debouncedSave (preferenceId, value) {
    clearTimeout(timers.current[preferenceId])
    timers.current[preferenceId] = setTimeout(async () => {
      delete timers.current[preferenceId]
      try {
        await updateTalkPreference({ email_digest: value }, preferenceId)
      } catch (err) {
        console.error(err)
        setSaveError(err)
        // If there's an error, DO revalidate here so the UI matches what Panoptes actually has.
        mutate()
      }
    }, DEBOUNCE)
  }

  function onPreferenceChange (e) {
    const preferenceId = e.target.dataset.talkPreferenceId
    const newPreferenceValue = e.target.value

    // Optimistic local update only. No network call, no revalidation.
    // This mutate() updates `data` returned from useTalkPreferences.
      mutate(
        (prevData) => {
        const newData = prevData ? JSON.parse(JSON.stringify(prevData)) : []
        const item = newData.find(pref => pref.id === preferenceId)

        if (item) item.email_digest = newPreferenceValue
        return newData
        },
        {
          // Don't revalidate, we've optimistically updated the UI and don't need it.
          revalidate: false
          // rollbackOnError does not apply, because the mutation isn't tied to the network request in debouncedSave.
          // On failure in debouncedSave(), mutate() with no arguments revalidates and restores the UI to match the server state.
        }
      )

      // Now update panoptes. This does not need to be awaited in in PreferenceChange().
      debouncedSave(preferenceId, newPreferenceValue)
  }

  // "Is ready" means we have sufficient data to show the form input. We don't
  // check for isValidating, because that that would make the form input
  // disappear every time we validate.
  const isReady = !isLoading && !loadError

  // If a FETCH operation is ongoing, show the Loader. That's all.
  const isBusy = isLoading || isValidating

  const loadErrorMessage = loadError?.toString() || (loadError && 'Unknown error')
  const saveErrorMessage = saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')
  const statusType =
    (loadError || saveError) ? 'error'
    : ''
  const statusMessage =
    loadError ? loadErrorMessage
    : saveError ? saveErrorMessage
    : ''

  return (
    <Form className="TalkPreferenceForm" {...rest}>

      <BigLabel as="h2">
        {t(`Settings.EmailSettings.talkPreferences.title`)}
      </BigLabel>

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
            onChange={onPreferenceChange}
            talkPreference={tpref}
          />
        ))}
      </PseudoTable>

      <Box
        direction='row'
        align='center'
        justify='between'
        gap='1em'
        wrap={true}
      >
        <Box
          flex='grow'
          direction='row'
          align='center'
        >
          <StatusMessage
            text={statusMessage}
            type={statusType}
          />
        </Box>

        {(isBusy) && <Loader />}
      </Box>

    </Form>
  )
}

const DEFAULT_FUNCTION = () => {}

function TalkPreferenceRow ({
  onChange = DEFAULT_FUNCTION,
  talkPreference
}) {
  const { t } = useTranslation()
  const idPrefix = useId()
  const name = talkPreference.category

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
                data-talk-preference-id={talkPreference.id}
                name={name}
                type="radio"
                checked={isSelected}
                onChange={onChange}
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
