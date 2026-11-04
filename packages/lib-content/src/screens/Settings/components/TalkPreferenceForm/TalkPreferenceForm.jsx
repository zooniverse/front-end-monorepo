import { useId, useState } from 'react'
import { Box, Form, Text } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loader, StatusMessage } from '@zooniverse/react-components'

import useTalkPreferences from '../../helpers/useTalkPreferences'
import updateTalkPreference from '../../helpers/updateTalkPreference'

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

  async function onPreferenceChange (e) {
    const preferenceId = e.target.dataset.talkPreferenceId
    const newPreferenceValue = e.target.value

    // This function updates the old data (an array of Talk Preferences) by
    // changing the values of a single Talk Preference. It returns a new copy
    // of the array.
    function updateData (prevData) {
      const newData = prevData
        ? JSON.parse(JSON.stringify(prevData))
        : []
        
      const updatedItem = newData.find(pref => pref.id === preferenceId)
      if (updatedItem) {
        updatedItem.email_digest = newPreferenceValue
      }
      return newData
    }
    
    // Now let's update the data optimistically!
    // i.e. we'll quietly change the local data and update Panoptes, and we'll
    // only alert the user of the operations if something goes wrong.
    try {
      await mutate(

        // Step 1a: update Panoptes.
        // If this succeeds, the changes are "confirmed" into the local data.
        // If this fails, rollbackOnError() will catch the thrown exception and
        // roll back to a previous value.
        async (prevData) => {
          const newData = updateData(prevData)

          // ❗️ WARNING: if multiple operations are performing at the same time
          // over a slow network, this can lead to race conditions.
          // ‼️ QUESTION: should this have await, or not?
          // The problem occurs if we have multiple operations (e.g. changing 6
          // radio buttons at a time, OR using keyboard nav to quickly switch
          // between radio buttons) on a **slow network.** 
          // - If have `await`, multiple ops on a slow network causes the UI to
          //   flip between old & new states.
          // - If we don't have a `await`, then (maybe???) there's no guarantee
          //   the UI matches the data saved in Panoptes?
          await updateTalkPreference(
            { email_digest: newPreferenceValue },
            preferenceId
          )

          return newData
        },
        {
          // Step 1b: at the same time, don't wait for Panoptes update to
          // confirm success. Update the local cache data optimistically.
          // Roll back if something goes wrong.
          optimisticData: updateData,

          // Step 2: don't revalidate.
          revalidate: false,

          // Step 3: if something goes wrong, roll back to a previous state and
          // alert the user. The alert doesn't go away, btw.
          rollbackOnError(err) {
            console.error(err)
            setSaveError(err)
            return true
          }
        }
      )
    } catch (err) {
      console.error(err)
      setSaveError(err)
    }
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