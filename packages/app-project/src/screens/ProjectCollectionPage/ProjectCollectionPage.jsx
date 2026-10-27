import { Loader } from '@zooniverse/react-components'
import { Box, Paragraph } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import { useTranslation } from 'next-i18next/pages'
import { useContext } from 'react'
import { string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

import CollectionHeader from './components/CollectionHeader'
import CollectionOptions from './components/CollectionOptions'
import SubjectsListContainer from './components/SubjectsListContainer'
import UserHeader from './components/UserHeader'
import getCollectionRole from './helpers/getCollectionRole'

import { useCollection, useCollectionRoles } from '@hooks'
import PanoptesAuthContext from '@shared/contexts/PanoptesAuthContext.js'

function ProjectCollectionPage({
  collectionNameParam,
  loginParam,
  projectDisplayName
}) {
  const { t } = useTranslation('screens')
  const { store } = useContext(MobXProviderContext)
  const { user, isLoading: isUserLoading } = useContext(PanoptesAuthContext)
  
  const slug = `${loginParam}/${collectionNameParam}`
  const { project } = store
  const { id: projectId, slug: projectSlug } = project || {}
  const { id: userId, login } = user || {}

  const { data: collection, isLoading } = useCollection({ slug })
  const { data: collectionRoles } = useCollectionRoles({ collectionId: collection?.id })

  const collectionRole = getCollectionRole(collectionRoles, userId)
  const canEdit = collectionRole === 'owner' || collectionRole === 'collaborator'

  return (
    <StandardLayout>
      <CollectionOptions 
        canEdit={canEdit}
        isLoggedIn={!!userId}
      />
      <ProjectAboutPageLayout>
        <Box
          height={{ min: '300px' }}
          margin={{ bottom: 'large' }}
          pad={{ horizontal: '20px' }}
          width={{ width: '100%', max: '85rem' }}
        >
          {isLoading || isUserLoading ? (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <Loader />
            </Box>
          ) : collection ? (
            <Box gap='small'>
              <CollectionHeader
                collection={collection}
                collectionRole={collectionRole}
                projectDisplayName={projectDisplayName}
                projectSlug={projectSlug}
              />
              <UserHeader
                collection={collection}
                projectSlug={projectSlug}
              />
              {collection?.description && (
                <Paragraph margin='none'>
                  {collection.description}
                </Paragraph>
              )}
              <SubjectsListContainer
                collectionId={collection.id}
                login={login}
                projectId={projectId}
                projectSlug={projectSlug}
                userId={userId}
              />
            </Box>
          ) : (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <Paragraph>{t('Collection.notFound')}</Paragraph>
            </Box>
          )}
        </Box>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

ProjectCollectionPage.propTypes = {
  collectionNameParam: string,
  loginParam: string,
  projectDisplayName: string
}

export default observer(ProjectCollectionPage)
