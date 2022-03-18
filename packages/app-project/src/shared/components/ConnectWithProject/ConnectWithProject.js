import { Grid } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ProjectLink from './components/ProjectLink'
import ContentBox from '../ContentBox'

function ConnectWithProject (props) {
  const { t } = useTranslation('components')
  const { projectName, urls } = props
  return (
    <ContentBox
      title={t('ConnectWithProject.title', { projectName })}
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
