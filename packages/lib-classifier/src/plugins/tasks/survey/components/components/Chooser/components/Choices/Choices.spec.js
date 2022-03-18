import { mount, shallow } from 'enzyme'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'

import { task as mockTask } from '@plugins/tasks/survey/mock-data'
import { default as Task } from '@plugins/tasks/survey'
import Choices from './Choices'
import ChoiceButton from './components/ChoiceButton'

describe('Component > Choices', function () {
  let wrapper
  let task = Task.TaskModel.create({
    choices: mockTask.choices,
    images: mockTask.images,
    taskKey: 'T0',
    type: 'survey'
  })

  before(function () {
    wrapper = shallow(
      <Choices
        filteredChoiceIds={mockTask.choicesOrder}
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('ChoiceButton', function () {
    let wrapper
    const handleDeleteSpy = sinon.spy()
    const onChooseSpy = sinon.spy()
    before(function () {
      wrapper = mount(
        <Choices
          filteredChoiceIds={mockTask.choicesOrder}
          handleDelete={handleDeleteSpy}
          onChoose={onChooseSpy}
          task={task}
        />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    it('should key the the choice buttons with the choice ids from the task\'s choices order', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton, index) => {
        expect(choiceButton.key()).to.equal(mockTask.choicesOrder[index])
      })
    })

    it('should pass the choice id as a prop', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton, index) => {
        expect(choiceButton.props().choiceId).to.equal(mockTask.choicesOrder[index])
      })
    })

    it('should pass the choice label as a prop', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        const { choiceId } = choiceButton.props()
        expect(choiceButton.props().choiceLabel).to.equal(mockTask.choices[choiceId].label)
      })
    })

    it('should pass the choice\'s first image src as a prop', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        const { choiceId } = choiceButton.props()
        const imageSource = mockTask.images[mockTask.choices[choiceId].images[0]] || ''
        expect(choiceButton.props().src).to.equal(imageSource)
      })
    })

    it('should pass the onChoose function as a prop', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().onChoose).to.equal(onChooseSpy)
      })
    })

    it('should pass the selected choice prop', function () {
      const choiceId = 'FR'
      let choiceButtons = wrapper.find(ChoiceButton)

      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().selected).to.be.false()
      })
      wrapper.setProps({ selectedChoiceIds: [choiceId] })
      choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        if (choiceButton.key() === choiceId) {
          expect(choiceButton.props().selected).to.be.true()
        } else {
          expect(choiceButton.props().selected).to.be.false()
        }
      })
    })

    it('should call handleDelete with choice ID on ChoiceButton backspace keyDown', function () {
      const choiceId = 'FR'
      const backspaceEventMock = { key: 'Backspace', preventDefault: sinon.spy(), stopPropagation: sinon.spy() }

      const fireChoiceButton = wrapper.find(ChoiceButton).filterWhere(button => button.key() === choiceId)
      fireChoiceButton.simulate('keydown', backspaceEventMock)

      expect(handleDeleteSpy).to.have.been.calledOnceWith(choiceId)
      handleDeleteSpy.resetHistory()
    })

    it('should call handleDelete with choice ID on ChoiceButton delete keyDown', function () {
      const choiceId = 'FR'
      const backspaceEventMock = { key: 'Delete', preventDefault: sinon.spy(), stopPropagation: sinon.spy() }

      const fireChoiceButton = wrapper.find(ChoiceButton).filterWhere(button => button.key() === choiceId)
      fireChoiceButton.simulate('keydown', backspaceEventMock)

      expect(handleDeleteSpy).to.have.been.calledOnceWith(choiceId)
      handleDeleteSpy.resetHistory()
    })
  })

  describe('with autoFocus', function () {
    let wrapper

    before(function () {
      wrapper = mount(
        <Choices
          autoFocus
          filteredChoiceIds={mockTask.choicesOrder}
          task={task}
        />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    it('should give focus to the first choice', function () {
      const firstChoiceButton = wrapper.find(ChoiceButton).first()
      expect(firstChoiceButton.props().hasFocus).to.be.true()
      expect(firstChoiceButton.props().tabIndex).to.equal(0)
      expect(firstChoiceButton.props().choiceId).to.equal('RDVRK')
    })

    it('should not give focus to other choices', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton, index) => {
        if (index === 0) return true
        expect(choiceButton.props().hasFocus).to.be.false()
        expect(choiceButton.props().tabIndex).to.equal(-1)
      })
    })

    describe('with updated filteredChoiceIds', function () {
      const furtherFilteredChoiceIds = ['BBN', 'FR', 'NTHNGHR']

      before(function () {
        wrapper.setProps({ filteredChoiceIds: furtherFilteredChoiceIds })
      })

      it('should give focus to the updated first choice', function () {
        const firstChoiceButton = wrapper.find(ChoiceButton).first()
        expect(firstChoiceButton.props().hasFocus).to.be.true()
        expect(firstChoiceButton.props().tabIndex).to.equal(0)
        expect(firstChoiceButton.props().choiceId).to.equal('BBN')
      })

      it('should not give focus to other updated choices', function () {
        const choiceButtons = wrapper.find(ChoiceButton)
        choiceButtons.forEach((choiceButton, index) => {
          if (index === 0) return true
          expect(choiceButton.props().hasFocus).to.be.false()
          expect(choiceButton.props().tabIndex).to.equal(-1)
        })
      })
    })

    describe('with selectedChoiceIds', function () {
      const selectedIds = ['BBN', 'FR']

      before(function () {
        wrapper = mount(
          <Choices
            autoFocus
            filteredChoiceIds={mockTask.choicesOrder}
            selectedChoiceIds={selectedIds}
            task={task}
          />, {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          }
        )
      })

      it('should give focus to the last selected choice', function () {
        const choiceButtons = wrapper.find(ChoiceButton)

        choiceButtons.forEach((choiceButton) => {
          if (choiceButton.props().choiceId === 'FR') {
            expect(choiceButton.props().hasFocus).to.be.true()
            expect(choiceButton.props().tabIndex).to.equal(0)
          } else {
            expect(choiceButton.props().hasFocus).to.be.false()
            expect(choiceButton.props().tabIndex).to.equal(-1)
          }
        })
      })
    })
  })

  describe('when the column count is 3', function () {
    let task, wrapper
    before(function () {
      task = Task.TaskModel.create({
        choices: mockTask.choices,
        images: mockTask.images,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoiceIds={mockTask.choicesOrder}
          task={task}
        />
      )
    })

    it('should have small thumbnails', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().thumbnailSize).to.equal('small')
      })
    })
  })

  describe('when the column count is 2', function () {
    let task, wrapper
    before(function () {
      let choices = {}
      let choicesOrder = []
      Object.keys(mockTask.choices).forEach((choiceKey, index) => {
        if (index <=5) {
          choices[choiceKey] = mockTask.choices[index] 
          choicesOrder.push(mockTask.choicesOrder[index])
        }
      })

      task = Task.TaskModel.create({
        choices,
        choicesOrder,
        images: mockTask.images,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoiceIds={choicesOrder}
          task={task}
        />
      )
    })

    it('should have medium thumbnails', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().thumbnailSize).to.equal('medium')
      })
    })
  })

  describe('when the column count is 1', function () {
    let task, wrapper
    before(function () {
      let choices = {}
      let choicesOrder = []
      Object.keys(mockTask.choices).forEach((choiceKey, index) => {
        if (index <= 4) {
          choices[choiceKey] = mockTask.choices[index]
          choicesOrder.push(mockTask.choicesOrder[index])
        }
      })

      task = Task.TaskModel.create({
        choices,
        choicesOrder,
        images: mockTask.images,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoiceIds={choicesOrder}
          task={task}
        />
      )
    })

    it('should have large thumbnails', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().thumbnailSize).to.equal('large')
      })
    })
  })

  describe('when the task is set to always show thumbnails', function () {
    let task, wrapper
    before(function () {
      task = Task.TaskModel.create({
        alwaysShowThumbnails: true,
        choices: mockTask.choices,
        choicesOrder: mockTask.choicesOrder,
        images: mockTask.images,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoiceIds={mockTask.choicesOrder}
          task={task}
        />
      )
    })

    it('should have small thumbnails', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().thumbnailSize).to.equal('small')
      })
    })
  })

  describe('when there are more than 30 choices', function () {
    let task, wrapper
    before(function () {
      const newAnimals = ['cat', 'dog', 'fish', 'snake', 'monkey', 'spider']
      let choices = Object.assign({}, mockTask.choices)
      let choicesOrder = [...mockTask.choicesOrder]
      newAnimals.forEach((animal) => {
        choices[animal] = { label: animal }
        choicesOrder.push(animal)
      })
      task = Task.TaskModel.create({
        choices,
        choicesOrder,
        images: mockTask.images,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoiceIds={choicesOrder}
          task={task}
        />
      )
    })

    it('should not show thumbnails', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton) => {
        expect(choiceButton.props().thumbnailSize).to.equal('none')
      })
    })
  })
})
