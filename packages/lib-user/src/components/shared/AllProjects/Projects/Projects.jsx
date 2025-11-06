import { Box, Text } from 'grommet'
import { useRef } from 'react'
import styled from 'styled-components'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import ProjectCard from '@zooniverse/react-components/ProjectCard'
import Loader from '@zooniverse/react-components/Loader'

import { useTranslation } from '@translations/i18n'
import { Pagination } from '@components/shared'

const StyledBox = styled(Box)`
  list-style: none;
  margin-block-start: 0;
  padding-inline-start: 0;
  column-gap: 12px;
  row-gap: 12px;
`

const DEFAULT_HANDLER = () => {}

function Projects({
  error,
  loading = false,
  numProjects = 0,
  page = 1,
  pageSize = 20,
  renderedProjects = [],
  setPage = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()
  const firstCardRef = useRef(null)

  function handlePageChange({ page }) {
    setPage(page)
  }

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
        <Box align='center'>
          <StyledBox forwardedAs='ul' direction='row' wrap justify='start'>
            {renderedProjects?.length ? (
              <li key={renderedProjects?.[0].id} ref={firstCardRef}>
                <ProjectCard
                  badge={renderedProjects?.[0].count}
                  description={renderedProjects?.[0].description}
                  displayName={renderedProjects?.[0].display_name}
                  href={`https://www.zooniverse.org/projects/${renderedProjects?.[0].slug}`}
                  imageSrc={renderedProjects?.[0].avatar_src}
                  size='small'
                  state={renderedProjects?.[0].state}
                />
              </li>
            ) : null}
            {renderedProjects?.length
              ? renderedProjects?.slice(1).map(project => {
                  return (
                    <li key={project?.id}>
                      <ProjectCard
                        badge={project?.count}
                        description={project?.description}
                        displayName={project?.display_name}
                        href={`https://www.zooniverse.org/projects/${project?.slug}`}
                        imageSrc={project?.avatar_src}
                        size='small'
                        state={project?.state}
                      />
                    </li>
                  )
                })
              : null}
          </StyledBox>
          {numProjects > pageSize ? (
            <Pagination
              numberItems={numProjects}
              numberMiddlePages={5}
              page={page}
              onChange={handlePageChange}
              step={pageSize}
            />
          ) : null}
        </Box>
      )}
    </>
  )
}

Projects.propTypes = {
  error: shape({
    message: string,
    status: number
  }),
  loading: bool,
  numProjects: number,
  page: number,
  pageSize: number,
  renderedProjects: arrayOf(
    shape({
      avatar_src: string,
      count: number,
      description: string,
      display_name: string,
      id: string,
      slug: string
    })
  ),
  setPage: func
}

export default Projects
