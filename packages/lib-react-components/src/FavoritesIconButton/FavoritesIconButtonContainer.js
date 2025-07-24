import { string } from 'prop-types'

import { useUserCollections } from '../hooks'
import { addSubjectsToCollection, removeSubjectsFromCollection } from '../helpers/collections'

import FavoritesIconButton from './FavoritesIconButton'

function FavoritesIconButtonContainer({
  login,
  projectId,
  projectSlug,
  subjectId,
  ...props
}) {
  const query = {
    favorite: true,
    project_ids: [projectId],
    owner: login
  }

  const {
    data: favorites,
    error,
    isLoading
  } = useUserCollections({
    query
  })

  const isFavorite = favorites?.[0]?.links?.subjects?.includes(subjectId) ?? false

  function handleAddToFavorites() {
    try {
      addSubjectsToCollection({
        collectionId: favorites?.[0]?.id,
        options: {
          display_name: `Favorites ${projectSlug}`,
          favorite: true,
          private: true
        },
        projectId,
        subjectIds: [subjectId]
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleRemoveFromFavorites() {
    try {
      removeSubjectsFromCollection({
        collectionId: favorites[0].id,
        subjectIds: [subjectId]
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleClick() {
    if (isFavorite) {
      handleRemoveFromFavorites()
    } else {
      handleAddToFavorites()
    } 
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
  login: string,
  projectId: string,
  projectSlug: string,
  subjectId: string.isRequired
}

export default FavoritesIconButtonContainer
