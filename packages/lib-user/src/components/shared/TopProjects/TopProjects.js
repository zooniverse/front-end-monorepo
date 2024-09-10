import { Box, Grid, ResponsiveContext } from 'grommet'
import { arrayOf, bool, node, number, string, shape } from 'prop-types'
import { useContext } from 'react'
import { Loader, ProjectCard } from '@zooniverse/react-components'

import { ContentBox } from '@components/shared'

function CardsGrid({ children }) {
  return (
    <Grid
      as='ul'
      columns={['1fr', '1fr', '1fr']}
      gap='xsmall'
      pad='none'
      rows={[ 'auto', 'auto' ]}
      style={{ listStyle: 'none' }}
    >
      {children}
    </Grid>
  )
}

CardsGrid.propTypes = {
  children: node
}

function CardsRow({ children }) {
  return (
    <Box
      as='ul'
      direction='row'
      gap='small'
      pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
      overflow={{ horizontal: 'auto' }}
      style={{ listStyle: 'none' }}
    >
      {children}
    </Box>
  )
}

CardsRow.propTypes = {
  children: node
}

function TopProjects({
  allProjectsStats = {},
  grid = false,
  loading = false,
  projects = []
}) {
  const size = useContext(ResponsiveContext)
  const cardSize = grid ? 'small' : size

  // set top projects based on selected date range and all project stats
  let topProjects = []
  const topProjectContributions = allProjectsStats?.project_contributions
    ?.sort((a, b) => b.count - a.count)

  if (topProjectContributions?.length > 0) {
    topProjects = topProjectContributions
      ?.map(projectContribution => {
        const projectData = projects?.find(project => project.id === projectContribution.project_id.toString())
        return projectData
      })
      .filter(project => project)
      .slice(0, 6)
  }

  const Container = grid ? CardsGrid : CardsRow

  return (
    <ContentBox
      title='Top Projects'
    >
      {loading ? (
        <Box
          align='center'
          fill
          justify='center'
          pad='medium'
        >
          <Loader />
        </Box>
      ) : (
        <Container>
          {topProjects.map(topProject => {
            return (
              <li key={topProject?.id}>
                <ProjectCard
                  description={topProject?.description}
                  displayName={topProject?.display_name}
                  href={`https://www.zooniverse.org/projects/${topProject?.slug}`}
                  imageSrc={topProject?.avatar_src}
                  size={cardSize}
                />
              </li>
            )
          })}
        </Container>
      )}
    </ContentBox>
  )
}

TopProjects.propTypes = {
  allProjectsStats: shape({
    project_contributions: arrayOf(shape({
      count: number,
      project_id: number
    }))
  }),
  grid: bool,
  loading: bool,
  projects: arrayOf(shape({
    avatar_src: string,
    description: string,
    display_name: string,
    id: string,
    slug: string
  }))
}

export default TopProjects
