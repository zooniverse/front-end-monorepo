import { SpacedHeading } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

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
        <SpacedHeading
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          level={1}
          margin='none'
          size='2rem'
        >
          {t('ProjectRecents.title')}
        </SpacedHeading>
      </HeadingContainer>
    </Box>
  )
}

export default RecentsHeading
