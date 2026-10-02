import { Box, Nav } from 'grommet'
import { Favorite, Bookmark } from 'grommet-icons'
import { string } from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import { useTranslation } from 'next-i18next/pages'
import { useContext } from 'react'
import styled from 'styled-components'

import CollectTabLink from '../CollectTabLink'

const StyledNav = styled(Nav)`
  flex-wrap: nowrap;
  justify-content: safe center;
  overflow-x: auto;
  white-space: nowrap;

  // on a small screen width, allow the nav to align to the exact edge of the screen
  align-self: stretch;
  margin-left: -20px;
  margin-right: -20px;
  max-width: none;

  > :first-child {
    margin-left: 20px;
  }

  > :last-child {
    margin-right: 20px;
  }

  // larger than a small screen width
  @media (min-width: 48rem) {
    margin-left: 0;
    margin-right: 0;

    > :first-child {
      margin-left: 0;
    }

    > :last-child {
      margin-right: 0;
    }
  }
`

const StyledLoggedInTabs = styled(Box)`
  flex-shrink: 0;
  white-space: nowrap;
`

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
    <StyledNav
      aria-label={t('Collect.tabs.title')}
      direction='row'
      justify='center'
      margin={{ bottom: 'small' }}
      pad='2px'
    >
      <CollectTabLink
        active={activeTab === 'favorites' && !loginParam}
        href={`/${projectSlug}/favorites`}
        icon={<Favorite aria-hidden='true' size='20px' />}
        text={t('Collect.tabs.favorites')}
      />
      <CollectTabLink
        active={activeTab === 'collections' && !loginParam}
        href={`/${projectSlug}/collections`}
        icon={<Bookmark aria-hidden='true' size='16px' />}
        text={t('Collect.tabs.collections')}
      />
      {isLoggedIn && (
        <StyledLoggedInTabs direction='row' gap='medium'>
          <CollectTabLink
            active={activeTab === 'favorites' && !!loginParam}
            href={`/${projectSlug}/favorites/${login}`}
            icon={<Favorite aria-hidden='true' size='20px' />}
            text={t('Collect.tabs.myFavorites', { projectName: projectDisplayName })}
          />
          <CollectTabLink
            active={activeTab === 'collections' && !!loginParam}
            href={`/${projectSlug}/collections/${login}`}
            icon={<Bookmark aria-hidden='true' size='16px' />}
            text={t('Collect.tabs.myCollections', { projectName: projectDisplayName })}
          />
        </StyledLoggedInTabs>
      )}
    </StyledNav>
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
