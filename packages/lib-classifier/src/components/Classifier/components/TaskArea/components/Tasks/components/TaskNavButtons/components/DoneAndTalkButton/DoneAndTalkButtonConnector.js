import { Anchor, Box, Grid, Image, Text } from 'grommet'
import DoneAndTalkButton from './DoneAndTalkButton'
import { Modal } from '@zooniverse/react-components'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { useState } from 'react'
import { useStores } from '@hooks'

// Modal styling for eventual SubjectGroupViewer Done&Talk modal starts here
const StyledAnchor = styled(Anchor)`
  &:hover, &:focus, &:focus-visible {
    border: solid 3px ${props => props.theme.global.colors.brand};
  }
`

function ModalSubjectGroup({
  onClick,
  subject,
  workflowConfiguration,
}) {
  const columns = new Array(workflowConfiguration.subject_viewer_config.grid_columns).fill('1fr');
  const rows = new Array(workflowConfiguration.subject_viewer_config.grid_rows).fill('1fr');
  
  function onClose() {
    return onClick()
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
              href={`https://www.zooniverse.org/projects/${subject.project.slug}/talk/subjects/${subject.subjectIds[i]}?env=staging`}
              target='_blank'
            >
              <Image
                height='100%'
                width='100%'
                src={location.url}
                alt={`Subject ${i}`}
              />
            </StyledAnchor>
          })}
        </Grid>
      </Box>
    </Modal>
  )
}

function storeMapper(classifierStore) {
  const {
    classifications: {
      completeClassification
    },
    subjects: {
      active: subject
    },
    workflows: {
      active: {
        configuration: workflowConfiguration
      }
    },
    workflowSteps: {
      shouldWeShowDoneAndTalkButton
    }
  } = classifierStore

  if (subject?.stepHistory) { // stepHistory is not ready while the subject is loading
    const { finish, hasNextStep } = subject.stepHistory

    const visible = (!hasNextStep && shouldWeShowDoneAndTalkButton)

    function onClick() {
      finish()
      return completeClassification({ doneAndTalk: true })
    }

    return {
      onClick,
      subject,
      talkURL: subject.talkURL,
      workflowConfiguration,
      visible
    }
  }

  return {}
}

function DoneAndTalkConnector(props) {
  const {
    onClick,
    subject,
    talkURL,
    visible,
    workflowConfiguration
  } = useStores(storeMapper)
  const [showModal, setShowModal] = useState(false)

  function onClickInterceptor(event) {
    if (workflowConfiguration.subject_viewer === 'subjectGroup') {
      event.preventDefault();
      setShowModal(true);
    } else {
      return onClick(event)
    }
  }

  return visible && !showModal
    ? <DoneAndTalkButton onClick={onClickInterceptor} {...props} talkURL={talkURL} /> 
    : visible && showModal
      ? <ModalSubjectGroup onClick={onClick} subject={subject} workflowConfiguration={workflowConfiguration} />
      : null
}

export default observer(DoneAndTalkConnector)
