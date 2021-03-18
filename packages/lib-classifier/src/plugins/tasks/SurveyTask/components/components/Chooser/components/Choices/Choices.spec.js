import { shallow } from 'enzyme'
import React from 'react'
import { Grid } from 'grommet'
import sinon from 'sinon'
import sortIntoColumns from 'sort-into-columns'
import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'

import { default as Task } from '@plugins/tasks/SurveyTask'
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
    let wrapper, sortedChoices
    const onChooseSpy = sinon.spy()
    before(function () {
      wrapper = shallow(
        <Choices
          filteredChoiceIds={mockTask.choicesOrder}
          onChoose={onChooseSpy}
          task={task}
        />
      )
      const columnCount = wrapper.find(Grid).props().columns.count
      sortedChoices = sortIntoColumns(mockTask.choicesOrder, columnCount)
    })

    it('should key the the choice buttons with the choice ids from the task\'s choices order', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton, index) => {
        expect(choiceButton.key()).to.equal(sortedChoices[index])
      })
    })

    it('should pass the choice id as a prop', function () {
      const choiceButtons = wrapper.find(ChoiceButton)
      choiceButtons.forEach((choiceButton, index) => {
        expect(choiceButton.props().choiceId).to.equal(sortedChoices[index])
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

    it('should set the set the number of grid columns to 3', function () {
      expect(wrapper.find(Grid).props().columns.count).to.equal(3)
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

    it('should set the set the number of grid columns to 2', function () {
      expect(wrapper.find(Grid).props().columns.count).to.equal(2)
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

    it('should set the set the number of grid columns to 1', function () {
      expect(wrapper.find(Grid).props().columns.count).to.equal(1)
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
