import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import { mockWorkflow as mockGroupedWorkflow } from '@shared/components/SubjectSetPicker/SubjectSetPicker.mock'
import initStore from '@stores'
import WorkflowMenuModal from './WorkflowMenuModal'

const router = {
  locale: 'en',
  query: {
    owner: 'test-owner',
    project: 'test-project'
  },
  prefetch() {
    return Promise.resolve()
  }
}

const snapshot = {
  project: {
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
    },
    description:
      'Learn about and help document the wonders of nesting Western Bluebirds.',
    display_name: 'Nest Quest Go: Western Bluebirds',
    slug: 'brbcornell/nest-quest-go-western-bluebirds',
    workflow_description: `Choose your own adventure! There are many ways to engage with this project:  
      1) "Nest Site": Smartphone-friendly, helps us understand where Western Bluebirds build their nests.  
      2) "Location": Smartphone-friendly, series of questions on the geographic location of the nest.  
      3) "Nest Attempt: Smartphone-friendly, for data-entry lovers to record nest attempt data on cards.  
      4) "Comments": For transcription lovers, we ask you to transcribe all the written comments on the cards.`
  },
  user: {
    loadingState: asyncStates.success,
    personalization: {
      projectPreferences: {
        loadingState: asyncStates.success
      }
    }
  }
}

const store = initStore(true, snapshot)
applySnapshot(store.user, snapshot.user)

const WORKFLOWS = [
  {
    completeness: 0.65,
    default: false,
    displayName: 'The Family and the Fishing Net',
    id: '12345'
  },
  {
    completeness: 0,
    default: false,
    displayName: 'Games Without Frontiers',
    id: '7890'
  },
  {
    completeness: 0.99,
    default: false,
    displayName: 'Shock The Monkey',
    id: '5678'
  }
]

function StoryContext(Story) {
  return (
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <Story />
      </Provider>
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Classify / Workflow Menu Modal',
  component: WorkflowMenuModal,
  decorators: [StoryContext],
  argTypes: {
    headingBackground: {
      control: 'color'
    },
    titleColor: {
      control: 'color'
    }
  },
  parameters: {
    docs: {
      inlineStories: false
    }
  }
}

export function ChooseAWorkflow({ headingBackground, titleColor, workflows }) {
  return (
    <WorkflowMenuModal
      headingBackground={headingBackground}
      titleColor={titleColor}
      workflows={workflows}
    />
  )
}

ChooseAWorkflow.args = {
  dark: false,
  headingBackground: zooTheme.global.colors.brand,
  titleColor: zooTheme.global.colors['neutral-6'],
  workflows: [...WORKFLOWS, mockGroupedWorkflow]
}

export function ChooseASubjectSet({
  headingBackground,
  titleColor,
  workflowFromUrl,
  workflows
}) {
  return (
    <WorkflowMenuModal
      headingBackground={headingBackground}
      titleColor={titleColor}
      workflowFromUrl={workflowFromUrl}
      workflows={workflows}
    />
  )
}

ChooseASubjectSet.args = {
  headingBackground: zooTheme.global.colors.brand,
  titleColor: zooTheme.global.colors['neutral-6'],
  workflowFromUrl: mockGroupedWorkflow,
  workflows: [...WORKFLOWS, mockGroupedWorkflow]
}

export function ChooseASubject({
  headingBackground,
  subjectSetFromUrl,
  titleColor,
  workflowFromUrl,
  workflows
}) {
  return (
    <WorkflowMenuModal
      headingBackground={headingBackground}
      titleColor={titleColor}
      subjectSetFromUrl={subjectSetFromUrl}
      workflowFromUrl={workflowFromUrl}
      workflows={workflows}
    />
  )
}

const indexedSubjectSet = mockGroupedWorkflow.subjectSets[1]
indexedSubjectSet.metadata.indexFields = 'date,name'

ChooseASubject.args = {
  headingBackground: zooTheme.global.colors.brand,
  subjectSetFromUrl: indexedSubjectSet,
  titleColor: zooTheme.global.colors['neutral-6'],
  workflowFromUrl: mockGroupedWorkflow,
  workflows: [...WORKFLOWS, mockGroupedWorkflow]
}
