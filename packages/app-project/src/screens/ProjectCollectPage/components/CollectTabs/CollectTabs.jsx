import { Box, Nav } from 'grommet'
import { Favorite, Bookmark } from 'grommet-icons'
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
    <Nav
      aria-label={t('Collect.tabs.title')}
      direction='row'
      justify='center'
      margin={{ bottom: 'small' }}
    >
      <CollectTabLink
        active={activeTab === 'favorites' && !loginParam}
        href={`/${projectSlug}/favorites`}
        icon={<Favorite size='20px' />}
        text={t('Collect.tabs.favorites')}
      />
      <CollectTabLink
        active={activeTab === 'collections' && !loginParam}
        href={`/${projectSlug}/collections`}
        icon={<Bookmark size='16px' />}
        text={t('Collect.tabs.collections')}
      />
      {isLoggedIn && (
        <Box direction='row' gap='medium'>
          <CollectTabLink
            active={activeTab === 'favorites' && !!loginParam}
            href={`/${projectSlug}/favorites/${login}`}
            icon={<Favorite size='20px' />}
            text={t('Collect.tabs.myFavorites', { projectName: projectDisplayName })}
          />
          <CollectTabLink
            active={activeTab === 'collections' && !!loginParam}
            href={`/${projectSlug}/collections/${login}`}
            icon={<Bookmark size='16px' />}
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
