import { Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function FiveWs() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <Paragraph>{t('AIEthics.fivews.paragraph')}</Paragraph>
      <StyledList>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.fivews.list.first'} t={t} components={[<strong />]} />
          </Text>
        </li>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.fivews.list.second'} t={t} components={[<strong />]} />
          </Text>
        </li>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.fivews.list.third'} t={t} components={[<strong />]} />
          </Text>
        </li>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.fivews.list.fourth'} t={t} components={[<strong />]} />
          </Text>
        </li>
      </StyledList>
    </Box>
  )
}
