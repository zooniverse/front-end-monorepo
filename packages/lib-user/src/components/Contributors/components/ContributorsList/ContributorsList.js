import { Box } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'

import MemberStats from '../MemberStats'
import ProjectStats from '../ProjectStats'

function ContributorsList({
  contributors = [],
  projects = []
}) {
  return (
    <Box>
      {contributors.map((contributor, index) => {
        return (
          <Box
            key={contributor.id}
            background={index % 2 === 0 ? 
              { dark: 'dark-3', light: 'neutral-6' }
              : 
              { dark: 'dark-1', light: 'light-1' }
            }
            border={{ color: 'light-5', size: '0.5px' }}
            direction='row'
          >
            <MemberStats
              avatar={contributor.avatar_src}
              classifications={contributor.count}
              displayName={contributor.display_name}
              hours={contributor.session_time}
              login={contributor.login}
            />
            <Box
              direction='row'
              fill='horizontal'
              overflow={{ horizontal: 'auto' }}
              style={{ boxShadow: 'inset -10px 0px 10px -10px rgba(0, 0, 0, 0.25)' }}
            >
              {contributor.project_contributions.map(statsProject => {
                const project = projects.find(project => project.id === statsProject.project_id.toString())
                const projectDisplayName = project?.display_name || 'Private Project'

                return (
                  <ProjectStats
                    key={statsProject.project_id}
                    classifications={statsProject.count}
                    hours={statsProject.session_time}
                    projectDisplayName={projectDisplayName}
                  />
                )
              })}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

ContributorsList.propTypes = {
  contributors: arrayOf(shape({
    id: string,
    avatar: string,
    count: number,
    display_name: string,
    login: string,
    project_contributions: arrayOf(shape({
      project_id: number,
      count: number,
      session_time: number
    })),
    session_time: number,
  })),
  projects: arrayOf(shape({
    display_name: string,
    id: string
  }))
}

export default ContributorsList
