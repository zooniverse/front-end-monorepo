'use client'

import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from '../../translations/i18n.js'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.js'
import {
  MobileHeading,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.js'
import { Supporters, SelectedCollaborators} from './Logos.js'

function Collaborate() {
  const { t } = useTranslation()

  return (
    <GetInvolvedLayout>
      <MobileHeading level={1} size='1.5rem'>
        {t('Collaborate.title')}
      </MobileHeading>
      <Box pad={{ horizontal: 'medium', bottom: 'large' }} align='center'>
        <MaxWidthContent color={{ light: 'black', dark: 'white' }}>
          <StyledHeading
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            level={1}
            size='small'
          >
            {t('Collaborate.title')}
          </StyledHeading>
          <SpacedHeading
            level={2}
            align='center'
            size='1.5rem'
            margin={{ top: 'medium' }}
            textAlign='center'
          >
            {t('Collaborate.subheadings.one')}
          </SpacedHeading>
          <Paragraph margin={{ top: '0' }}>{t('Collaborate.paragraphs.one')}</Paragraph>
          <Paragraph margin='0'>{t('Collaborate.paragraphs.two')}</Paragraph>
          <Paragraph>
            <Trans
              i18nKey='Collaborate.paragraphs.three'
              t={t}
              components={[
                <Anchor
                  key='best-practices'
                  href='https://docs.google.com/document/d/1SJmOdGmpzYGyKpSnFt_tEe_BZIc2Bzmc3kKlWw-gX68'
                />
              ]}
            />
          </Paragraph>
          <Paragraph margin='0'>{t('Collaborate.paragraphs.four')}</Paragraph>
          <Paragraph margin={{ bottom: 'medium' }}>
            <Trans
              i18nKey='Collaborate.paragraphs.five'
              t={t}
              components={[<Anchor key='contact-us' href='/about#contact' />]}
            />
          </Paragraph>

          {/** Our Supporters */}
          <SpacedHeading
            level={3}
            size='1.5rem'
            textAlign='center'
            fill
          >
            {t('Collaborate.subheadings.two')}
          </SpacedHeading>
          <Supporters />

          {/** Selected Collaborators */}
          <SpacedHeading
            level={3}
            size='1.5rem'
            textAlign='center'
            fill
          >
            {t('Collaborate.subheadings.three')}
          </SpacedHeading>
          <SelectedCollaborators />

          <SpacedHeading
            level={3}
            size='1.5rem'
            textAlign='center'
            fill
          >
            {t('Collaborate.subheadings.four')}
          </SpacedHeading>
          <Paragraph>{t('Collaborate.paragraphs.six')}</Paragraph>
          <Paragraph margin='0'>{t('Collaborate.paragraphs.seven')}</Paragraph>
          <Paragraph margin={{ bottom: 'medium' }}>
            <Trans
              i18nKey='Collaborate.paragraphs.eight'
              t={t}
              components={[
                <Anchor key='direct-email-cliff' href='mailto:cliff@zooniverse.org' />
              ]}
            />
          </Paragraph>

          <SpacedHeading
            level={3}
            size='1.5rem'
            textAlign='center'
            fill
          >
            {t('Collaborate.subheadings.five')}
          </SpacedHeading>
          <Paragraph>
            <Trans
              i18nKey='Collaborate.paragraphs.nine'
              t={t}
              components={[<Anchor key='contact-us' href='/about#contact' />]}
            />
          </Paragraph>
        </MaxWidthContent>
      </Box>
    </GetInvolvedLayout>
  )
}

export default Collaborate
