import { Box, Heading, Paragraph } from 'grommet'
import { SubjectCard } from '@zooniverse/react-components'
import { MobXProviderContext, observer } from 'mobx-react'
import { useTranslation } from 'next-i18next/pages'
import { useContext } from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

import CollectionOptions from './components/CollectionOptions'

// TODO: likely move hooks to container...
import { useCollection, useCollectionRoles, useCollectionSubjects } from '@hooks'
import PanoptesAuthContext from '@shared/contexts/PanoptesAuthContext.js'

const StyledSubjectList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return {
    projectId: project?.id,
    projectSlug: project?.slug
  }
}

function ProjectCollectionPage({ collectionNameParam, loginParam }) {
  const { t } = useTranslation('screens')
  const { projectId, projectSlug } = useStores()
  // TODO: consider refactor for user loading state
  const { user } = useContext(PanoptesAuthContext)
  const { id: userId, login } = user || {}
  const slug = `${loginParam}/${collectionNameParam}`

  const { data: collection, isLoading } = useCollection({ slug })
  const { data: collectionRoles, isLoading: isLoadingCollectionRoles } = useCollectionRoles({ collectionId: collection?.id })
  const { data: subjects = [] } = useCollectionSubjects({ collectionId: collection?.id })

  const isOwner = !!userId && collection?.links?.owner?.id === userId
  const isCollaborator = !!userId && !!collectionRoles?.some(role =>
    role.links?.owner?.id === userId && role.roles?.some(r => r === 'owner' || r === 'collaborator')
  )
  const canEdit = isOwner || isCollaborator

  return (
    <StandardLayout>
      <CollectionOptions 
        canEdit={canEdit}
        isLoggedIn={!!userId}
      />
      <ProjectAboutPageLayout>
        <Box
          margin={{ bottom: 'large' }}
          pad={{ horizontal: '20px' }}
          width={{ width: '100%', max: '85rem' }}
        >
          {isLoading ? (
            <Paragraph>Loading...</Paragraph>
          ) : collection ? (
            <>
              <Heading level={2}>{collection.display_name}</Heading>
              {collectionRoles?.length > 0 && (
                <Paragraph>{collectionRoles[0].roles}</Paragraph>
              )}
              <StyledSubjectList>
                {subjects.map(subject => (
                  <li key={subject.id}>
                    <SubjectCard
                      interactive={true}
                      login={login}
                      projectId={projectId}
                      projectSlug={projectSlug}
                      subject={subject}
                      userId={userId}
                    />
                  </li>
                ))}
              </StyledSubjectList>
            </>
          ) : (
            <Paragraph>{t('Collection.notFound')}</Paragraph>
          )}
        </Box>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

ProjectCollectionPage.propTypes = {
  collectionNameParam: string,
  loginParam: string
}

export default observer(ProjectCollectionPage)
