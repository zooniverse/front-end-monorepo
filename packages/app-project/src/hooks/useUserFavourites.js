import useSWR from 'swr'
import { collections } from '@zooniverse/panoptes-js'

import { usePanoptesAuth } from '@hooks'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchUserFavourites({ authorization, query }) {
  const response = await collections.get({ authorization, query })
  return response?.body?.collections
}

export default function useUserFavourites({ user, project }) {
  const authorization = usePanoptesAuth(user?.id)
  const query = {
    favorite: true,
    project_ids: [project?.id],
    owner: user?.login
  }
  const key = authorization ? { authorization, query } : null
  const { data, error } = useSWR(key, fetchUserFavourites, SWRoptions)
  if (data) {
    const [favourites] = data
    return favourites ?? null
  }
  if (error) {
    console.error(error)
    return null
  }
  return data
}
