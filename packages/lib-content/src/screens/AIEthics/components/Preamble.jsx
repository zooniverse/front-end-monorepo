import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function Preamble() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <Paragraph margin='0'>
        <Trans
          i18nKey={'AIEthics.preamble.paragraphs.first'}
          t={t}
          components={[<Anchor key='ai-ethics-blogpost' href='' />]}
        />
      </Paragraph>
      <Paragraph>{t('AIEthics.preamble.paragraphs.second')}</Paragraph>
      <Paragraph>{t('AIEthics.preamble.paragraphs.third')}</Paragraph>
      <StyledList>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.preamble.list.first'} t={t} components={[<strong />]} />
          </Text>
        </li>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.preamble.list.second'} t={t} components={[<strong />]} />
          </Text>
        </li>
        <li>
          <Text size='1rem' color={{ light: 'black', dark: 'white' }}>
            <Trans i18nKey={'AIEthics.preamble.list.third'} t={t} components={[<strong />]} />
          </Text>
        </li>
      </StyledList>
    </Box>
  )
}
