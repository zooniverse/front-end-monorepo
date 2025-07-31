import { string } from 'prop-types'

import { useUserCollections } from '../hooks'
import {
  addSubjectsToCollection,
  createCollection,
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

  function handleAddToFavorites() {
    // first param is a func that returns the modified state data you want to show locally.
    // favorited subjects are nested like this because the generic useUserCollections hook
    // returns an array of collections [] and the first item is the user's favorites.
    mutate(
      prevData => {
        // must return a new object in this function in order for SWR to recognize data returned from
        // useSWR has changed. Modifying the original Javscript object is not enough.
        const newData = [
          {
            ...prevData[0],
            links: {
              ...prevData[0].links,
              subjects: [...prevData[0].links.subjects, subjectId]
            }
          }
        ]
        return newData
      },
      {
        revalidate: false // Don't need to revalidate useUserCollections every time this button is clicked
      }
    )

    try {
      if (favorites?.[0]?.id) {
        addSubjectsToCollection({
          collectionId: favorites[0].id,
          subjectIds: [subjectId]
        })
      } else {
        createCollection({
          options: {
            display_name: `Favorites ${projectSlug}`,
            favorite: true,
            private: true
          },
          projectId,
          subjectIds: [subjectId]
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  function handleRemoveFromFavorites() {
    // first param is a func that returns the modified state data you want to show locally.
    // favorited subjects are nested like this because the generic useUserCollections hook
    // returns an array of collections [] and the first item is the user's favorites
    mutate(
      prevData => {
        const indexToRemove = prevData[0].links.subjects.indexOf(subjectId)
        const newSubjects = prevData[0].links.subjects.slice()
        if (indexToRemove > -1) {
          newSubjects.splice(indexToRemove, 1)
        }

        // must return a new object in this function in order for SWR to recognize data returned from
        // useSWR has changed. Modifying the original Javscript object is not enough.
        const newData = [
          {
            ...prevData[0],
            links: {
              ...prevData[0].links,
              subjects: newSubjects
            }
          }
        ]
        return newData
      },
      {
        revalidate: false // Don't need to revalidate useUserCollections every time this button is clicked
      }
    )

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
