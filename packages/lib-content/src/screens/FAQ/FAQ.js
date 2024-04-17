'use client'

import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from '../../translations/i18n.js'
import styled from 'styled-components'

import PageLayout from '../../components/PageLayout/layout.js'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.js'
import {
  MobileHeading,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.js'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  list-style-type: none;
`

const Question = ({ children }) => (
  <Text size='1.13rem' weight='bold' color={{ light: 'black', dark: 'white' }}>
    {children}
  </Text>
)

const Answer = ({ children }) => (
  <Paragraph margin={{ vertical: 'small' }}>{children}</Paragraph>
)

function FAQPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('FAQ.title')}
        </MobileHeading>
        <Box pad={{ horizontal: 'medium' }} align='center'>
          <MaxWidthContent>
            <StyledHeading color={{ light: 'neutral-1', dark: 'accent-1' }} level='1' size='small'>
              {t('FAQ.title')}
            </StyledHeading>
            <Paragraph margin={{ vertical: 'medium' }}>
              <Trans
                i18nKey='FAQ.help'
                t={t}
                components={[
                  <Anchor
                    key='freshdesk-solutions'
                    href='https://zooniverse.freshdesk.com/support/solutions'
                  />,
                  <Anchor
                    key='talk-page'
                    href='https://www.zooniverse.org/talk'
                  />,
                  <Anchor
                    key='contact-us'
                    href='https://www.zooniverse.org/about#contact'
                  />
                ]}
              />
            </Paragraph>
            <StyledList>
              <Box as='li'>
                <Question>{t('FAQ.item0.question')}</Question>
                <Answer>{t('FAQ.item0.answer')}</Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item1.question')}</Question>
                <Answer>{t('FAQ.item1.answer')}</Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item2.question')}</Question>
                <Answer>
                  <Trans
                    i18nKey='FAQ.item2.answer'
                    t={t}
                    components={[
                      <Anchor
                        key='privacy-page'
                        href='https://www.zooniverse.org/privacy'
                      />
                    ]}
                  />
                </Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item3.question')}</Question>
                <Answer>
                  <Trans
                    i18nKey='FAQ.item3.answer'
                    t={t}
                    components={[
                      <Anchor
                        key='privacy-page'
                        href='https://www.zooniverse.org/privacy'
                      />,
                      <Anchor
                        key='security-page'
                        href='https://www.zooniverse.org/security'
                      />
                    ]}
                  />
                </Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item4.question')}</Question>
                <Answer>
                  <Trans
                    i18nKey='FAQ.item4.answer'
                    t={t}
                    components={[
                      <Anchor
                        key='talk-page'
                        href='https://www.zooniverse.org/talk'
                      />,
                      <Anchor
                        key='FEM-github-issues'
                        href='https://github.com/zooniverse/front-end-monorepo/issues'
                      />
                    ]}
                  />
                </Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item5.question')}</Question>
                <Answer>
                  <Trans
                    i18nKey='FAQ.item5.answer'
                    t={t}
                    components={[
                      <Anchor
                        key='zooniverse-home-page'
                        href='http://jobs.zooniverse.org'
                      />
                    ]}
                  />
                </Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item6.question')}</Question>
                <Answer>{t('FAQ.item6.answer0')}</Answer>
                <Paragraph margin='0'>{t('FAQ.item6.answer1')}</Paragraph>
                <Answer>
                  <Trans
                    i18nKey='FAQ.item6.answer2'
                    t={t}
                    components={[
                      <Anchor
                        key='donate-link'
                        href='https://www.zooniverse.org/about/donate' // Will link to a get-involved section once those pages are built
                      />
                    ]}
                  />
                </Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item7.question')}</Question>
                <Answer>
                  <Trans
                    i18nKey='FAQ.item7.answer'
                    t={t}
                    components={[
                      <Anchor
                        key='resources-page'
                        href='https://www.zooniverse.org/about/resources'
                      />
                    ]}
                  />
                </Answer>
              </Box>
              <Box as='li'>
                <Question>{t('FAQ.item8.question')}</Question>
                <Paragraph margin={{ top: 'small', bottom: 'medium' }}>
                  {t('FAQ.item8.answer')}
                </Paragraph>
              </Box>
            </StyledList>
          </MaxWidthContent>
        </Box>
      </PageLayout>
    </>
  )
}

export default FAQPage
