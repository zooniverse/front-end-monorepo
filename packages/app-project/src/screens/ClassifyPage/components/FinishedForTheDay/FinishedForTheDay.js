import counterpart from 'counterpart'
import { Box, Button, Grid, Heading, Paragraph, Text } from 'grommet'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { withResponsiveContext } from '@zooniverse/react-components'

import en from './locales/en'
import ProjectImage from './components/ProjectImage'
// import RelatedProjects from './components/RelatedProjects'
import ContentBox from '../../../../shared/components/ContentBox'

counterpart.registerTranslations('en', en)

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

// TODO: Add `<RelatedProjects />` back in once API is up
function FinishedForTheDay (props) {
  const {
    imageSrc,
    isLoggedIn,
    projectName,
    screenSize,
    slug,
    theme: { dark }
  } = props

  const columns = (imageSrc && screenSize !== 'small') ? ['1/4', 'auto'] : ['auto']

  return (
    <Box elevation={dark ? 'xlarge' : 'none'}>
      <Grid columns={columns}>
        {imageSrc && <ProjectImage imageSrc={imageSrc} projectName={projectName} />}
        <ContentBox elevation='none'>
          <Heading
            level='2'
            margin={{ bottom: 'small', top: 'none' }}
            size='medium'
          >
            {counterpart('FinishedForTheDay.title')}
          </Heading>

          <Paragraph
            margin={{ bottom: 'small', top: 'none' }}
          >
            {counterpart('FinishedForTheDay.text', { projectName })}
          </Paragraph>

          <StyledBox direction='row' wrap>
            <Link href={`/projects/${slug}/stats`} passHref>
              <StyledButton
                color='brand'
                label={(
                  <Text size='medium'>
                    {counterpart('FinishedForTheDay.buttons.stats')}
                  </Text>
                )}
                primary
              />
            </Link>
          </StyledBox>

        </ContentBox>
      </Grid>
    </Box>
  )
}

FinishedForTheDay.propTypes = {
  imageSrc: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  projectName: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

FinishedForTheDay.defaultProps = {
  imageSrc: '',
  isLoggedIn: false,
  theme: {
    dark: false
  }
}

export default withTheme(withResponsiveContext(FinishedForTheDay))
export { FinishedForTheDay }
