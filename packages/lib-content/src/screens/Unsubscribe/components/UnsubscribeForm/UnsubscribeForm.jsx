import { useRef, useState } from 'react'
import { Anchor, Box, Form, FormField, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'
import { bool } from 'prop-types'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import doUnsubscribe from '../../helpers/doUnsubscribe'
import CustomPrimaryButton from '../CustomPrimaryButton/CustomPrimaryButton.jsx'

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
    const success = await doUnsubscribe({ email })

    // Successful?
    setIsBusy(false)
    setIsError(!success)
    setIsComplete(success)
  }

  return (
    <Box className='UnsubscribeForm'>

      {/* Accessibility note: since the form's "Success Message" is its own standalone component (i.e. ProcessedStateBox), we use aria-live to announce when the input form has transitioned to the "success message" component. */}
      <Box aria-live="polite" margin={{ bottom: '2em'}}>

        {isComplete ? (

          // Once process is complete (either via this UnsubscribeForm, or from a
          // redirect from the Panoptes /unsubscribe route, show the "Unsubscribe
          // successful!" message.

          <ProcessedStateBox
            align='center'
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

        ) : (

          // Otherwise, show the form for unsubscribing.

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
              <CustomPrimaryButton
                disabled={isBusy}
                label={t('Unsubscribe.form.submit')}
                type='submit'
              />
              
              {/*TODO: style these properly*/}
              {isBusy && <Loader />}
              
            </ReadyStateInputBox>
          </ReadyStateForm>
        )}
      </Box>

      {/* The status message is used ONLY for error messages. It sits outside the ReadyStateForm's <form> to avoid nested live regions. (StatusMessage has role=status, while ReadyStateForm sits inside an aria-live=polite.) */}
      <StatusMessage
        type={!isComplete && isError && 'error'}
        text={!isComplete && isError && t('Unsubscribe.form.errors.general')}
      />
    </Box>
  )
}

UnsubscribeForm.propTypes = {
  processed: bool
}

export default UnsubscribeForm