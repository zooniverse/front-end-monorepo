import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { PlainButton } from '@zooniverse/react-components'
import { default as Task } from '@plugins/tasks/text'
import TextTagButtons from './TextTagButtons'

describe('TextTask > Components > TextTagButtons', function () {
  const task = Task.TaskModel.create({
    instruction: 'Type something here',
    taskKey: 'T0',
    text_tags: ['insertion', 'deletion'],
    type: 'text'
  })

  describe('when there are no tags', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <TextTagButtons
          taskKey={task.taskKey}
        />
      )
    })

    it('should render null', function () {
      expect(wrapper.html()).to.be.null()
    })
  })

  describe('when there are tags', function () {
    let wrapper
    const onClickSpy = sinon.spy()
    before(function () {
      wrapper = shallow(
        <TextTagButtons
          onClick={onClickSpy}
          taskKey={task.taskKey}
          tags={task.text_tags}
        />
      )
    })

    it('should render buttons for tagging text', function () {
      expect(wrapper.find(PlainButton)).to.have.lengthOf(2)
    })

    task.text_tags.forEach(function (tag) {
      it('should be labeled', function () {
        const button = wrapper.find(PlainButton).find({ value: tag })
        const id = `${task.taskKey}-${tag}`
        const label = `textModifiers-${task.taskKey} ${task.taskKey}-${tag}`
        expect(button.props().id).to.equal(id)
        expect(button.props()['aria-labelledby']).to.equal(label)
        expect(button.props().text).to.equal(tag)
        expect(button.props().value).to.equal(tag)
      })

      it(`should render a ${tag} button`, function () {
        const button = wrapper.find(PlainButton).find({ value: tag })
        expect(button).to.have.lengthOf(1)
      })

      it('should call onClick when the button is clicked', function () {
        const button = wrapper.find(PlainButton).find({ value: tag })
        button.simulate('click')
        expect(onClickSpy).to.have.been.calledOnce()
        onClickSpy.resetHistory()
      })

      it('should disable the button', function () {
        wrapper.setProps({ disabled: true })
        const button = wrapper.find(PlainButton).find({ value: tag })
        expect(button.props().disabled).to.be.true()
      })
    })
  })
})
