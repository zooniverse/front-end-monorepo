import { useContext, useEffect } from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { MobXProviderContext } from 'mobx-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { useProjectCollections } from '@hooks'
import CollectionsList from '../CollectionsList'
import Pagination from '../Pagination'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import LoadingPlaceholder from '../Placeholders/LoadingPlaceholder'
import SignInRequiredPlaceholder from '../Placeholders/SignInRequiredPlaceholder'

function CollectionsListContainer({
  activeTab,
  collections,
  pageCount: initialPageCount,
  initialPage = 1,
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
  const page = urlPage ?? initialPage
  const fallbackData = collections && page === initialPage
    ? { collections, pageCount: initialPageCount ?? 1 }
    : undefined
  const {
    data,
    error,
    isLoading
  } = useProjectCollections({
    favorite: activeTab === 'favorites',
    fallbackData,
    login: loginParam,
    page,
    projectId: store?.project?.id
  })

  const pageCount = data ? Math.max(1, data.pageCount) : undefined
  const validPage = pageCount ? Math.min(page, pageCount) : page

  useEffect(function normalizePage() {
    if (urlPage !== validPage) setUrlPage(validPage)
  }, [setUrlPage, urlPage, validPage])

  if (isUserScoped && !isLoggedIn) return <SignInRequiredPlaceholder />
  if (error) return <ErrorPlaceholder />
  if (isLoading || !data) return <LoadingPlaceholder />
  if (!data.collections.length) return <EmptyPlaceholder />

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
      <CollectionsList collections={data.collections} />
      {pagination}
    </>
  )
}

CollectionsListContainer.propTypes = {
  activeTab: string.isRequired,
  collections: arrayOf(shape({})),
  pageCount: number,
  initialPage: number,
  loginParam: string
}

export default CollectionsListContainer
