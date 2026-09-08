import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 20px;
`

const ItalicUnderlined = styled.span`
  text-decoration: underline;
  font-style: italic;
`

export default function OnZooniverse() {
  const { t } = useTranslation()

  return (
    <Box>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ bottom: '1em', top: 'none' }}
      >
        {t('AIEthics.onZooniverse.firstQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>
            <Trans
              i18nKey={'AIEthics.onZooniverse.firstQ.list.first'}
              t={t}
              components={[
                <Anchor
                  href='https://www.nasa.gov/what-is-artificial-intelligence'
                  key='nasa-article-what-is-ai'
                />
              ]}
            />
          </Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.firstQ.list.second')}</Paragraph>
        </li>
        <li>
          <Paragraph margin={{ top: 'none' }}>
            {t('AIEthics.onZooniverse.firstQ.list.third')}
          </Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ vertical: '1em' }}
      >
        {t('AIEthics.onZooniverse.secondQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.secondQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.secondQ.list.second')}</Paragraph>
        </li>
        <li>
          <Paragraph margin={{ bottom: '1em' }}>
            {t('AIEthics.onZooniverse.secondQ.list.third')}
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            {t('AIEthics.onZooniverse.secondQ.list.fourth.sublist')}
          </Paragraph>
          <StyledList>
            <li>
              <Paragraph margin='none'>
                <Trans
                  i18nKey='AIEthics.onZooniverse.secondQ.list.fourth.subFirst'
                  t={t}
                  components={[<ItalicUnderlined />]}
                />
              </Paragraph>
            </li>
            <li>
              <Paragraph margin='none'>
                <Trans
                  i18nKey='AIEthics.onZooniverse.secondQ.list.fourth.subSecond'
                  t={t}
                  components={[<ItalicUnderlined />]}
                />
              </Paragraph>
            </li>
            <li>
              <Paragraph margin='none'>
                <Trans
                  i18nKey='AIEthics.onZooniverse.secondQ.list.fourth.subThird'
                  t={t}
                  components={[<ItalicUnderlined />]}
                />
              </Paragraph>
            </li>
            <li>
              <Paragraph margin='none'>
                <Trans
                  i18nKey='AIEthics.onZooniverse.secondQ.list.fourth.subFourth'
                  t={t}
                  components={[<ItalicUnderlined />]}
                />
              </Paragraph>
            </li>
            <li>
              <Paragraph margin='none'>
                <Trans
                  i18nKey='AIEthics.onZooniverse.secondQ.list.fourth.subFifth'
                  t={t}
                  components={[<ItalicUnderlined />]}
                />
              </Paragraph>
            </li>
          </StyledList>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.secondQ.list.fifth')}</Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ vertical: '1em' }}
      >
        {t('AIEthics.onZooniverse.thirdQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.thirdQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.thirdQ.list.second')}</Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.thirdQ.list.third')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.thirdQ.list.fourth')}</Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ vertical: '1em' }}
      >
        {t('AIEthics.onZooniverse.fourthQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.fourthQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans
              i18nKey='AIEthics.onZooniverse.fourthQ.list.second'
              t={t}
              components={[<Anchor href='/publications' key='zooniverse-publications-page' />]}
            />
          </Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ vertical: '1em' }}
      >
        {t('AIEthics.onZooniverse.fifthQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.fifthQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.fifthQ.list.second')}</Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.fifthQ.list.third')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.fifthQ.list.fourth')}</Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ vertical: '1em' }}
      >
        {t('AIEthics.onZooniverse.sixthQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.sixthQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans
              i18nKey='AIEthics.onZooniverse.sixthQ.list.second'
              t={t}
              components={[<Anchor href='' key='need-zooniverse-blog-post' />]}
            />
          </Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1.125rem'
        margin={{ vertical: '1em' }}
      >
        {t('AIEthics.onZooniverse.seventhQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.seventhQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans
              i18nKey='AIEthics.onZooniverse.seventhQ.list.second'
              t={t}
              components={[
                <Anchor
                  href='https://help.zooniverse.org/getting-started/lab-policies/#zooniverse-policies'
                  key='link-to-project-builder-policies'
                />
              ]}
            />
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.seventhQ.list.third')}</Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans
              i18nKey='AIEthics.onZooniverse.seventhQ.list.fourth'
              t={t}
              components={[
                <Anchor
                  href='https://creativecommons.org/cc-licenses'
                  key='link-to-creative-commons'
                />
              ]}
            />
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.seventhQ.list.fifth')}</Paragraph>
        </li>
        <li>
          <Paragraph>{t('AIEthics.onZooniverse.seventhQ.list.sixth')}</Paragraph>
        </li>
      </StyledList>
    </Box>
  )
}
