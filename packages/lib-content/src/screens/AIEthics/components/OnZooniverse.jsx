import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function OnZooniverse() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <Heading level={3} color={{ light: 'black', dark: 'white' }} size='1.125rem'>
        {t('AIEthics.onZooniverse.firstQ.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.firstQ.list.first')}</Paragraph>
        </li>
        <li>
          <Paragraph margin={{ vertical: '10px' }}>
            {t('AIEthics.onZooniverse.firstQ.list.second')}
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>{t('AIEthics.onZooniverse.firstQ.list.third')}</Paragraph>
        </li>
      </StyledList>
    </Box>
  )
}
