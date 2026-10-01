import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { MobXProviderContext } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import { useContext } from 'react'

import { useProjectCollections } from '@hooks'
import RequireUser from '@shared/components/RequireUser/RequireUser'

import CollectionsList from '../CollectionsList'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'

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

  let placeholder
  if (isUserScoped && !isLoggedIn) placeholder = <RequireUser />
  else if (error) placeholder = <ErrorPlaceholder />
  else if (loading || !data) placeholder = <Loader />
  else if (!data.length) placeholder = <EmptyPlaceholder />

  if (placeholder) {
    return (
      <Box
        align='center' 
        justify='center' 
        height={{ min: '50vh' }} 
        pad='large'
      >
        {placeholder}
      </Box>
    )
  }

  return <CollectionsList collections={data} />
}

CollectionsListContainer.propTypes = {
  activeTab: string.isRequired,
  collections: arrayOf(shape({})),
  loginParam: string
}

export default CollectionsListContainer
