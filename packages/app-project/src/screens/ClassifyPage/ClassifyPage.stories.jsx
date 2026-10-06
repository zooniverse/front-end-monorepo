import asyncStates from '@zooniverse/async-states'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

import initStore from '@stores'
import { ClassifyPage } from './ClassifyPage'

const router = {
  asPath: '/projects/zooniverse/snapshot-serengeti/classify/workflow/32842',
  locale: 'en',
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  },
  prefetch() {
    return Promise.resolve()
  }
}

export const EXTERNAL_WORKFLOW = {
  completeness: 0,
  configuration: {
    external_workflow_description: 'This workflow runs on a **partner site**. [Learn more](https://www.zooniverse.org/about).',
    external_workflow_url: 'https://example.org/my-workflow'
  },
  displayName: 'External Workflow',
  id: '32842'
}

export const STANDARD_WORKFLOW = {
  completeness: 0.4,
  configuration: {},
  displayName: 'Standard Workflow',
  id: '32843'
}

const WORKFLOWS = [STANDARD_WORKFLOW, EXTERNAL_WORKFLOW]

function buildStore(userLoadingState) {
  const snapshot = {
    project: {
      display_name: 'Snapshot Serengeti',
      experimental_tools: ['external workflow'],
      links: { active_workflows: ['32842', '32843'] },
      loadingState: asyncStates.success,
      slug: 'zooniverse/snapshot-serengeti',
      urls: []
    },
    user: {
      loadingState: userLoadingState,
      personalization: {
        projectPreferences: {
          loadingState: asyncStates.success
        }
      }
    }
  }
  const store = initStore(true, snapshot)
  applySnapshot(store.user, snapshot.user)
  return store
}

const readyStore = buildStore(asyncStates.success)
// keeps ClassifierWrapper on its loading branch so the real classifier never mounts
export const loadingStore = buildStore(asyncStates.loading)

/*
  Exported so specs can replay a navigation sequence against one mounted ClassifyPage.
  Clearing workflowFromUrl stands in for the header's Classify link, which drops the
  workflow from the URL on a project with more than one active workflow.
*/
export function Page({ store, workflowFromUrl, ...props }) {
  return (
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <ClassifyPage
          appLoadingState={store.appLoadingState}
          workflowFromUrl={workflowFromUrl}
          workflowID={workflowFromUrl?.id}
          workflows={WORKFLOWS}
          {...props}
        />
      </Provider>
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Classify / Classify Page',
  component: ClassifyPage,
  excludeStories: [
    'EXTERNAL_WORKFLOW',
    'Page',
    'STANDARD_WORKFLOW',
    'loadingStore'
  ]
}

export function ExternalWorkflow() {
  return <Page store={readyStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />
}

/*
  A spec fixture: renders identically to ExternalWorkflow by design. The departure
  screen does not wait on appLoadingState, so this proves the classifier never mounts
  even transiently while the app is still loading.
*/
export function ExternalWorkflowBeforeAppLoads() {
  return <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />
}
ExternalWorkflowBeforeAppLoads.tags = ['!dev']

export function ExternalWorkflowWithoutFlag() {
  return <Page store={loadingStore} externalWorkflowEnabled={false} workflowFromUrl={EXTERNAL_WORKFLOW} />
}

export function ExternalWorkflowWithoutUrl() {
  const workflow = { ...EXTERNAL_WORKFLOW, configuration: { external_workflow_description: 'Hello', external_workflow_url: '' } }
  return <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={workflow} />
}
