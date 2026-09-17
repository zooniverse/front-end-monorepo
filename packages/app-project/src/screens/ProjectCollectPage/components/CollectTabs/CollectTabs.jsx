import { Box, Nav } from 'grommet'
import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'

import PanoptesAuthContext from '@shared/contexts/PanoptesAuthContext.js'
import CollectTabLink from '../CollectTabLink'

function CollectTabs({ activeTab, loginParam }) {
  const { user } = useContext(PanoptesAuthContext)
  const { store } = useContext(MobXProviderContext)
  const router = useRouter()
  const { owner, project } = router.query
  const { t } = useTranslation('screens')
  const baseUrl = `/${owner}/${project}`
  const projectName = store?.project?.display_name || project

  return (
    <Nav aria-label={t('Collect.tabs.title')} direction='row' gap='small'>
      <CollectTabLink
        active={activeTab === 'favorites' && !loginParam}
        href={`${baseUrl}/favorites`}
        text={t('Collect.tabs.favorites')}
      />
      <CollectTabLink
        active={activeTab === 'collections' && !loginParam}
        href={`${baseUrl}/collections`}
        text={t('Collect.tabs.collections')}
      />
      {user && (
        <Box direction='row' gap='small'>
          <CollectTabLink
            active={activeTab === 'favorites' && !!loginParam}
            href={`${baseUrl}/favorites/${user.login}`}
            text={t('Collect.tabs.myFavorites', { projectName })}
          />
          <CollectTabLink
            active={activeTab === 'collections' && !!loginParam}
            href={`${baseUrl}/collections/${user.login}`}
            text={t('Collect.tabs.myCollections', { projectName })}
          />
        </Box>
      )}
    </Nav>
  )
}

export default CollectTabs