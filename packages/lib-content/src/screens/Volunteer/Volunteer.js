'use client'

import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from '../../translations/i18n.js'
import styled from 'styled-components'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'
import { BarChart, Certificate, Chat } from 'grommet-icons'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.js'
import {
  MobileHeading,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.js'

const headingColor = { light: 'black', dark: 'white' }

const StyledBox = styled(Box)`
  align-items: center;
`

const StyledRegister = styled(Anchor)`
  width: 300px;
  border-radius: 5px;
  font-size: 1rem;
  padding: 8px 5px;
  text-align: center;
  color: black;
  background-color: ${props => props.theme.global.colors['neutral-2']};
  font-weight: normal;

  &:hover {
    text-decoration: none;
  }
`

const StyledBeta = styled(Anchor)`
  width: 300px;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  font-size: 1rem;
  padding: 8px 5px;
  text-align: center;
  color: black;
  background-color: white;
  font-weight: normal;

  &:hover {
    text-decoration: none;
  }
`

function Volunteer() {
  const { t } = useTranslation()

  return (
    <GetInvolvedLayout>
      <MobileHeading level={1} size='1.5rem'>
        {t('Volunteer.title')}
      </MobileHeading>
      <Box pad={{ horizontal: 'medium', bottom: 'large' }} align='center'>
        <MaxWidthContent color={{ light: 'black', dark: 'white' }}>
          <StyledHeading
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            level={1}
            size='small'
          >
            {t('Volunteer.title')}
          </StyledHeading>
          <SpacedHeading
            level={2}
            align='center'
            size='1.5rem'
            margin={{ top: 'medium' }}
            textAlign='center'
          >
            {t('Volunteer.howTo.heading')}
          </SpacedHeading>
          <Paragraph margin={{ top: '0' }}>
            {t('Volunteer.howTo.paragraphs.one')}
          </Paragraph>

          {/** CLASSIFY */}
          <Heading
            level={3}
            size='1.13rem'
            weight='bold'
            color={headingColor}
            margin='0'
          >
            {t('Volunteer.classify.heading')}
          </Heading>
          <Paragraph>{t('Volunteer.classify.paragraphs.one')}</Paragraph>
          <Paragraph margin='0'>
            <Trans
              i18nKey='Volunteer.classify.paragraphs.two'
              t={t}
              components={[<Anchor key='zooniverse-homepage' href='/' />]}
            />
          </Paragraph>

          {/** Register */}
          <Heading
            level={3}
            size='1.13rem'
            weight='bold'
            color={headingColor}
            margin={{ vertical: 'medium' }}
          >
            {t('Volunteer.register.heading')}
          </Heading>
          <Box gap='medium'>
            <StyledBox direction='row' gap='small'>
              <BarChart size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'neutral-1', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Volunteer.register.subheadings.one')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  {t('Volunteer.register.paragraphs.one')}
                </Paragraph>
              </Box>
            </StyledBox>
            <StyledBox direction='row' gap='small'>
              <Certificate size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'neutral-1', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Volunteer.register.subheadings.two')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  {t('Volunteer.register.paragraphs.two')}
                </Paragraph>
              </Box>
            </StyledBox>
            <StyledBox direction='row' gap='small'>
              <Chat size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'neutral-1', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Volunteer.register.subheadings.three')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  {t('Volunteer.register.paragraphs.three')}
                </Paragraph>
              </Box>
            </StyledBox>
          </Box>
          <Paragraph margin={{ top: 'medium', bottom: '0' }}>
            <Trans
              i18nKey='Volunteer.register.paragraphs.four'
              t={t}
              components={[
                <Anchor
                  key='user-accounts'
                  href='https://www.zooniverse.org/accounts/register'
                />
              ]}
            />
          </Paragraph>
          <Paragraph>
            <Trans
              i18nKey='Volunteer.register.paragraphs.five'
              t={t}
              components={[
                <Anchor
                  key='register-spanish'
                  href='https://www.zooniverse.org/accounts/register?language=es'
                />,
                <Anchor
                  key='register-french'
                  href='https://www.zooniverse.org/accounts/register?language=fr'
                />
              ]}
            />
          </Paragraph>
          <StyledRegister
            margin={{ top: '15px', bottom: 'medium' }}
            alignSelf='center'
            href='https://www.zooniverse.org/accounts/register'
            label={t('Volunteer.register.button')}
          />

          {/** Beta Testing */}
          <Heading level={3} size='1.13rem' weight='bold' color={headingColor}>
            {t('Volunteer.beta.heading')}
          </Heading>
          <Paragraph>{t('Volunteer.beta.paragraphs.one')}</Paragraph>
          <Paragraph margin='0'>
            <Trans
              i18nKey='Volunteer.beta.paragraphs.two'
              t={t}
              components={[
                <Anchor
                  key='lab-policies-page'
                  href='https://help.zooniverse.org/getting-started/lab-policies'
                />
              ]}
            />
          </Paragraph>
          <Paragraph>
            <Trans
              i18nKey='Volunteer.beta.paragraphs.three'
              t={t}
              components={[
                <Anchor
                  key='email-settings'
                  href='https://www.zooniverse.org/settings/email'
                />
              ]}
            />
          </Paragraph>
          <StyledBeta
            margin={{ top: '15px', bottom: 'medium' }}
            alignSelf='center'
            href='https://www.zooniverse.org/settings/email'
            label={t('Volunteer.beta.button')}
          />

          {/** Moderate */}
          <Heading level={3} size='1.13rem' weight='bold' color={headingColor}>
            {t('Volunteer.moderate.heading')}
          </Heading>
          <Paragraph>
            <Trans
              i18nKey='Volunteer.moderate.paragraphs.one'
              t={t}
              components={[
                <Anchor
                  key='what-are-moderators'
                  href='https://docs.google.com/document/d/1L8LwYy_uUxwX1NqE5sXi0fnrjZKG1DZu1fWLath9BOE'
                />
              ]}
            />
          </Paragraph>
          <Paragraph margin='0'>
            <Trans
              i18nKey='Volunteer.moderate.paragraphs.two'
              t={t}
              components={[<Anchor key='contact-us' href='/about#contact' />]}
            />
          </Paragraph>
        </MaxWidthContent>
      </Box>
    </GetInvolvedLayout>
  )
}

export default Volunteer
