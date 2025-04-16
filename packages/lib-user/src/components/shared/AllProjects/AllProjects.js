import { Box, Text } from 'grommet'
import styled from 'styled-components'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import ProjectCard from '@zooniverse/react-components/ProjectCard'
import Loader from '@zooniverse/react-components/Loader'
import { useTranslation } from '../../../translations/i18n.js'

const StyledBox = styled(Box)`
  list-style: none;
  margin-block-start: 0;
  padding-inline-start: 0;
  column-gap: 20px;
  row-gap: 20px;
`

function AllProjects({ error, loading, projects }) {
  const { t } = useTranslation()

  return (
    <>
      {loading ? (
        <Box fill align='center' justify='center'>
          <Loader />
        </Box>
      ) : projects?.length === 0 ? (
        <Box fill align='center' pad='medium'>
          <Text>{t('AllProjects.noProjects')}</Text>
        </Box>
      ) : error ? (
        <Box fill align='center' pad='medium'>
          <Text>{t('AllProjects.error')}</Text>
        </Box>
      ) : (
        <StyledBox forwardedAs='ul' direction='row' wrap justify='center'>
          {projects.map(project => {
            return (
              <li key={project?.id}>
                <ProjectCard
                  badge={project?.count}
                  description={project?.description}
                  displayName={project?.display_name}
                  href={`https://www.zooniverse.org/projects/${project?.slug}`}
                  imageSrc={project?.avatar_src}
                  size='large'
                  state={project?.state}
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
  projects: arrayOf(
    shape({
      avatar_src: string,
      count: number,
      description: string,
      display_name: string,
      id: string,
      slug: string
    })
  )
}

export default AllProjects
