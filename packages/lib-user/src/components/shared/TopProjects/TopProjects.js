import { Box, Grid, ResponsiveContext } from 'grommet'
import { arrayOf, bool, node, number, string, shape } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'
import { Loader, ProjectCard } from '@zooniverse/react-components'
import { useTranslation } from '../../../translations/i18n.js'

import { ContentBox } from '@components/shared'

const StyledGridList = styled(Grid)`
  list-style: none;
  margin-block-end: 0;
  margin-block-start: 0;
  max-height: 420px;
  overflow-x: none;
  overflow-y: auto;
  padding-inline-start: 0;
`

const StyledRowList = styled(Box)`
  list-style: none;
  margin-block-end: 0;
  margin-block-start: 0;
  scroll-snap-type: x mandatory;

  li {
    scroll-snap-align: start;
  }
`

function CardsGrid({ children }) {
  const { t } = useTranslation()
  return (
    <StyledGridList
      a11yTitle={t('TopProjects.title')}
      columns={['1fr', '1fr', '1fr']}
      forwardedAs='ul'
      gap='xsmall'
      justify='center'
      pad='xxsmall'
      rows={[ 'auto', 'auto' ]}
    >
      {children}
    </StyledGridList>
  )
}

CardsGrid.propTypes = {
  children: node
}

function CardsRow({ children }) {
  const { t } = useTranslation()
  return (
    <StyledRowList
      a11yTitle={t('TopProjects.title')}
      direction='row'
      forwardedAs='ul'
      gap='small'
      overflow={{ horizontal: 'auto' }}
      pad={{
        bottom: 'xsmall',
        horizontal: 'xxsmall',
        top: 'xxsmall'
      }}
      tabIndex={0}
    >
      {children}
    </StyledRowList>
  )
}

CardsRow.propTypes = {
  children: node
}

function TopProjects({
  allProjectsStats = {},
  grid = false,
  linkProps = { href: '' },
  loading = false,
  projects = []
}) {
  const { t } = useTranslation()
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
        return {
          count: projectContribution.count,
          ...projectData
        }
      })
      .filter(project => project?.id)
      .slice(0, 20)
  }

  const Container = grid ? CardsGrid : CardsRow

  return (
    <ContentBox
      linkLabel={t('common.seeAll')}
      linkProps={linkProps}
      title={t('TopProjects.title')}
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
                  badge={topProject?.count}
                  description={topProject?.description}
                  displayName={topProject?.display_name}
                  href={`https://www.zooniverse.org/projects/${topProject?.slug}`}
                  imageSrc={topProject?.avatar_src}
                  size={cardSize}
                  state={topProject?.state}
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
  linkProps: shape({
    href: string
  }),
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
