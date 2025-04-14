import { Box, ResponsiveContext, Text } from 'grommet'
import styled from 'styled-components'
import { useContext } from 'react'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import ProjectCard from '@zooniverse/react-components/ProjectCard'
import Loader from '@zooniverse/react-components/Loader'
import PrimaryButton from '@zooniverse/react-components/PrimaryButton'

import { useTranslation } from '../../../translations/i18n.js'
import { useInfiniteScrollProjects } from '@hooks'

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
  const grommetSize = useContext(ResponsiveContext)

  // grab the project ids
  const projectIds = projectContributions?.map(project => project.project_id)

  const numProjects = projectIds?.length
  const numPages = Math.ceil(numProjects / PAGE_SIZE)

  // fetch project data from panoptes
  const projectsQuery = {
    cards: true,
    id: projectIds?.join(','),
    page_size: PAGE_SIZE
  }

  const {
    renderedProjects,
    error: projectsError,
    isLoading: projectsLoading,
    isValidating,
    size,
    setSize
  } = useInfiniteScrollProjects(projectContributions, projectsQuery)

  // load more projects into the UI
  function handleLoadMore() {
    if (size <= numPages) {
      setSize(size + 1)
    }
  }

  const loading = containerLoading || projectsLoading
  const error = containerError || projectsError

  const disableLoadMore =
    loading || isValidating || error || numProjects === 0 || size === numPages

  return (
    <>
      {loading ? (
        <Box fill align='center' justify='center'>
          <Loader />
        </Box>
      ) : error ? (
        <Box fill align='center' pad='medium'>
          <Text>{t('AllProjects.error')}</Text>
        </Box>
      ) : numProjects === 0 ? (
        <Box fill align='center' pad='medium'>
          <Text>{t('AllProjects.noProjects')}</Text>
        </Box>
      ) : (
        <>
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
                    size={grommetSize}
                  />
                </li>
              )
            })}
          </StyledBox>
          {loading || isValidating && size > 1 && (
            <Box align='center' pad='medium'>
              <Loader />
            </Box>
          )}
          <Box align='center'>
            <PrimaryButton
              label={t('AllProjects.more')}
              disabled={disableLoadMore}
              onClick={handleLoadMore}
            />
          </Box>
        </>
      )}
    </>
  )
}

AllProjects.propTypes = {
  containerError: shape({
    message: string,
    status: number
  }),
  containerLoading: bool,
  projectContributions: arrayOf(
    shape({
      count: number,
      project_id: number
    })
  )
}

export default AllProjects
