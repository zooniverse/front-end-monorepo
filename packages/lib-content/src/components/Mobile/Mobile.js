import { Anchor, Box, Button, Image, Text } from 'grommet'
import { useTranslation } from '../../translations/i18n.js'

export default function Mobile() {
  const { t } = useTranslation()
  return (
    <Box margin={{ bottom: 'medium' }}>
      <Box align='center'>
        <Image
          alt={t('AboutPage.mobile.altImage')}
          src='https://static.zooniverse.org/fem-assets/phone.png'
          width='300px'
          margin={{ vertical: '30px' }}
        />
        <Text textAlign='center' color={{ light: 'black', dark: 'white' }}>{t('AboutPage.mobile.description')}</Text>
      </Box>
      <Box justify='center' gap='xxsmall' direction='row' margin={{ top: '15px' }}>
        <Button
          as={Anchor}
          href='https://apps.apple.com/us/app/zooniverse/id1194130243'
          aria-label={t('AboutPage.mobile.altAppStore')}
        >
          <Image
            alt={t('AboutPage.mobile.altAppStore')}
            src='https://static.zooniverse.org/fem-assets/app-store.png'
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
            src='https://static.zooniverse.org/fem-assets/google-play.png'
            width='140px'
          />
        </Button>
      </Box>
    </Box>
  )
}
