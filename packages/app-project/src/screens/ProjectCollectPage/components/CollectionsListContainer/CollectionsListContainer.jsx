import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { MobXProviderContext } from 'mobx-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { arrayOf, number, shape, string } from 'prop-types'
import { useContext, useEffect, useState } from 'react'

import {
  DEFAULT_COLLECTION_MIN_SUBJECTS,
  DEFAULT_COLLECTION_SORT,
  normalizeCollectionSort
} from '@helpers/collectionQueryParams'
import { useProjectCollections } from '@hooks'
import RequireUser from '@shared/components/RequireUser/RequireUser'

import CollectionsList from '../CollectionsList'
import CollectionsToolbar from '../CollectionsToolbar'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import Pagination from '../Pagination'

function CollectionsListContainer({
  activeTab,
  collections,
  collectionCount: initialCollectionCount,
  pageCount: initialPageCount,
  initialPage = 1,
  initialMinSubjects = DEFAULT_COLLECTION_MIN_SUBJECTS,
  initialSort = DEFAULT_COLLECTION_SORT,
  loginParam
}) {
  const { store } = useContext(MobXProviderContext)
  const { isLoggedIn } = store.user
  const isUserScoped = !!loginParam

  const [urlPage, setUrlPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      clearOnDefault: true,
      history: 'push'
    })
  )
  const [urlMinSubjects, setUrlMinSubjects] = useQueryState(
    'min_subjects',
    parseAsInteger.withOptions({
      clearOnDefault: false,
      history: 'push'
    })
  )
  const [isMinSubjectsDisabled, setIsMinSubjectsDisabled] = useState(
    urlMinSubjects !== null && urlMinSubjects < DEFAULT_COLLECTION_MIN_SUBJECTS
  )
  const [urlSort, setUrlSort] = useQueryState(
    'sort',
    parseAsString.withDefault(DEFAULT_COLLECTION_SORT).withOptions({
      clearOnDefault: true,
      history: 'push'
    })
  )
  const page = urlPage ?? initialPage
  const minSubjects = isMinSubjectsDisabled
    ? 1
    : urlMinSubjects ?? DEFAULT_COLLECTION_MIN_SUBJECTS
  const sort = normalizeCollectionSort(urlSort)

  const fallbackData = collections &&
    page === initialPage &&
    minSubjects === initialMinSubjects &&
    sort === initialSort
    ? {
        collections,
        count: initialCollectionCount ?? 0,
        pageCount: initialPageCount ?? 1
      }
    : undefined
  const {
    data,
    error
  } = useProjectCollections({
    favorite: activeTab === 'favorites',
    fallbackData,
    login: loginParam,
    minSubjects,
    page,
    projectId: store?.project?.id,
    sort
  })

  const pageCount = data ? Math.max(1, data.pageCount) : undefined
  const validPage = pageCount ? Math.min(page, pageCount) : page

  useEffect(function normalizePage() {
    if (urlPage !== validPage) setUrlPage(validPage)
  }, [setUrlPage, urlPage, validPage])

  useEffect(function normalizeMinSubjects() {
    if (urlMinSubjects === null) {
      if (!isMinSubjectsDisabled) setUrlMinSubjects(DEFAULT_COLLECTION_MIN_SUBJECTS)
    } else if (urlMinSubjects < DEFAULT_COLLECTION_MIN_SUBJECTS) {
      setIsMinSubjectsDisabled(true)
      setUrlMinSubjects(null)
    } else {
      setIsMinSubjectsDisabled(false)
    }
  }, [isMinSubjectsDisabled, setUrlMinSubjects, urlMinSubjects])

  function handleMinSubjectsChange(isEnabled) {
    setUrlPage(1)
    setIsMinSubjectsDisabled(!isEnabled)
    setUrlMinSubjects(isEnabled ? DEFAULT_COLLECTION_MIN_SUBJECTS : null)
  }

  function handleSortChange(nextSort) {
    setUrlPage(1)
    setUrlSort(normalizeCollectionSort(nextSort))
  }
  
  let placeholder
  if (isUserScoped && !isLoggedIn) placeholder = <RequireUser />
  else if (error) placeholder = <ErrorPlaceholder />
  else if (!data) placeholder = <Loader />
  else if (!data.collections.length) placeholder = <EmptyPlaceholder />

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

  const pagination = data.pageCount > 1 && (
    <Pagination
      pageCount={data.pageCount}
      page={validPage}
      setPage={setUrlPage}
    />
  )
      
  const toolbar = (
    <CollectionsToolbar
      count={data.count}
      minSubjects={minSubjects}
      onMinSubjectsChange={handleMinSubjectsChange}
      onSortChange={handleSortChange}
      page={validPage}
      sort={sort}
    />
  )

  return (
    <>
      {pagination}
      {toolbar}
      <CollectionsList collections={data.collections} />
      {pagination}
    </>
  )
}

CollectionsListContainer.propTypes = {
  activeTab: string.isRequired,
  collections: arrayOf(shape({})),
  collectionCount: number,
  pageCount: number,
  initialPage: number,
  initialMinSubjects: number,
  initialSort: string,
  loginParam: string
}

export default CollectionsListContainer
