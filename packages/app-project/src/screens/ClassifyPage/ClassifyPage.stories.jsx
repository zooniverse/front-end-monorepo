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

function buildStore(userLoadingState) {
  const snapshot = {
    project: {
      display_name: 'Snapshot Serengeti',
      experimental_tools: ['external workflow'],
      links: { active_workflows: ['32842'] },
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
const loadingStore = buildStore(asyncStates.loading)

export const EXTERNAL_WORKFLOW = {
  completeness: 0,
  configuration: {
    external_workflow_description: 'This workflow runs on a **partner site**. [Learn more](https://www.zooniverse.org/about).',
    external_workflow_url: 'https://example.org/my-workflow'
  },
  displayName: 'External Workflow',
  id: '32842'
}

function Page({ store, ...props }) {
  return (
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <ClassifyPage
          appLoadingState={store.appLoadingState}
          workflowID={props.workflowFromUrl.id}
          workflows={[props.workflowFromUrl]}
          {...props}
        />
      </Provider>
    </RouterContext.Provider>
  )
}

export default {
  title: 'Project App / Screens / Classify / Classify Page',
  component: ClassifyPage
}

export function ExternalWorkflow() {
  return <Page store={readyStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />
}

export function ExternalWorkflowWhileLoading() {
  return <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={EXTERNAL_WORKFLOW} />
}

export function ExternalWorkflowWithoutFlag() {
  return <Page store={loadingStore} externalWorkflowEnabled={false} workflowFromUrl={EXTERNAL_WORKFLOW} />
}

export function ExternalWorkflowWithoutUrl() {
  const workflow = { ...EXTERNAL_WORKFLOW, configuration: { external_workflow_description: 'Hello', external_workflow_url: '' } }
  return <Page store={loadingStore} externalWorkflowEnabled workflowFromUrl={workflow} />
}
