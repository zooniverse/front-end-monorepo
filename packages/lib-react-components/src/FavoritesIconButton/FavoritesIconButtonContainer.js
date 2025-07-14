import { shape, string } from 'prop-types'
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
  project,
  subject,
  user,
  ...props
}) {
  const token = usePanoptesAuthToken()

  const query = {
    favorite: true,
    project_ids: [project?.id],
    owner: user?.login
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

  const isFavorite = favorites?.[0]?.links?.subjects?.includes(subject.id) ?? false

  function handleAddToFavorites() {
    addToFavorites({
      collectionId: favorites?.[0]?.id,
      subjectIds: [subject.id],
      projectId: project.id,
      projectSlug: project.slug
    }, {
      optimisticData: (prevFavorites) => {
        if (!prevFavorites) return prevFavorites
        const updatedSubjects = [
          ...prevFavorites[0]?.links?.subjects || [],
          subject.id
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
      subjectIds: [subject.id]
    }, {
      optimisticData: (prevFavorites) => {
        if (!prevFavorites) return prevFavorites
        const updatedSubjects = prevFavorites[0].links.subjects.filter(subjectId => subjectId !== subject.id)
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
