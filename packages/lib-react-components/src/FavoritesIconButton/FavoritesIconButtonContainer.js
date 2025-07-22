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
    isLoading,
    mutate
  } = useUserCollections({
    query
  })

  const isFavorite = favorites?.[0]?.links?.subjects?.includes(subjectId) ?? false

  async function handleAddToFavorites() {
    try {
      const updatedFavorites = await addSubjectsToCollection({
        collectionId: favorites?.[0]?.id,
        options: {
          display_name: `Favorites ${projectSlug}`,
          favorite: true,
          private: true
        },
        projectId,
        subjectIds: [subjectId]
      })
      mutate((current) => current.map((item) => item.id === updatedFavorites.id ? updatedFavorites : item), { revalidate: false })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleRemoveFromFavorites() {
    try {
      const updatedFavorites = await removeSubjectsFromCollection({
        collectionId: favorites[0].id,
        subjectIds: [subjectId]
      })
      mutate((current) => current.map((item) => {
        if (item.id === updatedFavorites.id) {
          return {
            ...item,
            links: {
              ...item.links,
              subjects: item.links.subjects.filter((id) => id !== subjectId)
            }
          }
        }
        return item
      }), { revalidate: false })
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
  subjectId: string
}

export default FavoritesIconButtonContainer
