import { Markdownz } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { string } from 'prop-types'
import React from 'react'
import { Paragraph } from 'grommet'

import en from './locales/en'
import ContentBox from '../ContentBox'

counterpart.registerTranslations('en', en)

const components = {
  p: (nodeProps) => <Paragraph margin={{ top: 'none' }}>{nodeProps.children}</Paragraph>
}

function AboutProject ({ description, projectName }) {
  return (
    <ContentBox title={counterpart('AboutProject.title', { projectName })}>
      <Markdownz children={description} components={components} />
    </ContentBox>
  )
}

AboutProject.propTypes = {
  description: string,
  projectName: string,
}

AboutProject.defaultProps = {
  description: '_No projection information found._',
}

export default AboutProject
