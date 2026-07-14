import { Anchor, Box, Button, Form, FormField, Heading, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'

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
    letter-spacing: 5%;
    line-height: 120%;

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

function UnsubscribeForm () {

  const { t } = useTranslation()

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
}

export default UnsubscribeForm