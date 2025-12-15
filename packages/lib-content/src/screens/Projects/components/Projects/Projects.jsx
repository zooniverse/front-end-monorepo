import {
  Loader,
  ProjectCard,
  SpacedHeading
} from '@zooniverse/react-components'
import { Box, CheckBox, Paragraph, ResponsiveContext } from 'grommet'
import { useContext, useState } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { useTranslation } from '@translations/i18n'
import StyledCardsContainer from '../StyledCardsContainer'
import useProjects from './hooks/useProjects'
import Pagination from './components/Pagination'
import SortBySelect from './components/SortBySelect'
import LoadingPlaceholder from './components/LoadingPlaceholder'
import StateSelect from './components/StateSelect'
import LanguagesSelect from './components/LanguagesSelect'
import DisciplineSelect from './components/DisciplineSelect'
import SearchBar from './components/SearchBar'

export default function Projects({ adminMode = false }) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: '-launch_date'
  })
  const [state, setProjectState] = useQueryState('state', {
    defaultValue: 'live'
  })

  /*
    This UI only allows one filtered language for now. The param is plural because of https://github.com/zooniverse/panoptes/pull/4530.
    In theory, multiple languages can be included in the query, but that is a compounding list, not a more narrow filter.
    We would need an updated UI design to account for multiple languages in the Select value.
    ALSO NOTE: Querying with languages = 'en' will not return all projects from panoptes,
    but on the frontend we do want all projects so the `languages` param is set to `undefined` in the query below.
  */
  const [languages, setLanguages] = useQueryState('languages', {
    defaultValue: 'en'
  })
  const [discipline, setDiscipline] = useQueryState('discipline')

  /*
    Note: A signed-in admin is not required by panoptes to fetch projects where launch_approved=false or undefined,
    but this component checks if adminMode is turned on in localStorage, and provides the option to return ALL projects regardless of launch approval.
  */
  const [launchApproved, setLaunchApproved] = useState(true)

  const pageSize = 20

  const query = {
    launch_approved: launchApproved ? true : undefined,
    languages: languages === 'en' ? undefined : languages,
    page: page,
    page_size: pageSize,
    sort: sort,
    state: state,
    tags: discipline === null ? undefined : discipline, // useQueryParams expects null if no param, but for the panoptes query we want undefined
  }

  /**
    data receives a fallback from SSR in ProjectsPageContainer.
    Otherwise, this hook will rerun anytime query changes as a result of useQueryState updates.
  */
  const { data, error, isLoading, isValidating } = useProjects(query)

  const { numProjects, projects } = data || {}

  return (
    <>
      <Box width='min(100%, 60rem)'>
        <SpacedHeading
          id='organizations'
          level={2}
          size='2rem'
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          textAlign='center'
          fill
        >
          {t('Projects.projects.heading')}
        </SpacedHeading>
        <Paragraph
          margin={{ top: 'none', bottom: 'medium' }}
          size={size === 'small' ? '1rem' : '1.125rem'}
          color={{ light: 'black', dark: 'white' }}
        >
          {t('Projects.projects.description')}
        </Paragraph>
      </Box>
      {!!adminMode ? (
        <CheckBox
          checked={!launchApproved}
          onChange={() => setLaunchApproved(!launchApproved)}
          label='(Admin) Include not-launch-approved projects in results?'
        />
      ) : null}

      <Box fill direction='row' gap='10px'>
        <SearchBar value='search' />
        <StateSelect setProjectState={setProjectState} value={state} />
        <LanguagesSelect setLanguages={setLanguages} value={languages} />
      </Box>
      <DisciplineSelect value={discipline} setDiscipline={setDiscipline} />
      <Box
        fill
        direction={size === 'small' ? 'row-reverse' : 'row'}
        justify='between'
        margin={{ bottom: '10px' }}
        align='center'
      >
        {isValidating || isLoading ? (
          <Loader height='20px' width='20px' />
        ) : (
          <Paragraph
            margin='none'
            size={size === 'small' ? '0.75rem' : '0.875rem'}
          >
            {t('Projects.projects.showingNum', { number: numProjects })}
          </Paragraph>
        )}
        <SortBySelect setSort={setSort} value={sort} />
      </Box>
      <StyledCardsContainer>
        {isValidating ? <LoadingPlaceholder /> : null}
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
