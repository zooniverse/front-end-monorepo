import { string } from 'prop-types'
import useSWRMutation from 'swr/mutation'

import {
  usePanoptesAuthToken,
  useUserCollections
} from '../hooks'
import {
  addSubjectsToCollection,
  removeSubjectsFromCollection
} from '../helpers/collections'
import FavoritesIconButton from './FavoritesIconButton'

function FavoritesIconButtonContainer({
  login,
  projectId,
  projectSlug,
  subjectId,
  ...props
}) {
  const token = usePanoptesAuthToken()

  const query = {
    favorite: true,
    project_ids: [projectId],
    owner: login
  }

  const { trigger: addToFavorites } = useSWRMutation({ query, token }, addSubjectsToCollection)
  const { trigger: removeFromFavorites } = useSWRMutation({ query, token }, removeSubjectsFromCollection)

  const {
    data: favorites,
    error,
    isLoading
  } = useUserCollections({
    query
  })

  // Currently, this code checks if a subject is a favorite by checking if the subject ID is included in the favorites collection linked subjects.
  // However, subjects from /recents or the subject queue in the classifier include a 'favorite' boolean property.
  // Before using FavoritesIconButton with /recents or in the classifier, consider refactoring to avoid unnecessary requests for the favorites collection to determine if a subject is a favorite.
  // Related refactoring will also require refactoring the add to favorites functionality to determine if a favorites collection exists then adding to or creating a favorites collection.
  const isFavorite = favorites?.[0]?.links?.subjects?.includes(subjectId) ?? false

  function handleAddToFavorites() {
    addToFavorites({
      collectionId: favorites?.[0]?.id,
      options: {
        display_name: `Favorites ${projectSlug}`,
        favorite: true,
        private: true
      },
      subjectIds: [subjectId]
    }, {
      optimisticData: (prevFavorites) => {
        if (!prevFavorites) return prevFavorites
        const updatedSubjects = [
          ...prevFavorites[0]?.links?.subjects || [],
          subjectId
        ]
        const updatedFavorite = {
          ...prevFavorites[0],
          links: {
            ...prevFavorites[0]?.links,
            subjects: updatedSubjects
          }
        }
        return [updatedFavorite]
      },
      rollbackOnError: true,
      revalidate: true,
      populateCache: true
    })
  }

  function handleRemoveFromFavorites() {
    removeFromFavorites({
      collectionId: favorites[0].id,
      subjectIds: [subjectId]
    }, {
      optimisticData: (prevFavorites) => {
        if (!prevFavorites) return prevFavorites
        const updatedSubjects = prevFavorites[0].links.subjects.filter(subjectId => subjectId !== subjectId)
        const updatedFavorite = {
          ...prevFavorites[0],
          links: {
            ...prevFavorites[0].links,
            subjects: updatedSubjects
          }
        }
        return [updatedFavorite]
      },
      rollbackOnError: true,
      revalidate: true,
      populateCache: true
    })
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
  subjectId: string
}

export default FavoritesIconButtonContainer
