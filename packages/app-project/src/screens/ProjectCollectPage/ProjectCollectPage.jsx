import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

import CollectHeading from './components/CollectHeading'
import CollectTabs from './components/CollectTabs'
import CollectionsListContainer from './components/CollectionsListContainer'

function ProjectCollectPage({
  activeTab,
  collections,
  loginParam,
  projectDisplayName,
  projectSlug
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
            activeTab={activeTab}
            loginParam={loginParam}
            projectSlug={projectSlug}
            projectDisplayName={projectDisplayName}
          />
          <CollectionsListContainer
            activeTab={activeTab}
            collections={collections}
            loginParam={loginParam}
          />
        </Box>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

ProjectCollectPage.propTypes = {
  activeTab: string.isRequired,
  collections: arrayOf(shape({})),
  loginParam: string,
  projectDisplayName: string.isRequired,
  projectSlug: string.isRequired
}

export default ProjectCollectPage
