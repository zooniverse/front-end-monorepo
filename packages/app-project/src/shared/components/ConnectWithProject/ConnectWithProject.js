import counterpart from 'counterpart'
import { Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import ProjectLink from './components/ProjectLink'
import en from './locales/en'
import ContentBox from '../ContentBox'

counterpart.registerTranslations('en', en)

function ConnectWithProject (props) {
  const { projectName, urls } = props
  return (
    <ContentBox
      title={counterpart('ConnectWithProject.title', { projectName })}
    >
      <Grid columns={['repeat(auto-fill, minmax(280px, 1fr))']} gap='medium'>
        {urls.map(urlObject =>
          <ProjectLink
            key={urlObject.url}
            urlObject={urlObject}
          />
        )}
      </Grid>
    </ContentBox>
  )
}

ConnectWithProject.propTypes = {
  projectName: string.isRequired,
  urls: arrayOf(shape({
    url: string.isRequired
  }))
}

export default ConnectWithProject
