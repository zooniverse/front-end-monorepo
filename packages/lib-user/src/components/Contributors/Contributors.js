import { Box } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'

import MemberStats from './components/MemberStats'
import ProjectStats from './components/ProjectStats'

function Contributors({
  contributors,
  projects
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
              avatar={contributor.avatar}
              classifications={contributor.classifications}
              displayName={contributor.displayName}
              hours={contributor.session_time}
              login={contributor.login}
            />
            <Box
              direction='row'
              overflow={{ horizontal: 'auto' }}
              style={{ boxShadow: 'inset -10px 0px 10px -10px rgba(0, 0, 0, 0.25)' }}
            >
              {contributor.project_contributions.map(statsProject => {
                const projectDisplayName = projects.find(project => project.id === statsProject.project_id.toString()).display_name

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

Contributors.propTypes = {
  contributors: arrayOf(shape({
    avatar: string,
    classifications: number,
    displayName: string,
    login: string,
    count: number,
    session_time: number,
    project_contributions: arrayOf(shape({
      project_id: number,
      count: number,
      session_time: number
    }))
  })),
  projects: arrayOf(shape({
    display_name: string,
    id: number
  }))
}

export default Contributors
