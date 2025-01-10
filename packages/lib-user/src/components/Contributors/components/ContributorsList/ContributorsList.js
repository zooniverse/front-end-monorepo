import { Box } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'
import { useTranslation } from '../../../../translations/i18n.js'

import { convertStatsSecondsToHours } from '@utils'

import MemberStats from '../MemberStats'
import ProjectStats from '../ProjectStats'

function ContributorsList({
  contributors = [],
  projects = []
}) {
  const { t } = useTranslation()

  let privateProjectIndex = 1
  contributors.sort((a, b) => b.count - a.count)

  return (
    <Box
      as='ol'
      pad='none'
    >
      {contributors.map((contributor, index) => {
        const totalHoursSpent = convertStatsSecondsToHours(contributor.session_time)

        return (
          <Box
            key={contributor.id}
            a11yTitle={t('Contributors.ContributorsList.a11y', { name: contributor.display_name })}
            as='li'
            background={index % 2 === 0 ?
              { dark: 'dark-3', light: 'neutral-6' }
              :
              { dark: 'dark-1', light: 'light-1' }
            }
            border={{ color: 'light-5', size: '0.5px' }}
            data-testid='contributor-stats'
            direction='row'
            tabIndex={0}
          >
            <MemberStats
              avatar={contributor.avatar_src}
              classifications={contributor.count}
              displayName={contributor.display_name}
              hours={totalHoursSpent}
              login={contributor.login}
            />
            <Box
              as='ol'
              direction='row'
              fill='horizontal'
              overflow={{ horizontal: 'auto' }}
              pad='none'
              style={{
                boxShadow: 'inset -10px 0px 10px -10px rgba(0, 0, 0, 0.25)',
                listStyle: 'none'
              }}
            >
              {contributor.project_contributions.map(statsProject => {
                const project = projects.find(project => project.id === statsProject.project_id.toString())
                const projectDisplayName = project?.display_name || t('Contributors.ContributorsList.privateProject', { index: privateProjectIndex })
                const projectHoursSpent = convertStatsSecondsToHours(statsProject.session_time)

                return (
                  <ProjectStats
                    key={statsProject.project_id}
                    classifications={statsProject.count}
                    hours={projectHoursSpent}
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
