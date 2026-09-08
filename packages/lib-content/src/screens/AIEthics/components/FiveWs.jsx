import { Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 20px;
`

export default function FiveWs() {
  const { t } = useTranslation()

  return (
    <Box>
      <Paragraph margin={{ top: 'none' }}>{t('AIEthics.fivews.paragraph')}</Paragraph>
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
