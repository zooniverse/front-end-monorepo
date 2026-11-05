import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import { SUBJECTS_PAGE_SIZE } from '@helpers/collectionQueryParams'
import usePanoptesAuthToken from '@hooks/usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  keepPreviousData: true
}

async function fetchCollectionSubjects({ collectionId, page, pageSize, token }) {
  const authorization = token ? `Bearer ${token}` : undefined

  const response = await panoptes.get(
    '/subjects',
    { collection_id: collectionId, page, page_size: pageSize },
    { authorization }
  )
  const meta = response?.body?.meta?.subjects
  return {
    subjects: response?.body?.subjects ?? [],
    count: meta?.count ?? 0,
    pageCount: meta?.page_count ?? 1
  }
}

export default function useCollectionSubjects({
  collectionId,
  page = 1,
  pageSize = SUBJECTS_PAGE_SIZE
}) {
  const token = usePanoptesAuthToken()

  const key = collectionId ? { collectionId, page, pageSize } : null
  return useSWR(
    key,
    ({ collectionId, page, pageSize }) => fetchCollectionSubjects({ collectionId, page, pageSize, token }),
    SWROptions
  )
}
