import { Box, Heading } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  margin: 0;
  text-align: center;
`

// Styled container with gradient break as pseudo-element
const HeadingContainer = styled(Box)`
  margin: 30px 0;

  &::after {
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    margin-top: 30px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #a6a7a9 50%,
      transparent 100%
    );
  }

  @media (min-width: 90rem) {
    margin: 60px 0;

    &::after {
      margin-top: 60px;
    }
  }
`

function RecentsHeading() {
  const { t } = useTranslation('screens')

  return (
    <Box align='center'>
      <HeadingContainer
        align='center'
        width='90%'
      >
        <StyledHeading
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          level={2}
          size='2rem'
        >
          {t('ProjectRecents.title')}
        </StyledHeading>
      </HeadingContainer>
    </Box>
  )
}

export default RecentsHeading
