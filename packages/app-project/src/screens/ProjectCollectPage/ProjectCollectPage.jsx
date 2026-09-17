import { Anchor, Box, Heading } from 'grommet'
import { useTranslation } from 'next-i18next/pages'
import { arrayOf, shape, string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'
import CollectTabs from './components/CollectTabs'
import CollectionsListContainer from './components/CollectionsListContainer'

function ProjectCollectPage({ activeTab, collections, loginParam }) {
  const { t } = useTranslation('screens')

  return (
    <StandardLayout>
      <Box align='center' pad={{ horizontal: 'medium', vertical: 'large' }}>
        <Box gap='medium' width={{ width: '100%', max: '85rem' }}>
          <Heading level={2} margin='none'>
            {t('Collect.heading')}
          </Heading>
          <Anchor href='https://www.zooniverse.org/collections'>
            {t('Collect.exploreLink')}
          </Anchor>
          <CollectTabs activeTab={activeTab} loginParam={loginParam} />
          <CollectionsListContainer
            activeTab={activeTab}
            collections={collections}
            loginParam={loginParam}
          />
        </Box>
      </Box>
    </StandardLayout>
  )
}

ProjectCollectPage.propTypes = {
  activeTab: string.isRequired,
  collections: arrayOf(shape({})),
  loginParam: string
}

export default ProjectCollectPage
