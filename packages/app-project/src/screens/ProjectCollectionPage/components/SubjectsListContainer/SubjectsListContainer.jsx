import { Box, Button } from 'grommet'
import { useSearchParams } from 'next/navigation'
import { parseAsInteger, useQueryState } from 'nuqs'
import { string } from 'prop-types'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next/pages'

import { SUBJECTS_PAGE_SIZE } from '@helpers/collectionQueryParams'
import { useCollectionSubjects } from '@hooks'

import CollectionsResultCount from '../../../ProjectCollectPage/components/CollectionsResultCount'
import Pagination from '../../../ProjectCollectPage/components/Pagination'

import SubjectsList from '../SubjectsList'

function SubjectsListContainer({
  collectionId,
  login,
  projectId,
  projectSlug,
  userId
}) {
  const { t } = useTranslation('screens')
  const [page, setUrlPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const searchParams = useSearchParams()

  // Clear an invalid page param (negative or non-integer) from the URL
  useEffect(function onMount() {
    const pageParam = searchParams.get('page')
    if (
      pageParam !== null
      && !(Number.isInteger(Number(pageParam)) && Number(pageParam) > 0)
    ) {
      setUrlPage(1)
    }
  }, [])

  const { data, isLoading, isValidating } = useCollectionSubjects({
    collectionId,
    page,
    pageSize: SUBJECTS_PAGE_SIZE
  })
  const { subjects = [], count = 0, pageCount = 1 } = data || {}

  function onSelectSubjects() {
    window.alert('Select Subjects coming soon...')
  }

  const pagination = pageCount > 1 ? (
    <Pagination
      pageCount={pageCount}
      page={page}
      setPage={setUrlPage}
    />
  ) : null

  return (
    <>
      {pagination}
      <Box gap='small'>
        <Box
          align='center'
          direction='row' 
          justify='between'
        >
          <CollectionsResultCount
            count={count}
            i18nKey='Collection.resultsCount'
            isLoading={isLoading || isValidating}
            page={page}
            pageSize={SUBJECTS_PAGE_SIZE}
          />
          <Button
            label={t('Collection.selectSubjects')}
            onClick={onSelectSubjects}
            size='small'
          />
        </Box>
        <SubjectsList
          isLoading={isLoading || isValidating}
          login={login}
          projectId={projectId}
          projectSlug={projectSlug}
          subjects={subjects}
          userId={userId}
        />
      </Box>
      {pagination}
    </>
  )
}

SubjectsListContainer.propTypes = {
  collectionId: string,
  login: string,
  projectId: string,
  projectSlug: string,
  userId: string
}

export default SubjectsListContainer
