import { Anchor, Box, Button, Heading, Image, Text } from 'grommet'
import { useTranslation } from '../../translations/i18n.js'

export default function Mobile() {
  const { t } = useTranslation()
  return (
    <Box margin={{ bottom: 'medium' }}>
      <Heading
        level={3}
        size='1.5rem'
        alignSelf='center'
        weight='normal'
        margin='0'
        textAlign='center'
      >
        {t('AboutPage.mobile.subheading')}
      </Heading>
      <Box align='center'>
        <Image
          alt={t('AboutPage.mobile.altImage')}
          src='/assets/phone.png'
          width='300px'
          margin={{ vertical: '30px' }}
        />
        <Text>{t('AboutPage.mobile.description')}</Text>
      </Box>
      <Box justify='center' gap='xxsmall' direction='row' margin={{ top: '10px' }}>
        <Button
          as={Anchor}
          href='https://apps.apple.com/us/app/zooniverse/id1194130243'
          aria-label={t('AboutPage.mobile.altAppStore')}
        >
          <Image
            alt={t('AboutPage.mobile.altAppStore')}
            src='/assets/app-store.png'
            width='140px'
          />
        </Button>
        <Button
          as={Anchor}
          href='https://play.google.com/store/apps/details?id=com.zooniversemobile'
          aria-label={t('AboutPage.mobile.altPlayStore')}
        >
          <Image
            alt={t('AboutPage.mobile.altPlayStore')}
            src='/assets/google-play.png'
            width='140px'
          />
        </Button>
      </Box>
    </Box>
  )
}
