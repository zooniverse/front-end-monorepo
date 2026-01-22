import {
  Loader,
  ProjectCard,
  SpacedHeading
} from '@zooniverse/react-components'
import { Box, CheckBox, Paragraph, ResponsiveContext, Text } from 'grommet'
import { useContext, useState } from 'react'
import { useQueryState } from 'nuqs'

import { useTranslation, Trans } from '@translations/i18n'
import StyledCardsContainer from '../StyledCardsContainer'
import useProjects from './hooks/useProjects'
import useDebounce from './hooks/useDebounce'

import DisciplineSelect from './components/DisciplineSelect'
import LanguagesSelect from './components/LanguagesSelect'
import Pagination from './components/Pagination'
import {
  LoadingPlaceholder,
  EmptyPlaceholder,
  ErrorPlaceholder
} from './components/Placeholders'
import SearchBar from './components/SearchBar'
import SortBySelect from './components/SortBySelect'
import StatusSelect from './components/StatusSelect'

export default function Projects({ adminMode = false }) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  const [sort, setSort] = useQueryState('sort', {
    defaultValue: '-launch_date'
  })
  const [status, setProjectStatus] = useQueryState('status', {
    defaultValue: 'live'
  })

  /*
    This UI only allows one filtered language for now. The param is plural because of https://github.com/zooniverse/panoptes/pull/4530.
    In theory, multiple languages can be included in the query, but that is a compounding list, not a more narrow filter.
    We would need an updated UI design to account for multiple languages in the Select value.
    ALSO NOTE: Querying with `languages: en` will not return all projects from panoptes,
    but on the frontend we do want all projects so the `languages` param is set to `undefined` in the `query` below.
  */
  const [languages, setLanguages] = useQueryState('languages', {
    defaultValue: 'en'
  })
  const [discipline, setDiscipline] = useQueryState('discipline')
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const debouncedSearch = useDebounce(search, 500)

  /*
    Note: A signed-in admin is not required by panoptes to fetch projects where launch_approved=false or undefined,
    but this component checks if adminMode is turned on in localStorage, and provides the option to return ALL projects regardless of launch approval.
  */
  const [launchApproved, setLaunchApproved] = useState(true)
  const [page, setPage] = useState(1)

  const pageSize = 20

  const query = {
    launch_approved: !adminMode || launchApproved ? true : undefined,
    languages: languages === 'en' ? undefined : languages,
    page: page,
    page_size: pageSize,
    search: debouncedSearch?.length >= 5 ? debouncedSearch : undefined, // panoptes search requires at least 5 characters
    sort: sort,
    state: status === 'all' ? undefined : status,
    tags: discipline === null ? undefined : discipline
  }

  /**
    For use in <EmptyPlaceholder> to clear all filters.
   */
  function clearFilters() {
    setLanguages('en')
    setPage(1)
    setSearch('')
    setProjectStatus('live')
    setDiscipline(null)
  }

  /**
    Reset page to 1 whenever another query param changes. This is not very DRY, but
    better to set page = 1 before changing the other query param to avoid unnecessary API
    requests with page > 1 via useEffect or other strategy.
   */
  function handleSearch(value) {
    if (page !== 1) setPage(1)
    setSearch(value)
  }

  function handleProjectStatus(value) {
    if (page !== 1) setPage(1)
    setProjectStatus(value)
  }

  function handleDiscipline(value) {
    if (page !== 1) setPage(1)
    setDiscipline(value)
  }

  function handleLanguages(value) {
    if (page !== 1) setPage(1)
    setLanguages(value)
  }

  function handleSort(value) {
    if (page !== 1) setPage(1)
    setSort(value)
  }

  /**
    data receives a fallback from SSR in ProjectsPageContainer.
    Otherwise, this hook will rerun anytime query changes as a result of useQueryState updates.
  */
  const { data, error, isLoading, isValidating } = useProjects(query)
  const { numProjects, projects } = data || {}

  const loadingOrValidating = isLoading || isValidating

  const noProjects = projects?.length === 0

  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = projects?.length < pageSize ? numProjects : page * pageSize
  const range = numProjects < pageSize ? numProjects : `${rangeStart}-${rangeEnd}`

  return (
    <>
      <Box width='min(100%, 60rem)'>
        <SpacedHeading
          id='all-projects'
          level={2}
          size={size === 'small' ? '1.5rem' : '2rem'}
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          textAlign='center'
          fill
          margin={{ top: 'none', bottom: '15px' }}
        >
          {t('Projects.projects.heading')}
        </SpacedHeading>
        <Paragraph
          margin={{ top: 'none', bottom: size === 'small' ? '20px' : '30px' }}
          size={size === 'small' ? '1rem' : '1.125rem'}
          color={{ light: 'black', dark: 'white' }}
        >
          <Trans
            i18nKey='Projects.projects.description'
            t={t}
            components={[
              <Text
                weight='bold'
                key='welcome-paragraph-bold'
                size={size === 'small' ? '1rem' : '1.125rem'}
              />
            ]}
          />
        </Paragraph>
      </Box>
      {!!adminMode ? (
        <CheckBox
          checked={!launchApproved}
          onChange={() => setLaunchApproved(!launchApproved)}
          label='(Admin) Include not-launch-approved projects in results?'
        />
      ) : null}
      <Box
        fill
        direction={size === 'small' ? 'column' : 'row'}
        gap={size === 'small' ? '15px' : '10px'}
      >
        <SearchBar handleSearch={handleSearch} value={search} />
        <StatusSelect handleProjectStatus={handleProjectStatus} value={status} />
        <LanguagesSelect handleLanguages={handleLanguages} value={languages} />
      </Box>
      <DisciplineSelect value={discipline} handleDiscipline={handleDiscipline} />
      <Box
        fill
        direction='row'
        justify='between'
        margin={{ bottom: '15px' }}
        align='center'
      >
        {loadingOrValidating ? (
          <Loader height='20px' width='20px' />
        ) : (
          <Paragraph
            margin='none'
            size={size === 'small' ? '0.75rem' : '0.875rem'}
          >
            {t('Projects.projects.showingNum', {
              range: range,
              total: numProjects
            })}
          </Paragraph>
        )}
        <SortBySelect handleSort={handleSort} value={sort} />
      </Box>
      <Box height={{ min: '180px' }}>
        {error ? (
          <ErrorPlaceholder />
        ) : noProjects && !loadingOrValidating ? (
          <EmptyPlaceholder clearFilters={clearFilters} setPage={setPage} setProjectStatus={setProjectStatus} />
        ) : (
          <StyledCardsContainer>
            {loadingOrValidating ? <LoadingPlaceholder /> : null}
            {projects?.map(project => (
              <li key={project.id}>
                <ProjectCard
                  description={project.description}
                  displayName={project.display_name}
                  href={`/projects/${project.slug}`}
                  imageSrc={project.avatar_src}
                  size={size}
                  state={project.state}
                />
              </li>
            ))}
          </StyledCardsContainer>
        )}
      </Box>
      {numProjects > pageSize ? (
        <Pagination
          numProjects={numProjects}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
        />
      ) : null}
    </>
  )
}
