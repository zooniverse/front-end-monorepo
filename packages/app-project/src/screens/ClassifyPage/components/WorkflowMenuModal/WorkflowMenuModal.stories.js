import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { mockWorkflow as mockGroupedWorkflow } from '@shared/components/SubjectSetPicker/helpers'
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
    description: 'Learn about and help document the wonders of nesting Western Bluebirds.',
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

const store = initStore(false, snapshot)
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

function StoryContext (props) {
  const { children, theme } = props

  return (
    <RouterContext.Provider value={router}>
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={theme}
        themeMode={(theme.dark) ? 'dark' : 'light'}
      >
        <Provider store={store}>
          {children}
        </Provider>
      </Grommet>
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Classify / Workflow Menu Modal',
  component: WorkflowMenuModal,
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

export function ChooseAWorkflow({ dark, headingBackground, titleColor, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowMenuModal
        headingBackground={headingBackground}
        titleColor={titleColor}
        workflows={workflows}
      />
    </StoryContext>
  )
}

ChooseAWorkflow.args = {
  dark: false,
  headingBackground: zooTheme.global.colors.brand,
  titleColor: zooTheme.global.colors['neutral-6'],
  workflows: [ ...WORKFLOWS, mockGroupedWorkflow ]
}

export function ChooseASubjectSet({ dark, headingBackground, titleColor, workflowFromUrl, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowMenuModal
        headingBackground={headingBackground}
        titleColor={titleColor}
        workflowFromUrl={workflowFromUrl}
        workflows={workflows}
      />
    </StoryContext>
  )
}

ChooseASubjectSet.args = {
  dark: false,
  headingBackground: zooTheme.global.colors.brand,
  titleColor: zooTheme.global.colors['neutral-6'],
  workflowFromUrl: mockGroupedWorkflow,
  workflows: [ ...WORKFLOWS, mockGroupedWorkflow ]
}

export function ChooseASubject({ dark, headingBackground, subjectSetFromUrl, titleColor, workflowFromUrl, workflows }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <WorkflowMenuModal
        headingBackground={headingBackground}
        titleColor={titleColor}
        subjectSetFromUrl={subjectSetFromUrl}
        workflowFromUrl={workflowFromUrl}
        workflows={workflows}
      />
    </StoryContext>
  )
}

const indexedSubjectSet = mockGroupedWorkflow.subjectSets[1]
indexedSubjectSet.metadata.indexFields = 'date,name'

ChooseASubject.args = {
  dark: false,
  headingBackground: zooTheme.global.colors.brand,
  subjectSetFromUrl: indexedSubjectSet,
  titleColor: zooTheme.global.colors['neutral-6'],
  workflowFromUrl: mockGroupedWorkflow,
  workflows: [ ...WORKFLOWS, mockGroupedWorkflow ]
}