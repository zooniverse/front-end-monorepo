import { shape, string } from 'prop-types'

import { useUserCollections } from '../hooks'
import FavoritesIconButton from './FavoritesIconButton'

function FavoritesIconButtonContainer({
  project,
  subject,
  user,
  ...props
}) {
  const {
    data: favorites,
    error,
    isLoading
  } = useUserCollections({
    query: {
      favorite: true,
      project_ids: [project?.id],
      owner: user?.login
    }
  })

  const isFavorite = favorites?.[0]?.links?.subjects?.includes(subject.id) ?? false

  function handleClick() {
    console.log('Favorite button clicked')
  }

  return (
    <FavoritesIconButton
      checked={isFavorite}
      disabled={isLoading || !!error}
      onClick={handleClick}
      {...props}
    />
  )
}

FavoritesIconButtonContainer.propTypes = {
  project: shape({
    id: string,
    slug: string
  }),
  user: shape({
    id: string,
    login: string
  })
}

export default FavoritesIconButtonContainer
