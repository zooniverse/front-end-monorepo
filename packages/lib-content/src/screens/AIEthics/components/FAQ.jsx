import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function Resources() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <Paragraph margin='none'>
        <Trans
          i18nKey='AIEthics.faq.paragraph'
          t={t}
          components={[<Anchor href='mailto:contact@zooniverse.org' key='mail-us-one' />]}
        />
      </Paragraph>
      <StyledList>
        <li>
          <Paragraph margin={{ bottom: 'none' }}>{t('AIEthics.faq.first.question')}</Paragraph>
          <StyledList>
            <li>
              <Paragraph margin='none'>{t('AIEthics.faq.first.answer')}</Paragraph>
            </li>
          </StyledList>
        </li>
        <li>
          <Paragraph margin={{ bottom: 'none' }}>{t('AIEthics.faq.second.question')}</Paragraph>
          <StyledList>
            <li>
              <Paragraph margin='none'>{t('AIEthics.faq.second.answerOne')}</Paragraph>
            </li>
            <li>
              <Paragraph margin='none'>
                <Trans
                  i18nKey='AIEthics.faq.second.answerTwo'
                  t={t}
                  components={[<Anchor href='mailto:contact@zooniverse.org' key='mail-us-two' />]}
                />
              </Paragraph>
            </li>
          </StyledList>
        </li>
      </StyledList>
    </Box>
  )
}
