import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { MobXProviderContext } from 'mobx-react'
import { string } from 'prop-types'
import { useContext } from 'react'
import { usePathname } from 'next/navigation'

import { useProjectCollections } from '@hooks'
import RequireUser from '@shared/components/RequireUser/RequireUser'
import PanoptesAuthContext from '@shared/contexts/PanoptesAuthContext.js'

import CollectionsList from '../CollectionsList'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'

function CollectionsListContainer({ loginParam }) {
  const pathname = usePathname()
  const favorite = pathname?.split('/').includes('favorites') ?? false
  const { store } = useContext(MobXProviderContext)
  const { isLoading: isUserLoading, user } = useContext(PanoptesAuthContext)
  const isUserScoped = !!loginParam
  const {
    data,
    error,
    isLoading
  } = useProjectCollections({
    favorite,
    login: loginParam,
    projectId: store?.project?.id
  })
  const loading = isUserLoading || isLoading

  let placeholder
  if (isUserScoped && !isUserLoading && !user?.id) placeholder = <RequireUser />
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
  loginParam: string
}

export default CollectionsListContainer
