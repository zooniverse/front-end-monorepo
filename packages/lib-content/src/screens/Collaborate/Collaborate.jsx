import { Anchor, Box, Paragraph } from 'grommet'
import { Trans, useTranslation } from '@translations/i18n.jsx'
import { SpacedHeading } from '@zooniverse/react-components'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout.jsx'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.jsx'
import {
  MobileHeading,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.jsx'
import { Supporters, SelectedCollaborators } from './Logos.jsx'

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
            {t('Collaborate.subheadings.first')}
          </SpacedHeading>
          <Paragraph margin={{ top: '0' }}>
            {t('Collaborate.paragraphs.first')}
          </Paragraph>
          <Paragraph margin='0'>{t('Collaborate.paragraphs.second')}</Paragraph>
          <Paragraph>
            <Trans
              i18nKey='Collaborate.paragraphs.third'
              t={t}
              components={[
                <Anchor key='lab' href='https://www.zooniverse.org/lab' />,
                <Anchor
                  key='best-practices'
                  href='https://docs.google.com/document/d/1SJmOdGmpzYGyKpSnFt_tEe_BZIc2Bzmc3kKlWw-gX68'
                />
              ]}
            />
          </Paragraph>
          <Paragraph margin='0'>
            <Trans
              i18nKey='Collaborate.paragraphs.fourth'
              t={t}
              components={[
                <Anchor key='lab' href='https://www.zooniverse.org/lab' />
              ]}
            />
          </Paragraph>
          <Paragraph margin={{ bottom: 'medium' }}>
            <Trans
              i18nKey='Collaborate.paragraphs.fifth'
              t={t}
              components={[<Anchor key='contact-us' href='/about#contact' />]}
            />
          </Paragraph>

          {/** Our Supporters */}
          <SpacedHeading level={3} size='1.5rem' textAlign='center' fill>
            {t('Collaborate.subheadings.second')}
          </SpacedHeading>
          <Supporters />

          {/** Selected Collaborators */}
          <SpacedHeading level={3} size='1.5rem' textAlign='center' fill>
            {t('Collaborate.subheadings.third')}
          </SpacedHeading>
          <SelectedCollaborators />

          <SpacedHeading level={3} size='1.5rem' textAlign='center' fill>
            {t('Collaborate.subheadings.fourth')}
          </SpacedHeading>
          <Paragraph>{t('Collaborate.paragraphs.sixth')}</Paragraph>
          <Paragraph margin='0'>{t('Collaborate.paragraphs.seventh')}</Paragraph>
          <Paragraph margin={{ bottom: 'medium' }}>
            <Trans
              i18nKey='Collaborate.paragraphs.eighth'
              t={t}
              components={[
                <Anchor
                  key='direct-email-cliff'
                  href='mailto:cliff@zooniverse.org'
                />
              ]}
            />
          </Paragraph>

          <SpacedHeading level={3} size='1.5rem' textAlign='center' fill>
            {t('Collaborate.subheadings.fifth')}
          </SpacedHeading>
          <Paragraph>
            <Trans
              i18nKey='Collaborate.paragraphs.nineth'
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
