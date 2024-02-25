import { Box } from 'grommet'
import { arrayOf, string, shape } from 'prop-types'

import {
  ContentBox,
  ProjectCard
} from '../../../shared'

function TopProjects ({ topProjects = [] }) {
  return (
    <ContentBox
      linkLabel='See more'
      linkProps={{ href: 'https://www.zooniverse.org/projects' }}
      title='Top Projects'
    >
      <Box
        direction='row'
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
      >
        {topProjects.map(topProject => {
          return (
            <ProjectCard
              key={topProject?.id}
              description={topProject?.description}
              displayName={topProject?.display_name}
              href={`https://www.zooniverse.org/projects/${topProject?.slug}`}
              imageSrc={topProject?.avatar_src}                
            />
          )
        })}
      </Box>
    </ContentBox>
  )
}

TopProjects.propTypes = {
  topProjects: arrayOf(shape({
    avatar_src: string,
    description: string,
    display_name: string,
    id: string,
    slug: string
  }))
}

export default TopProjects
