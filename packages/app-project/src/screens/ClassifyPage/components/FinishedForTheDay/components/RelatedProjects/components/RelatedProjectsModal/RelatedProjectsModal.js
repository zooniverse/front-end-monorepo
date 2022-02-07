import { Modal } from '@zooniverse/react-components'
import { Box, Heading } from 'grommet'
import { array, bool, func, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ProjectCard from './components/ProjectCard'

const DUMMY_PROJECT = {
  name: 'foobar',
  description: 'blurb blurb blurb blurb',
  image: 'https://via.placeholder.com/300x188.png',
  url: 'http://foo.com/bar'
}

// We use the array index as a key in the map further down as the dummy projects
// are identical.
const PROJECTS = [DUMMY_PROJECT, DUMMY_PROJECT, DUMMY_PROJECT]

function RelatedProjectsModal (props) {
  const { t } = useTranslation('screens')
  const { active, closeFn, projects, projectTitle } = props
  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={t('Classify.FinishedForTheDay.RelatedProjectsModal.relatedProjects')}
    >
      <Heading level='3' margin={{ bottom: 'xsmall', top: 'none' }}>
        {t('Classify.FinishedForTheDay.RelatedProjectsModal.title', { project: projectTitle })}
      </Heading>
      <Box as='p' margin={{ bottom: 'small', top: 'none' }}>
        {t('Classify.FinishedForTheDay.RelatedProjectsModal.hereAreSomeOthers')}
      </Box>
      <Box direction='row' gap='small'>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />)
        )}
      </Box>
    </Modal>
  )
}

RelatedProjectsModal.propTypes = {
  active: bool,
  closeFn: func,
  projects: array,
  projectTitle: string
}

RelatedProjectsModal.defaultProps = {
  active: false,
  projects: PROJECTS
}

export default RelatedProjectsModal
