import { Box, Nav } from 'grommet'
import { string } from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import { useTranslation } from 'next-i18next/pages'
import { useContext } from 'react'

import CollectTabLink from '../CollectTabLink'

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { isLoggedIn, login } = store.user
  return { isLoggedIn, login }
}

function CollectTabs({
  activeTab,
  loginParam,
  projectDisplayName,
  projectSlug
}) {
  const { t } = useTranslation('screens')
  const { isLoggedIn, login } = useStores()

  return (
    <Nav aria-label={t('Collect.tabs.title')} direction='row' gap='small'>
      <CollectTabLink
        active={activeTab === 'favorites' && !loginParam}
        href={`/${projectSlug}/favorites`}
        text={t('Collect.tabs.favorites')}
      />
      <CollectTabLink
        active={activeTab === 'collections' && !loginParam}
        href={`/${projectSlug}/collections`}
        text={t('Collect.tabs.collections')}
      />
      {isLoggedIn && (
        <Box direction='row' gap='small'>
          <CollectTabLink
            active={activeTab === 'favorites' && !!loginParam}
            href={`/${projectSlug}/favorites/${login}`}
            text={t('Collect.tabs.myFavorites', { projectName: projectDisplayName })}
          />
          <CollectTabLink
            active={activeTab === 'collections' && !!loginParam}
            href={`/${projectSlug}/collections/${login}`}
            text={t('Collect.tabs.myCollections', { projectName: projectDisplayName })}
          />
        </Box>
      )}
    </Nav>
  )
}

CollectTabs.propTypes = {
  activeTab: string.isRequired,
  loginParam: string,
  projectDisplayName: string.isRequired,
  projectSlug: string.isRequired
}

export default observer(CollectTabs)
export { CollectTabs }
