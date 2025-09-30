import { Anchor, Box, Grid, Image, Text } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

const DEFAULT_HANDLER = () => {}

function getTalkLink(projectSlug, subjectId) {
  return `https://www.zooniverse.org/projects/${projectSlug}/talk/subjects/${subjectId}`
}

const StyledAnchor = styled(Anchor)`
  &:hover, &:focus, &:focus-visible {
    border: solid 3px ${props => props.theme.global.colors.brand};
  }
`

function SubjectGroupModal({
  active = false,
  closeFn = DEFAULT_HANDLER,
  subject,
  workflowConfiguration
}) {
  if (!active || !subject) return null

  const columns = new Array(workflowConfiguration.subject_viewer_config.grid_columns).fill('1fr')
  const rows = new Array(workflowConfiguration.subject_viewer_config.grid_rows).fill('1fr')

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title='Discuss this subject group'
    >
      <Box gap='xsmall' width={{ max: '400px' }}>
        <Text>Choose a subject to view in Talk</Text>
        <Grid
          columns={columns}
          rows={rows}
          gap='xsmall'
        >
          {subject.locations.map((location, i) => {
            return <StyledAnchor
              href={getTalkLink(subject.project.slug, subject.subjectIds[i])}
              key={subject.subjectIds[i]}
              target='_blank'
            >
              <Image
                height='100%'
                width='100%'
                src={location.url}
                alt={`Subject ${subject.subjectIds[i]}`}
              />
            </StyledAnchor>
          })}
        </Grid>
      </Box>
    </Modal>
  )
}

SubjectGroupModal.propTypes = {
  active: bool,
  closeFn: func,
  subject: shape({
    project: shape({
      slug: string
    }),
    subjectIds: arrayOf(string),
    locations: arrayOf(shape({
      url: string
    }))
  }),
  workflowConfiguration: shape({
    subject_viewer_config: shape({
      grid_columns: number,
      grid_rows: number
    })
  })
}

export default SubjectGroupModal
