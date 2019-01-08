import counterpart from 'counterpart'
import { Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'

import ProjectLink from './components/ProjectLink'
import en from './locales/en'
import ClassifyBox from '../ClassifyBox'

counterpart.registerTranslations('en', en)

export default function ConnectWithProject ({ projectName, urls }) {
  return (
    <ClassifyBox
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
    </ClassifyBox>
  )
}

ConnectWithProject.propTypes = {
  projectName: string.isRequired,
  urls: arrayOf(shape({
    url: string.isRequired
  }))
}
