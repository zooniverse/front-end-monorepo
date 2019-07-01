import counterpart from 'counterpart'
import { Paragraph } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import en from './locales/en'
import ContentBox from '../ContentBox'
import styled from 'styled-components'

counterpart.registerTranslations('en', en)

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`

function AboutProject ({ projectName, description }) {
  return (
    <ContentBox title={counterpart('AboutProject.title', { projectName })}>
      <StyledParagraph margin={{ bottom: 'none', top: 'none' }} size='small'>
        {description}
      </StyledParagraph>
    </ContentBox>
  )
}

AboutProject.propTypes = {
  projectName: string,
  description: string
}

export default AboutProject
