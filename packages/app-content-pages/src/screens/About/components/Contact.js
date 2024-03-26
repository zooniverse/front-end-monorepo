import { Anchor, Box, Button, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'next-i18next'
import { Edit, Group, Help } from 'grommet-icons'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  text-align: center;
  color: white;
  padding: 10px;
  background: ${props => props.theme.global.colors['neutral-1']};
  width: clamp(250px, 100%, 400px);
  border-radius: 5px;
`

export default function Contact({ widgetLoaded = false }) {
  const { t } = useTranslation()

  const handleClick = e => {
    if (widgetLoaded) {
      window.FreshworksWidget('open')
    }
  }

  return (
    <Box pad={{ horizontal: 'medium' }}>
      <Heading
        alignSelf='center'
        level={3}
        margin='0'
        size='1.5rem'
        textAlign='center'
        weight='normal'
      >
        {t('AboutPage.contact.subheading')}
      </Heading>
      <Box
        direction='row'
        gap='xlarge'
        width='100%'
        justify='center'
        pad={{ vertical: 'medium' }}
      >
        <Box width='30%' align='center'>
          <Box
            height='2.5rem'
            width='2.5rem'
            align='center'
            justify='center'
            background='neutral-1'
            round='50%'
          >
            <Help size='1.5rem' color='white' />
          </Box>
          <Text textAlign='center' margin={{ top: 'xsmall' }}>
            {t('AboutPage.contact.categories.one')}
          </Text>
        </Box>
        <Box width='30%' align='center' pad={{ horizontal: 'small' }}>
          <Box
            height='2.5rem'
            width='2.5rem'
            align='center'
            justify='center'
            background='neutral-1'
            round='50%'
          >
            <Group size='1.5rem' color='white' />
          </Box>
          <Text textAlign='center' margin={{ top: 'xsmall' }}>
            {t('AboutPage.contact.categories.two')}
          </Text>
        </Box>
        <Box width='30%' align='center'>
          <Box
            height='2.5rem'
            width='2.5rem'
            align='center'
            justify='center'
            background='neutral-1'
            round='50%'
          >
            <Edit size='1.5rem' color='white' />
          </Box>
          <Text textAlign='center' margin={{ top: 'xsmall' }}>
            {t('AboutPage.contact.categories.three')}
          </Text>
        </Box>
      </Box>
      <Paragraph margin={{ top: '0' }}>
        <Trans
          i18nKey='AboutPage.contact.paragraphs.one'
          t={t}
          components={[
            <Anchor
              key='publications-page'
              href='/publications' // after switch to app-root, this will need to be /about/publications
            />,
            <Anchor
              key='freshdesk-page'
              href='https://zooniverse.freshdesk.com/support/solutions'
            />
          ]}
        />
      </Paragraph>
      <Paragraph>{t('AboutPage.contact.paragraphs.two')}</Paragraph>
      <Box align='center' pad={{ top: 'small', bottom: 'xlarge' }}>
        <StyledButton primary textAlign='center' onClick={handleClick}>
          {t('AboutPage.contact.heading')}
        </StyledButton>
        <Paragraph margin={{ top: 'medium' }}>
          {t('AboutPage.contact.paragraphs.three')}
        </Paragraph>
      </Box>
    </Box>
  )
}
