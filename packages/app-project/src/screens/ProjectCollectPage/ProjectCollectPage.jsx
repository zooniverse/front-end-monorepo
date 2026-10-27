import { Box } from 'grommet'
import { string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

import CollectHeading from './components/CollectHeading'
import CollectTabs from './components/CollectTabs'
import CollectionsListContainer from './components/CollectionsListContainer'

function ProjectCollectPage({
  loginParam,
  projectDisplayName
}) {
  return (
    <StandardLayout>
      <ProjectAboutPageLayout>
        <Box
          margin={{ bottom: 'large' }}
          pad={{ horizontal: '20px' }}
          width={{ width: '100%', max: '85rem' }}
        >
          <CollectHeading />
          <CollectTabs
            projectDisplayName={projectDisplayName}
          />
          <CollectionsListContainer
            loginParam={loginParam}
          />
        </Box>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

ProjectCollectPage.propTypes = {
  loginParam: string,
  projectDisplayName: string.isRequired
}

export default ProjectCollectPage
