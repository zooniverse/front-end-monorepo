import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ol`
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function KeyPrinciples() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <StyledList>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.principles.first'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.principles.second'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.principles.third'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.principles.fourth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.principles.fifth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
      </StyledList>
    </Box>
  )
}
