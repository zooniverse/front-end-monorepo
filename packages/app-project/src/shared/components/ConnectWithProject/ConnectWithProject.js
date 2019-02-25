import counterpart from 'counterpart'
import { Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import ContentBox from '../ContentBox'
import ProjectLink from './components/ProjectLink'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function ConnectWithProject ({ projectName, urls }) {
  return (
    <ContentBox
      title={counterpart('ConnectWithProject.title', { projectName })}
    >
      <Grid columns={['1fr', '1fr']} gap='small' rows={['1fr']}>
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
