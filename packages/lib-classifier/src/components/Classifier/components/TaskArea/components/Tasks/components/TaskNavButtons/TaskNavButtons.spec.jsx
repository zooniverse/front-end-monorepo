import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import { WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import TaskNavButtons from './TaskNavButtons'
import Meta, {
  Default,
  Disabled,
  Next,
  BackOrDone
} from './TaskNavButtons.stories'

describe('TaskNavButtons', function () {
  it('should display Done + DoneAndTalk by default', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    expect(
      screen.getByRole('link', {
        name: 'Done & Talk in a new tab'
      })
    ).to.exist

    expect(
      screen.getByRole('button', {
        name: 'Done'
      })
    ).to.exist
  })

  it('should disable the buttons based on the disabled prop', function () {
    const DisabledStory = composeStory(Disabled, Meta)
    render(<DisabledStory />)

    expect(
      screen.getByRole('button', {
        name: 'Done & Talk in a new tab'
      }).disabled
    ).to.equal(true)

    expect(
      screen.getByRole('button', {
        name: 'Done'
      }).disabled
    ).to.equal(true)
  })

  describe('when the workflow has an unsupported task', function () {
    function renderWithUnsupportedTask(configuration = {}) {
      const workflow = WorkflowFactory.build({
        configuration,
        steps: [['S0', { stepKey: 'S0', taskKeys: ['T0', 'T1'] }]],
        tasks: {
          T0: { answers: [{ label: 'yes' }, { label: 'no' }], question: 'Yes or No?', type: 'single' },
          T1: { question: 'Nope', type: 'wakkawakka' }
        }
      })
      render(
        <Grommet theme={zooTheme}>
          <Provider classifierStore={mockStore({ workflow })}>
            <TaskNavButtons />
          </Provider>
        </Grommet>
      )
    }

    it('should disable Done and Done & Talk', function () {
      renderWithUnsupportedTask()
      expect(
        screen.getByRole('button', {
          name: 'Done & Talk in a new tab'
        }).disabled
      ).to.equal(true)
      expect(
        screen.getByRole('button', {
          name: 'Done'
        }).disabled
      ).to.equal(true)
    })

    it('should disable Done and Done & Talk in the subject group viewer', function () {
      renderWithUnsupportedTask({ subject_viewer: 'subjectGroup' })
      expect(
        screen.getByRole('button', {
          name: 'Done & Talk in a new tab'
        }).disabled
      ).to.equal(true)
      expect(
        screen.getByRole('button', {
          name: 'Done'
        }).disabled
      ).to.equal(true)
    })
  })

  it('should display a labeled NextButton when there is a next step', function () {
    const NextButtonStory = composeStory(Next, Meta)
    render(<NextButtonStory />)
    expect(
      screen.getByRole('button', { name: 'Next' })
    ).to.exist
  })

  it('should display a labeled BackButton when step history can go back', function () {
    const BackOrDoneStory = composeStory(BackOrDone, Meta)
    render(<BackOrDoneStory />)
    expect(
      screen.getByRole('button', { name: 'Back' })
    ).to.exist
  })
})
