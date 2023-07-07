import { Box, Button, Grid, Heading, Paragraph, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import {
  withResponsiveContext,
  Media,
  ZooniverseLogo
} from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'

const StyledButton = styled(Button)`
  border-width: 1px;
  flex: 0 1 300px;
  margin: 0 10px 10px 0;
  text-align: center;
`

const StyledBox = styled(Box)`
  margin: 0 -10px 0 0;
  max-width: 620px;
`

function FinishedForTheDay({
  imageSrc = '',
  linkHref,
  projectName,
  screenSize,
  theme: { dark = false }
}) {
  const { t } = useTranslation('screens')

  const columns = imageSrc && screenSize !== 'small' ? ['1/4', 'auto'] : ['auto']
  const alt = t('Classify.FinishedForTheDay.ProjectImage.alt', { projectName })

  return (
    <Box elevation={dark ? 'xlarge' : 'none'}>
      <Grid columns={columns}>
        <Media
          alt={alt}
          src={imageSrc}
          placeholder={
            <ZooniverseLogo id={`${alt} placeholder`} size='38%' />
          }
        />
        <ContentBox elevation='none'>
          <Heading
            level='2'
            margin={{ bottom: 'small', top: 'none' }}
            size='medium'
          >
            {t('Classify.FinishedForTheDay.title')}
          </Heading>

          <Paragraph margin={{ bottom: 'small', top: 'none' }}>
            {t('Classify.FinishedForTheDay.text', { projectName })}
          </Paragraph>

          <StyledBox direction='row' wrap>
            <StyledButton
              color='brand'
              href={linkHref}
              label={(
                <Text size='medium'>
                  {t('Classify.FinishedForTheDay.buttons.stats')}
                </Text>
              )}
              primary
            />
          </StyledBox>
        </ContentBox>
      </Grid>
    </Box>
  )
}

FinishedForTheDay.propTypes = {
  imageSrc: PropTypes.string,
  linkProps: PropTypes.string,
  projectName: PropTypes.string
}

export { FinishedForTheDay }
export default withTheme(withResponsiveContext(FinishedForTheDay))
