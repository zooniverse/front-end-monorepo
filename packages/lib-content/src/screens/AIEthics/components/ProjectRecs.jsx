import { Anchor, Box, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ol`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 20px;
`

export default function ProjectRecs() {
  const { t } = useTranslation()

  return (
    <Box>
      <StyledList>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.first'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.second'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.third'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.fourth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.fifth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.sixth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.seventh'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.eighth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.recs.nineth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
      </StyledList>
    </Box>
  )
}
