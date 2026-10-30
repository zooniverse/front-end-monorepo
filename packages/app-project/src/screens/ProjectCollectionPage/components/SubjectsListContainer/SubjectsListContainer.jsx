import { Box, Button, Paragraph, ResponsiveContext } from 'grommet'
import { useSearchParams } from 'next/navigation'
import { parseAsInteger, useQueryState } from 'nuqs'
import { bool, shape, string } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next/pages'

import { SUBJECTS_PAGE_SIZE } from '@helpers/collectionQueryParams'
import {
  useCollectionSubjects,
  useRemoveCollectionSubjects,
  useSetCollectionCover
} from '@hooks'
import ResultCount from '@shared/components/ResultCount'
import Pagination from '@shared/components/Pagination'

import SelectionToolbar from '../SelectionToolbar'
import SubjectsList from '../SubjectsList'

function SubjectsListContainer({
  canDelete = false,
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
  const [isSelecting, setIsSelecting] = useState(false)
  // Selected subject IDs persist across pages.
  const [selectedIds, setSelectedIds] = useState(() => new Set())

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

  const {
    error: deleteError,
    isRemoving,
    removeSubjects
  } = useRemoveCollectionSubjects({ collectionId, slug: collectionSlug })

  const pageSubjectIds = subjects.map(subject => subject.id)
  const allSelected = pageSubjectIds.length > 0 && pageSubjectIds.every(id => selectedIds.has(id))

  function clearSelection() {
    setSelectedIds(new Set())
  }

  function exitSelectMode() {
    clearSelection()
    setIsSelecting(false)
  }

  function handleAdd() {
    window.alert('Coming soon...')
  }

  function handleToggleSelecting() {
    if (isSelecting) {
      exitSelectMode()
    } else {
      setIsSelecting(true)
    }
  }

  function handleSelect(subject, checked) {
    setSelectedIds(prevIds => {
      const nextIds = new Set(prevIds)
      if (checked) {
        nextIds.add(subject.id)
      } else {
        nextIds.delete(subject.id)
      }
      return nextIds
    })
  }

  // Select all only applies to the current page
  function handleSelectAll(checked) {
    setSelectedIds(prevIds => {
      const nextIds = new Set(prevIds)
      pageSubjectIds.forEach(id => checked ? nextIds.add(id) : nextIds.delete(id))
      return nextIds
    })
  }

  async function handleDelete() {
    if (isRemoving) return

    const confirmed = window.confirm(`Are you sure you want to remove ${selectedIds.size} subjects from this collection?`)
    if (!confirmed) return

    const idsToDelete = [...selectedIds]
    const success = await removeSubjects(idsToDelete)
    if (success) {
      exitSelectMode()
      const remainingPageCount = Math.max(1, Math.ceil((count - idsToDelete.length) / SUBJECTS_PAGE_SIZE))
      if (page > remainingPageCount) {
        setUrlPage(remainingPageCount)
      }
    }
  }

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
          <SelectionToolbar
            allSelected={allSelected}
            canAdd={!!userId}
            canDelete={canDelete}
            isSelecting={isSelecting}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onSelectAll={handleSelectAll}
            onToggleSelecting={handleToggleSelecting}
            selectedCount={selectedIds.size}
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
        {deleteError ? (
          <Paragraph margin='none' role='alert'>
            {t('Collection.deleteError')}
          </Paragraph>
        ) : null}
        <SubjectsList
          defaultSubjectSrc={isOwner ? defaultSubjectSrc : undefined}
          isLoading={isLoading || isValidating}
          isSettingCover={isSettingCover}
          login={login}
          onSelect={handleSelect}
          onSetCover={isOwner && !isSelecting ? handleSetCover : null}
          projectId={projectId}
          projectSlug={projectSlug}
          selectable={isSelecting}
          selectedIds={selectedIds}
          subjects={subjects}
          userId={userId}
        />
      </Box>
      {pagination}
    </>
  )
}

SubjectsListContainer.propTypes = {
  canDelete: bool,
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
