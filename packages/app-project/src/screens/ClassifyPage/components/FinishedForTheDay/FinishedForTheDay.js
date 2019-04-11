import counterpart from 'counterpart'
import { Box, Button, Grid, Heading, Paragraph, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import ProjectImage from './components/ProjectImage'
import ContentBox from '../../../../shared/components/ContentBox'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  border-width: 1px;
  flex: 1 1 300px;
  margin: 0 10px 10px 0;
`

const StyledBox = styled(Box)`
  margin: 0 -10px 0 0;
  max-width: 620px;
`

function FinishedForTheDay ({ imageSrc, projectName }) {
  const columns = (imageSrc) ? ['1/4', 'auto'] : ['auto']

  return (
    <Grid columns={columns}>
      {imageSrc && <ProjectImage imageSrc={imageSrc} projectName={projectName} />}
      <ContentBox>
        <Heading
          level='3'
          margin={{ bottom: 'small', top: 'none' }}
        >
          {counterpart('FinishedForTheDay.title')}
        </Heading>
        <Paragraph
          margin={{ bottom: 'small', top: 'none' }}
        >
          {counterpart('FinishedForTheDay.text', { projectName })}
        </Paragraph>
        <StyledBox direction='row' wrap>
          <StyledButton
            label={(
              <Text size='small'>
                {counterpart('FinishedForTheDay.buttons.stats')}
              </Text>
            )}
            onClick={() => console.info('click')}
            primary
          />
          <StyledButton
            onClick={() => console.info('click')}
            label={(
              <Text size='small'>
                {counterpart('FinishedForTheDay.buttons.anotherProject')}
              </Text>
            )}
          />
        </StyledBox>
      </ContentBox>
    </Grid>
  )
}

FinishedForTheDay.propTypes = {
  imageSrc: PropTypes.string,
  projectName: PropTypes.string.isRequired
}

FinishedForTheDay.defaultProps = {
  imageSrc: ''
}

export default FinishedForTheDay
