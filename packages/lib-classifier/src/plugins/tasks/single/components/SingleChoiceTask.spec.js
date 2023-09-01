import { render, screen, fireEvent } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { SingleChoiceQuestion } from './SingleChoiceTask.stories.js'
import preview from '@storybook_config/preview.js'
import { SingleChoiceTaskDataMock } from './SingleChoiceTask.mock'

describe('SingleChoiceTask', function () {
  const taskData = { isThereTaskHelp: false, required: false }
  const taskMock = SingleChoiceTaskDataMock(taskData)

  beforeEach(function () {
    const SingleChoiceQuestionStory = composeStory(SingleChoiceQuestion, Meta, preview)
    render(<SingleChoiceQuestionStory {...taskData} />)
  })

  it('should render the question', function () {
    expect(screen.getByText(taskMock.init.strings.question)).to.exist()
  })

  it('should render the correct number of answer choices', function () {
    taskMock.init.answers.forEach(answer => {
      expect(screen.getByText(answer.label)).to.exist()
    })
  })

  it('should be able to select an answer', async function () {
    let el = screen.getByTestId('test-task-input-0');
    
    fireEvent.click(el)
    
    await expect(el.getAttribute('autofocus')).to.exist()
    expect(screen.getByTestId('test-task-input-1').getAttribute('autofocus')).to.be.null()
  })
})
