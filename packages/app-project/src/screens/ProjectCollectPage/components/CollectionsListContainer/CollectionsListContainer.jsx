import { useContext } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { MobXProviderContext } from 'mobx-react'

import { useProjectCollections } from '@hooks'
import CollectionsList from '../CollectionsList'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import LoadingPlaceholder from '../Placeholders/LoadingPlaceholder'
import SignInRequiredPlaceholder from '../Placeholders/SignInRequiredPlaceholder'

function CollectionsListContainer({ activeTab, collections, loginParam }) {
  const { store } = useContext(MobXProviderContext)
  const { isLoggedIn } = store.user
  const isUserScoped = !!loginParam
  const {
    data: userCollections,
    error,
    isLoading
  } = useProjectCollections({
    favorite: activeTab === 'favorites',
    login: loginParam,
    projectId: store?.project?.id
  })
  const data = isUserScoped ? userCollections : collections
  const loading = isUserScoped && isLoading

  if (isUserScoped && !isLoggedIn) return <SignInRequiredPlaceholder />
  if (error) return <ErrorPlaceholder />
  if (loading || !data) return <LoadingPlaceholder />
  if (!data.length) return <EmptyPlaceholder />

  return <CollectionsList collections={data} />
}

CollectionsListContainer.propTypes = {
  activeTab: string.isRequired,
  collections: arrayOf(shape({})),
  loginParam: string
}

export default CollectionsListContainer
