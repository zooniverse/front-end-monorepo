import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import useSWRInfinite from 'swr/infinite'
import ProjectCard from '@zooniverse/react-components/ProjectCard'
import Loader from '@zooniverse/react-components/Loader'

import { useTranslation } from '../../../translations/i18n.js'
import { usePanoptesProjects } from '@hooks'

const PAGE_SIZE = 20

const StyledBox = styled(Box)`
  list-style: none;
  margin-block-start: 0;
  padding-inline-start: 0;
  column-gap: 20px;
  row-gap: 20px;
`

function AllProjects({
  containerError,
  containerLoading,
  projectContributions
}) {
  const { t } = useTranslation()

  // grab the project ids
  const projectIds = projectContributions?.map(project => project.project_id)

  const numProjects = projectIds?.length
  const numPages = Math.ceil(numProjects / PAGE_SIZE)

  // fetch project data from panoptes
  const startSlice = page * PAGE_SIZE
  const endSlice = page === numPages ? numProjects : (page + 1) * PAGE_SIZE

  // const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(
  //   getKey, fetcher?, options?
  // )

  const projectsQuery = {
    cards: true,
    id: projectIds?.slice(startSlice, endSlice).join(','),
    page_size: PAGE_SIZE
  }
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectsQuery)

  // Match project data from panoptes to the stat from ERAS
  const renderedProjects = projectContributions
    ?.map(projectContribution => {
      const projectData = projects?.find(
        project => project.id === projectContribution.project_id.toString()
      )
      return {
        count: projectContribution.count, // for the badge in ProjectCard
        ...projectData
      }
    })
    .filter(project => project?.id) // in case of private project not returned from panoptes?

  const loading = containerLoading || projectsLoading
  const error = containerError || projectsError

  return (
    <>
      {loading ? (
        <Box fill align='center' justify='center'>
          <Loader />
        </Box>
      ) : numProjects === 0 ? (
        <Box fill align='center' pad='medium'>
          <Text>{t('AllProjects.noProjects')}</Text>
        </Box>
      ) : error ? (
        <Box fill align='center' pad='medium'>
          <Text>{t('AllProjects.error')}</Text>
        </Box>
      ) : (
        <StyledBox forwardedAs='ul' direction='row' wrap justify='center'>
          {renderedProjects?.map(project => {
            return (
              <li key={project?.id}>
                <ProjectCard
                  badge={project?.count}
                  description={project?.description}
                  displayName={project?.display_name}
                  href={`https://www.zooniverse.org/projects/${project?.slug}`}
                  imageSrc={project?.avatar_src}
                  size='large'
                />
              </li>
            )
          })}
        </StyledBox>
      )}
    </>
  )
}

AllProjects.propTypes = {
  error: shape({
    message: string,
    status: number
  }),
  loading: bool,
  projectContributions: arrayOf(
    shape({
      count: number,
      project_id: number
    })
  )
}

export default AllProjects
