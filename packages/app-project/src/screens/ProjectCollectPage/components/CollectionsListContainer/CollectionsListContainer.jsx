import { useContext, useEffect, useState } from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { MobXProviderContext } from 'mobx-react'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

import {
  DEFAULT_COLLECTION_MIN_SUBJECTS,
  DEFAULT_COLLECTION_SORT,
  normalizeCollectionSort
} from '@helpers/collectionQueryParams'
import { useProjectCollections } from '@hooks'
import CollectionsList from '../CollectionsList'
import CollectionsToolbar from '../CollectionsToolbar'
import Pagination from '../Pagination'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import LoadingPlaceholder from '../Placeholders/LoadingPlaceholder'
import SignInRequiredPlaceholder from '../Placeholders/SignInRequiredPlaceholder'

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
    error,
    isLoading
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

  if (isUserScoped && !isLoggedIn) return <SignInRequiredPlaceholder />
  if (error) return <ErrorPlaceholder />
  if (isLoading || !data) return <LoadingPlaceholder />

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

  if (!data.collections.length) {
    return (
      <>
        {toolbar}
        <EmptyPlaceholder />
      </>
    )
  }

  const pagination = data.pageCount > 1 && (
    <Pagination
      pageCount={data.pageCount}
      page={validPage}
      setPage={setUrlPage}
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
