import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'
import SubjectViewerStore from '@store/SubjectViewerStore'
import SingleImageViewer from '@viewers/components/SingleImageViewer'
import asyncStates from '@zooniverse/async-states'

const subject = Factory.build('subject', {
  locations: [{ 'image/jpeg': 'http://placekitten.com/500/300' }]
})

const mockStore = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {
    setModalVisibility: () => {}
  },
  subjects: {
    active: subject
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflowSteps: {
    activeStepTasks: []
  },
  workflows: {
    active: {
      configuration: {
        limit_subject_height: false
      }
    }
  }
}

export default {
  title: 'Subject Viewers / SingleImageViewer',
  component: SingleImageViewer
}

export const Default = () => {
  return (
    <Provider classifierStore={mockStore}>
      <Box width='large'>
        <SingleImageViewer
          loadingState={asyncStates.success}
          enableInteractionLayer={false}
        />
      </Box>
    </Provider>
  )
}

const storeWithLimitSubjectHeight = {
  classifications: {
    active: {
      annotations: new Map()
    }
  },
  fieldGuide: {
    setModalVisibility: () => {}
  },
  subjects: {
    active: subject
  },
  subjectViewer: SubjectViewerStore.create({}),
  workflowSteps: {
    activeStepTasks: []
  },
  workflows: {
    active: {
      configuration: {
        limit_subject_height: true
      }
    }
  }
}

export const LimitSubjectHeight = () => {
  return (
    <Provider classifierStore={storeWithLimitSubjectHeight}>
      <Box width='large'>
        <SingleImageViewer
          loadingState={asyncStates.success}
          enableInteractionLayer={false}
        />
      </Box>
    </Provider>
  )
}
