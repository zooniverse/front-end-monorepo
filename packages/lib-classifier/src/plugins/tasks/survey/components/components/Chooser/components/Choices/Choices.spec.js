import { expect } from 'chai'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import { default as Task } from '@plugins/tasks/survey'
import { Choices } from './Choices'

describe('Component > Choices', function () {
  let task = Task.TaskModel.create({
    choices: mockTask.choices,
    choicesOrder: mockTask.choicesOrder,
    images: mockTask.images,
    strings: mockTask.strings,
    taskKey: 'T0',
    type: 'survey'
  })

  it('should show choice buttons in the order defined by the task choicesOrder ', function () {
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          task={task}
        />
      </Grommet>
    )
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons.length).to.equal(6)
    expect(choiceButtons[0]).to.have.text('Aardvark')
    expect(choiceButtons[1]).to.have.text('Elephant')
    expect(choiceButtons[2]).to.have.text('Kudu')
    expect(choiceButtons[3]).to.have.text('Human')
    expect(choiceButtons[4]).to.have.text('Fire')
    expect(choiceButtons[5]).to.have.text('Nothing here')
  })

  it('should call handleDelete with choice ID on choice button backspace keyDown', async function () {
    const handleDeleteSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          handleDelete={handleDeleteSpy}
          previousChoiceId='RDVRK'
          task={task}
        />
      </Grommet>
    )
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons[0]).to.equal(document.activeElement)
    await user.keyboard('{backspace}')
    expect(handleDeleteSpy).to.have.been.calledOnceWith('RDVRK')
  })

  it('should call handleDelete with choice ID on choice button delete keyDown', async function () {
    const handleDeleteSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          handleDelete={handleDeleteSpy}
          previousChoiceId='RDVRK'
          task={task}
        />
      </Grommet>
    )
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons[0]).to.equal(document.activeElement)
    await user.keyboard('{delete}')
    expect(handleDeleteSpy).to.have.been.calledOnceWith('RDVRK')
  })

  it('should focus the next ChoiceButton on arrowDown keyDown', async function () {
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          task={task}
        />
      </Grommet>
    )
    await user.keyboard('{tab}')
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons[0]).to.equal(document.activeElement)
    await user.keyboard('{arrowDown}')
    expect(choiceButtons[1]).to.equal(document.activeElement)
  })

  it('should focus the previous ChoiceButton on arrowUp keyDown', async function () {
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          task={task}
        />
      </Grommet>
    )
    await user.keyboard('{tab}')
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons[0]).to.equal(document.activeElement)
    await user.keyboard('{arrowUp}')
    expect(choiceButtons[5]).to.equal(document.activeElement)
  })

  it('should call onChoose with choice ID on choice button click', async function () {
    const onChooseSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          onChoose={onChooseSpy}
          task={task}
        />
      </Grommet>
    )
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    await user.click(choiceButtons[0])
    expect(onChooseSpy).to.have.been.calledOnceWith('RDVRK')
  })

  it('should call onChoose with choice ID on choice button enter keyDown', async function () {
    const onChooseSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          onChoose={onChooseSpy}
          task={task}
        />
      </Grommet>
    )
    await user.keyboard('{tab}')
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons[0]).to.equal(document.activeElement)
    await user.keyboard('{enter}')
    expect(onChooseSpy).to.have.been.calledOnceWith('RDVRK')
  })

  it('should call onChoose with choice ID on choice button space keyDown', async function () {
    const onChooseSpy = sinon.spy()
    const user = userEvent.setup({ delay: null })
    render(
      <Grommet theme={zooTheme}>
        <Choices
          filteredChoiceIds={task.choicesOrder}
          onChoose={onChooseSpy}
          task={task}
        />
      </Grommet>
    )
    await user.keyboard('{tab}')
    const choiceButtons = screen.getAllByRole('menuitemcheckbox')
    expect(choiceButtons[0]).to.equal(document.activeElement)
    await user.keyboard(' ')
    expect(onChooseSpy).to.have.been.calledOnceWith('RDVRK')
  })

  describe('with previousChoiceId and FilterStatus closed', function () {
    it('should focus the previousChoiceId', async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <Grommet theme={zooTheme}>
          <Choices
            filteredChoiceIds={task.choicesOrder}
            filterDropOpen={false}
            previousChoiceId='HMN'
            task={task}
          />
        </Grommet>
      )
      const choiceButtons = screen.getAllByRole('menuitemcheckbox')
      // choiceButtons[3] is Human with ID HMN
      expect(choiceButtons[3]).to.equal(document.activeElement)
    })
  })

  describe('with previousChoiceId and FilterStatus open', function () {
    it('should not focus the previousChoiceId', async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <Grommet theme={zooTheme}>
          <Choices
            filteredChoiceIds={task.choicesOrder}
            filterDropOpen={true}
            previousChoiceId='HMN'
            task={task}
          />
        </Grommet>
      )
      const choiceButtons = screen.getAllByRole('menuitemcheckbox')
      // choiceButtons[3] is Human with ID HMN
      expect(choiceButtons[3]).to.not.equal(document.activeElement)
    })
  })
})
