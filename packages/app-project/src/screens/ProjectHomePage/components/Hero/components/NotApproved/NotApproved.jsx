import { useTranslation } from 'next-i18next'
import { Box, Paragraph } from 'grommet'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px 10px;

  @media (width < 769px) {
    padding-bottom: 25px; // for the negative margin of content below it
    p {
      font-size: 0.75rem;
    }
  }
`

function NotApproved() {
  const { t } = useTranslation('screens')

  return (
    <StyledBox background='neutral-1'>
      <Paragraph margin='0'>{t('Home.Hero.NotApproved.paragraph')}</Paragraph>
    </StyledBox>
  )
}

export default NotApproved
