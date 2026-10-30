import { Box, Button, Paragraph, ResponsiveContext } from 'grommet'
import { useSearchParams } from 'next/navigation'
import { parseAsInteger, useQueryState } from 'nuqs'
import { bool, shape, string } from 'prop-types'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next/pages'

import { SUBJECTS_PAGE_SIZE } from '@helpers/collectionQueryParams'
import { useCollectionSubjects, useSetCollectionCover } from '@hooks'
import ResultCount from '@shared/components/ResultCount'
import Pagination from '@shared/components/Pagination'

import SubjectsList from '../SubjectsList'

function SubjectsListContainer({
  collection,
  isOwner = false,
  login,
  projectId,
  projectSlug,
  userId
}) {
  const { t } = useTranslation('screens')
  const size = useContext(ResponsiveContext)
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

  const {
    id: collectionId,
    default_subject_src: defaultSubjectSrc,
    slug: collectionSlug
  } = collection
  
  const {
    data,
    error,
    isLoading,
    isValidating
  } = useCollectionSubjects({
    collectionId,
    page,
    pageSize: SUBJECTS_PAGE_SIZE
  })
  const { subjects = [], count = 0, pageCount = 1 } = data || {}

  const {
    error: setCoverError,
    isSettingCover,
    setCover
  } = useSetCollectionCover({ slug: collectionSlug })

  if (error) {
    return (
      <Box
        align='center'
        justify='center'
        height={{ min: '50vh' }}
        pad='large'
      >
        <Paragraph>{t('Collection.subjectsLoadError')}</Paragraph>
      </Box>
    )
  }

  if (!isLoading && !isValidating && count === 0) {
    return (
      <Box
        align='center'
        justify='center'
        height={{ min: '50vh' }}
        pad='large'
      >
        <Paragraph>{t('Collection.emptySubjects')}</Paragraph>
      </Box>
    )
  }

  function handleSetCover(subject) {
    setCover(subject.id)
  }

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
          direction={size === 'small' ? 'column' : 'row-reverse'}
          gap='small'
          justify='between'
        >
          <Button
            label={t('Collection.selectSubjects')}
            onClick={onSelectSubjects}
            size='small'
          />
          <ResultCount
            count={count}
            i18nKey='Collection.resultsCount'
            isLoading={isLoading || isValidating}
            page={page}
            pageSize={SUBJECTS_PAGE_SIZE}
          />
        </Box>
        {setCoverError ? (
          <Paragraph margin='none' role='alert'>
            {t('Collection.setCoverError')}
          </Paragraph>
        ) : null}
        <SubjectsList
          defaultSubjectSrc={isOwner ? defaultSubjectSrc : undefined}
          isLoading={isLoading || isValidating}
          isSettingCover={isSettingCover}
          login={login}
          onSetCover={isOwner ? handleSetCover : null}
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
  collection: shape({
    default_subject_src: string,
    id: string,
    slug: string
  }).isRequired,
  isOwner: bool,
  login: string,
  projectId: string,
  projectSlug: string,
  userId: string
}

export default SubjectsListContainer
