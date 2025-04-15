import { Box, ResponsiveContext, Text } from 'grommet'
import styled from 'styled-components'
import { useContext } from 'react'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import ProjectCard from '@zooniverse/react-components/ProjectCard'
import Loader from '@zooniverse/react-components/Loader'

import { useTranslation } from '../../../../translations/i18n.js'
import { Pagination } from '@components/shared'

const StyledBox = styled(Box)`
  list-style: none;
  margin-block-start: 0;
  padding-inline-start: 0;
  column-gap: 20px;
  row-gap: 20px;
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
  const size = useContext(ResponsiveContext)

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
                    size={size}
                  />
                </li>
              )
            })}
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
        </>
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
