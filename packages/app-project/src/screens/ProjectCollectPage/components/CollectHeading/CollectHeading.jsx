import { PlainButton } from '@zooniverse/react-components'
import { Box, Grid, Heading } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import styled from 'styled-components'

const mobileBreakpoint = '76rem'

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

const StyledGrid = styled(Grid)`
  @media (width <= ${mobileBreakpoint}) {
    grid-template-columns: 1fr;
    justify-items: center;

    & > div:first-child {
      display: none;
    }

    & > div:last-child {
      justify-content: center;
    }
  }
`

const StyledHeading = styled(Heading)`
  margin: 0;
  text-align: center;
`

function CollectHeading() {
  const { t } = useTranslation('screens')

  return (
    <HeadingContainer
      alignSelf='center'
      fill='horizontal'
      width={{ max: '1210px' }}
    >
      <StyledGrid
        columns={['flex', 'auto', 'flex']}
      >
        <div></div>
        <StyledHeading
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          level={2}
          size='2rem'
        >
          {t('Collect.title')}
        </StyledHeading>
        <Box
          align='center'
          direction='row'
          justify='end'
        >
          <PlainButton
            href='https://www.zooniverse.org/collections'
            text={t('Collect.exploreLink')}
          />
        </Box>
      </StyledGrid>
    </HeadingContainer>
  )
}

export default CollectHeading
