import { useRef, useState } from 'react'
import { Anchor, Box, Button, Form, FormField, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, PrimaryButton } from '@zooniverse/react-components'
import doUnsubscribe from '../../helpers/doUnsubscribe'

const ProcessedStateBox = styled(Box)`
  border-radius: 16px;
  ${props => css`border: 0.5px solid ${props.theme.global.colors['neutral-1']};`}
  text-align: center;
  box-shadow: 1px 1px 8px 0px #00000040;
  ${props => !props.theme.dark
    ? 'background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(239, 242, 245, 0.4) 100%);'
    : 'background: linear-gradient(180deg, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 0.4) 100%);'
  }
  gap: 20px;
  padding: 60px 80px;

  @media (width <= 678px) {
    padding: 60px 20px;
  }

  h1, p {

    a {
      font-weight: normal;
      text-decoration: underline;
    }
  }
`

const ProcessedStateHeading = styled(Heading)`
  ${props => !props.theme.dark
    ? 'color: #000000;'
    : 'color: #ffffff;'
  }
`

const ReadyStateForm = styled(Form)`
`

const ReadyStateInputBox = styled(Box)`
  gap: 2em;
`

function UnsubscribeForm ({
  processed = false,  // If processed is true, it means user was sent here from the Panoptes /unsubscribe route. Immediately show the "Unsubscribe successful!" message.
}) {
  const { t } = useTranslation()
  const [isBusy, setIsBusy] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isComplete, setIsComplete] = useState(processed)
  const inputEmail = useRef()

  function onInputChange (event) { setEmail(event.currentTarget.value) }

  // This only triggers if the email is valid.
  // Email validation is performed via native HTML form controls.
  async function onSubmit () {
    // Prepare to submit!
    setIsBusy(true)
    setIsError(false)

    // Do the submit!
    const email = inputEmail.current?.value || ''
    const success = await doUnsubscribe(email)

    // Successful?
    setIsBusy(false)
    setIsError(!success)
    setIsComplete(success)
  }

  if (isComplete) {
    // Once process is complete (either via this UnsubscribeForm, or from a
    // redirect from the Panoptes /unsubscribe route, show the "Unsubscribe
    // successful!" message.

    return (
      <ProcessedStateBox
        align='center'
        className='UnsubscribeForm'
      >
        <ProcessedStateHeading
          level={1}
        >
          {t('Unsubscribe.processed.header')}
        </ProcessedStateHeading>
        <Paragraph>
          <Trans
            i18nKey='Unsubscribe.processed.body'
            t={t}
            components={[
              <Anchor
                key='email-preferences'
                href='/setting/email'
              />
            ]}
          />
        </Paragraph>
      </ProcessedStateBox>
    )

  } else {
    // Otherwise, show the form for unsubscribing.

    return (
      <ReadyStateForm
        className='UnsubscribeForm'
        onSubmit={onSubmit}
      >
        <Heading
          level={1}
        >
          {t('Unsubscribe.form.header')}
        </Heading>
        <Paragraph>
          {t('Unsubscribe.form.body.p1')}
        </Paragraph>
        <Paragraph>
          {t('Unsubscribe.form.body.p2')}
        </Paragraph>
        <ReadyStateInputBox
          align='center'
        >
          <TextInput
            aria-label={t('Unsubscribe.form.inputEmail')}
            disabled={isBusy}
            ref={inputEmail}
            required
            type='email'
          />
          <PrimaryButton
            disabled={isBusy}
            label={t('Unsubscribe.form.submit')}
            type='submit'
          />
          
          {/*TODO: style these properly*/}
          {isBusy && <Loader />}
          {isError &&
            <Paragraph>
              {t('Unsubscribe.form.errors.general')}
            </Paragraph>
          }

        </ReadyStateInputBox>

      </ReadyStateForm>
    )
  }
}

UnsubscribeForm.propTypes = {
  processed: bool
}

export default UnsubscribeForm