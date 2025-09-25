import { Anchor, Box, Grid, Image, Text } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'
import { withStores } from '@helpers'

const DEFAULT_HANDLER = () => {}

function storeMapper(classifierStore) {
  return {
    setSubjectGroupModalState: classifierStore.workflows?.active?.configuration?.setSubjectGroupModalState,
    showSubjectGroupModal: classifierStore.workflows?.active?.configuration?.enable_subject_group_modal,
    workflowConfiguration: classifierStore.workflows?.active?.configuration
  }
}

const StyledAnchor = styled(Anchor)`
  &:hover, &:focus, &:focus-visible {
    border: solid 3px ${props => props.theme.global.colors.brand};
  }
`

function SubjectGroupModal({
  setSubjectGroupModalState = DEFAULT_HANDLER,
  showSubjectGroupModal = false,
  workflowConfiguration
}) {
  if (!showSubjectGroupModal || !workflowConfiguration.lastSubject)
    return null

  const subject = workflowConfiguration.lastSubject
  const columns = new Array(workflowConfiguration.subject_viewer_config.grid_columns).fill('1fr')
  const rows = new Array(workflowConfiguration.subject_viewer_config.grid_rows).fill('1fr')
  
  function onClose() {
    setSubjectGroupModalState(false)
  }

  return (
    <Modal
      active={true}
      closeFn={onClose}
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
              href={`https://www.zooniverse.org/projects/${subject.project.slug}/talk/subjects/${subject.subjectIds[i]}`}
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
  setSubjectGroupModalState: func,
  showSubjectGroupModal: bool,
  workflowConfiguration: shape({
    subject_viewer_config: shape({
      grid_columns: number,
      grid_rows: number
    }),
    lastSubject: shape({
      project: shape({
        slug: string
      }),
      subjectIds: arrayOf(string),
      locations:  arrayOf(shape({
        url: string
      }))
    }),
  }),
}

export default withStores(SubjectGroupModal, storeMapper)
export { SubjectGroupModal }
