import { Box, Heading } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  font-size: 32px;
  letter-spacing: 1.6px;
  line-height: normal;
  text-align: center;

  @media (width <= 64rem) {
    font-size: 24px;
    letter-spacing: 1.2px;
  }

  @media (width <= 48rem) {
    font-size: 18px;
    letter-spacing: 0.9px;
  }
`

// Styled container with gradient break as pseudo-element
const HeadingContainer = styled(Box)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      #a6a7a9 50%,
      transparent 100%
    );
  }
`

function RecentsHeading() {
  const { t } = useTranslation('screens')

  return (
    <Box align='center' pad={{ bottom: 'medium' }}>
      <HeadingContainer
        align='center'
        pad={{ bottom: 'medium' }}
        width='90%'
      >
        <StyledHeading
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          level={1}
          margin='none'
        >
          {t('ProjectRecents.title')}
        </StyledHeading>
      </HeadingContainer>
    </Box>
  )
}

export default RecentsHeading
