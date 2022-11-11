import * as React from 'react'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { panoptes } from '@zooniverse/panoptes-js'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import nock from 'nock'
import { Factory } from 'rosie'
import sinon from 'sinon'

import RootStore from '@store'
import { ProjectFactory, SubjectFactory, WorkflowFactory } from '@test/factories'
import { defaultAuthClient, defaultClient } from '@test/mockStore/mockStore'
import branchingWorkflow, { workflowStrings } from '@test/mockStore/branchingWorkflow'
import Classifier from './Classifier'

describe('Classifier > workflow types', function () {
  // this turns off Mocha's time limit for slow tests
  this.timeout(5000)

  const cases = [
    {
      name: 'Branching workflow',
      workflowSnapshot: branchingWorkflow,
      workflowStrings: workflowStrings
    },
    {
      name: 'PH-TESS',
      workflowSnapshot: WorkflowFactory.build({
        tasks: {
          T0: {
            help: 'mark transits on the light curve.',
            instruction: '**Do you spot a transit?** If so, please mark it on the lightcurve to the left!    If you don\'t see any transits, continue by clicking Done or Done & Talk.',
            tools: [{
              type: 'graph2dRangeX',
              label: 'Transit?'
            }],
            type: 'dataVisAnnotation'
          }
        }
      }),
      workflowStrings: {
        'tasks.T0.help': 'mark transits on the light curve.',
        'tasks.T0.instruction': '**Do you spot a transit?** If so, please mark it on the lightcurve to the left!    If you don\'t see any transits, continue by clicking Done or Done & Talk.',
        'tasks.T0.tools.0.label': 'Transit?'
      }
    }
  ]

  cases.forEach(({ name, workflowSnapshot, workflowStrings }) => {
    describe(name, function () {
      testWorkflow(workflowSnapshot, workflowStrings)
    })
  })
})

function testWorkflow(workflowSnapshot, workflowStrings) {
  let inputs, subjectImage, tabPanel, taskAnswers, taskTab, tutorialTab, workflow

  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  before(async function () {
    sinon.replace(window, 'Image', class MockImage {
      constructor () {
        this.naturalHeight = 1000
        this.naturalWidth = 500
        setTimeout(() => this.onload(), 500)
      }
    })

    const roles = []
    const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })
    workflowSnapshot.strings = workflowStrings
    const projectSnapshot = ProjectFactory.build({
      links: {
        active_workflows: [workflowSnapshot.id],
        workflows: [workflowSnapshot.id]
      }
    })

    nock('https://panoptes-staging.zooniverse.org/api')
    .persist()
    .get('/field_guides')
    .reply(200, { field_guides: [] })
    .get('/project_preferences')
    .query(true)
    .reply(200, { project_preferences: [] })
    .get('/project_roles')
    .reply(200, { project_roles: [{ roles }]})
    .get('/subjects/queued')
    .query(true)
    .reply(200, { subjects: [subjectSnapshot, ...Factory.buildList('subject', 9)] })
    .post('/project_preferences')
    .query(true)
    .reply(200, { project_preferences: [] })

    const checkBearerToken = sinon.stub().callsFake(() => Promise.resolve('mockAuth'))
    const checkCurrent = sinon.stub().callsFake(() => Promise.resolve({ id: 123, login: 'mockUser' }))
    const authClient = { ...defaultAuthClient, checkBearerToken, checkCurrent }
    const client = { ...defaultClient, panoptes }
    const store = RootStore.create({
      projects: {
        active: projectSnapshot.id,
        resources: {
          [projectSnapshot.id]: projectSnapshot
        }
      }
    }, { authClient, client })
    render(
      <Classifier
        classifierStore={store}
        workflowSnapshot={workflowSnapshot}
      />,
      {
        wrapper: withStore(store)
      }
    )
    await when(() => store.subjectViewer.loadingState === asyncStates.success)
    workflow = store.workflows.active
    taskTab = screen.getByRole('tab', { name: 'TaskArea.task'})
    tutorialTab = screen.getByRole('tab', { name: 'TaskArea.tutorial'})
    subjectImage = screen.getByRole('img', { name: `Subject ${subjectSnapshot.id}` })
    tabPanel = screen.getByRole('tabpanel', { name: '1 Tab Contents'})
    const task = workflowSnapshot.tasks.T0
    inputs = task.answers || task.tools
    const getLabelledInput = input => within(tabPanel).getByRole('radio', { name: input.label })
    taskAnswers = inputs?.map(getLabelledInput)
  })

  after(function () {
    sinon.restore()
    nock.cleanAll()
  })

  it('should have a task tab', function () {
    expect(taskTab).to.be.ok()
  })

  it('should have a tutorial tab', function () {
    expect(tutorialTab).to.be.ok()
  })

  it('should show a subject image from the selected set', function () {
    expect(subjectImage.getAttribute('href')).to.equal('https://foo.bar/example.png')
  })

  describe('task answers', function () {
    it('should be displayed', function () {
      expect(taskAnswers).to.have.lengthOf(inputs.length)
    })

    it('should be linked to the task', function () {
      taskAnswers.forEach(radioButton => {
        expect(radioButton.name).to.equal('T0')
      })
    })

    it('should be enabled', function () {
      taskAnswers.forEach(radioButton => {
        expect(radioButton.disabled).to.be.false()
      })
    })
  })
}
