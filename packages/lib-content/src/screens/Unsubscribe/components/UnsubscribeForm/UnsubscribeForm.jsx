import { Anchor, Box, Button, Form, FormField, Paragraph, TextInput } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n'

function UnsubscribeForm () {

  const { t } = useTranslation()

  return (
    <Box>
      <h2>{t('Unsubscribe.processed.header')}</h2>
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
    </Box>
  )
}

export default UnsubscribeForm