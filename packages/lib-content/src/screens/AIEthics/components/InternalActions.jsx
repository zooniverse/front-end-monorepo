import { Anchor, Box, Paragraph } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ol`
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function InternalActions() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <StyledList>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.actions.first'} t={t} components={[<strong />, <Anchor href='' key='link-to-blog-post'/>]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.actions.second'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.actions.third'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            <Trans i18nKey={'AIEthics.actions.fourth'} t={t} components={[<strong />]} />
          </Paragraph>
        </li>
      </StyledList>
    </Box>
  )
}
