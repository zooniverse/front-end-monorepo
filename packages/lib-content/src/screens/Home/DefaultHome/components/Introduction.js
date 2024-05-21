import { Anchor, Box, Paragraph } from 'grommet'
import styled from 'styled-components'
import { SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from '../../../../translations/i18n.js'

import Stats from '../../../../components/Stats/Stats.js'
import SubHeading from '../../../../components/HeadingForAboutNav/SubHeading.js'

const StyledSignIn = styled(Anchor)`
  width: 47%;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  font-size: 0.8rem;
  padding: 8px 5px;
  text-align: center;
  color: black;
  background-color: white;
  font-weight: normal;

  &:hover {
    text-decoration: none;
  }
`

const StyledRegister = styled(Anchor)`
  width: 47%;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  font-size: 0.8rem;
  padding: 8px 5px;
  text-align: center;
  font-weight: normal;
  color: white;
  background-color: ${props => props.theme.global.colors['neutral-1']};

  &:hover {
    text-decoration: none;
  }
`

export default function Introduction() {
  const { t } = useTranslation()

  return (
    <>
      <SpacedHeading
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        level={2}
        size='1.5rem'
        alignSelf='center'
        margin={{ top: 'medium', bottom: '15px' }}
      >
        {t('Home.DefaultHome.headings.one')}
      </SpacedHeading>
      <SubHeading>{t('Home.DefaultHome.subheadings.one')}</SubHeading>
      <Paragraph
        color={{ light: 'black', dark: 'white' }}
        margin={{ vertical: 'medium' }}
      >
        {t('Home.DefaultHome.Introduction.description')}
      </Paragraph>
      <Box direction='row' justify='between' margin={{ bottom: 'large' }}>
        <StyledSignIn
          href='https://www.zooniverse.org/accounts/sign-in'
          label={t('Home.DefaultHome.Introduction.signIn')}
        />
        <StyledRegister
          href='https://www.zooniverse.org/accounts/register'
          label={t('Home.DefaultHome.Introduction.register')}
        />
      </Box>
      <SpacedHeading
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        level={2}
        size='1rem'
        alignSelf='center'
        margin={{ vertical: 'small' }}
      >
        {t('Home.DefaultHome.subheadings.two')}
      </SpacedHeading>
      <Stats />
    </>
  )
}
