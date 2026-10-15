import { Box, Heading, Paragraph } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import { useTranslation } from 'next-i18next/pages'
import { useContext } from 'react'
import { string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

// TODO: likely move hooks to container...
import { useCollection, useCollectionRoles } from '@hooks'

function ProjectCollectionPage({ collectionNameParam, loginParam }) {
  const { t } = useTranslation('screens')
  const slug = `${loginParam}/${collectionNameParam}`

  const { data: collection, isLoading } = useCollection({ slug })
  const { data: collectionRoles, isLoading: isLoadingCollectionRoles } = useCollectionRoles({ collectionId: collection?.id })

  return (
    <StandardLayout>
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
