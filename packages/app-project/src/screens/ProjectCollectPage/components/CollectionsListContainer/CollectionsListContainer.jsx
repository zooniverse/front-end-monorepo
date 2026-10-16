import Loader from '@zooniverse/react-components/Loader'
import { Box } from 'grommet'
import { MobXProviderContext } from 'mobx-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs'
import { string } from 'prop-types'
import { useContext, useEffect } from 'react'

import {
  COLLECTION_SORT_OPTIONS,
  DEFAULT_COLLECTION_MIN_SUBJECTS,
  DEFAULT_COLLECTION_SORT
} from '@helpers/collectionQueryParams'
import { useProjectCollections } from '@hooks'
import RequireUser from '@shared/components/RequireUser/RequireUser'
import PanoptesAuthContext from '@shared/contexts/PanoptesAuthContext.js'

import CollectionsList from '../CollectionsList'
import CollectionsToolbar from '../CollectionsToolbar'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import Pagination from '../Pagination'

const SORT_VALUES = COLLECTION_SORT_OPTIONS.map(option => option.value)

function CollectionsListContainer({ loginParam }) {
  const pathname = usePathname()
  const { store } = useContext(MobXProviderContext)
  const { isLoading: isUserLoading, user } = useContext(PanoptesAuthContext)
  
  const favorite = pathname?.split('/').includes('favorites') ?? false
  const projectId = store?.project?.id
  const isUserScoped = !!loginParam

  const [page, setUrlPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [minSubjects, setUrlMinSubjects] = useQueryState('min_subjects', parseAsInteger.withDefault(DEFAULT_COLLECTION_MIN_SUBJECTS))
  const [sort, setUrlSort] = useQueryState('sort', parseAsStringLiteral(SORT_VALUES).withDefault(DEFAULT_COLLECTION_SORT))

  const searchParams = useSearchParams()

  /*
    Invalid params already in the URL are cleared. Defaults are applied when reading
    and are not written to the URL.
  */
  useEffect(function onMount() {
    // If the page parameter is invalid like a negative number or a non-integer, clear it from the URL
    const pageParam = searchParams.get('page')
    if (
      pageParam !== null
      && !(Number.isInteger(Number(pageParam)) && Number(pageParam) > 0) // page should be an integer greater than 0
    ) {
      setUrlPage(1)
    }

    // If the min_subjects parameter is invalid like a negative number or a non-integer, clear it from the URL
    const minSubjectsParam = searchParams.get('min_subjects')
    if (
      minSubjectsParam !== null 
      && !(Number.isInteger(Number(minSubjectsParam)) && Number(minSubjectsParam) >= 0) // min_subjects should be an integer greater than or equal to 0
    ) {
      setUrlMinSubjects(DEFAULT_COLLECTION_MIN_SUBJECTS)
    }

    // If the sort parameter is an unsupported value, clear it from the URL
    const sortParam = searchParams.get('sort')
    if (sortParam !== null && !SORT_VALUES.includes(sortParam)) {
      setUrlSort(DEFAULT_COLLECTION_SORT)
    }
  }, [])


  const { data, error, isLoading, isValidating } = useProjectCollections({
    favorite,
    login: loginParam,
    minSubjects,
    page,
    projectId,
    sort
  })

  const loadingOrValidating = isLoading || isValidating

  function handleSortChange(newSort) {
    setUrlSort(newSort)
    setUrlPage(1)
  }

  function handleMinSubjectsChange(checked) {
    const newMinSubjects = checked ? DEFAULT_COLLECTION_MIN_SUBJECTS : 1
    setUrlMinSubjects(newMinSubjects)
    setUrlPage(1)
  }

  function handlePageChange(newPage) {
    setUrlPage(newPage)
  }

  let placeholder
  if (isUserScoped && !isUserLoading && !user?.id) placeholder = <RequireUser />
  else if (error) placeholder = <ErrorPlaceholder />
  else if (!data) placeholder = <Loader />
  else if (!data.collections.length && !loadingOrValidating) placeholder = <EmptyPlaceholder />

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
      page={page}
      setPage={handlePageChange}
    />
  )
      
  const toolbar = (
    <CollectionsToolbar
      count={data.count}
      isLoading={loadingOrValidating}
      minSubjects={minSubjects}
      onMinSubjectsChange={handleMinSubjectsChange}
      onSortChange={handleSortChange}
      page={page}
      sort={sort}
    />
  )

  return (
    <>
      {pagination}
      {toolbar}
      <Box height={{ min: '180px' }}>
        <CollectionsList
          collections={data.collections}
          isLoading={loadingOrValidating}
        />
      </Box>
      {pagination}
    </>
  )
}

CollectionsListContainer.propTypes = {
  loginParam: string
}

export default CollectionsListContainer
