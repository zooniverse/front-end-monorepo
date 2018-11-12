import counterpart from 'counterpart'
import { Box, Button, Grid, Heading, Paragraph, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import en from './locales/en'
import ProjectImage from './components/ProjectImage'
import ClassifyBox from '../ClassifyBox'

counterpart.registerTranslations('en', en)

const StyledButton = styled(Button)`
  border-width: 1px;
  min-width: 300px;
`

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`

function FinishedForTheDay ({ imageSrc, projectName }) {
  const columns = (imageSrc) ? ['1/4', 'auto'] : ['auto']

  return (
    <Grid columns={columns}>
      {imageSrc && <ProjectImage imageSrc={imageSrc} projectName={projectName} />}
      <ClassifyBox>
        <Heading level='3' margin='none' color='#5C5C5C'>
          {counterpart('FinishedForTheDay.title')}
        </Heading>
        <StyledParagraph margin={{ vertical: 'small' }} size='small'>
          {counterpart('FinishedForTheDay.text', { projectName })}
        </StyledParagraph>
        <Box gap='small' direction='row-responsive'>
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
        </Box>
      </ClassifyBox>
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
