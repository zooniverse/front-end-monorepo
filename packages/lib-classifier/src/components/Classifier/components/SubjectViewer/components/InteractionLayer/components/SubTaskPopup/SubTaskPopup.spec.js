import cuid from 'cuid'
import { mount, shallow } from 'enzyme'
import { Box, Button } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import SubTaskPopup, { ConfirmModal, StyledPrimaryButton } from './SubTaskPopup'
import SaveButton from './components/SaveButton'
import { CloseButton, MovableModal, PrimaryButton } from '@zooniverse/react-components'
import * as Tools from '@plugins/drawingTools/models/tools'
import { SingleChoiceTaskFactory } from '@test/factories'

describe('SubTaskPopup', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SubTaskPopup />)
    expect(wrapper).to.be.ok()
  })

  it('should have initial render without confirm modal', function () {
    const activeMark = { subTaskVisibility: true }
    const wrapper = shallow(<SubTaskPopup activeMark={activeMark} />)

    expect(wrapper.find(ConfirmModal)).to.have.lengthOf(0)
  })

  describe('with confirm modal', function () {
    let wrapper

    before(function () {
      const pointTool = Tools.PointTool.create({
        color: 'cyan',
        type: 'point',
        details: [
          SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            required: 'true' // default of factory, but defining for clarity/emphasis
          }),
          SingleChoiceTaskFactory.build({
            taskKey: 'T1',
            required: false
          })
        ]
      })
      const pointMark = pointTool.createMark({
        id: cuid(),
        toolType: pointTool.type
      })
      pointMark.setSubTaskVisibility(true)
      wrapper = shallow(
        <SubTaskPopup
          activeMark={pointMark}
        />
      )
    })

    it('should have initial render without required subtask emphasis', function () {
      expect(wrapper.find('.subtaskpopup-element-that-ignores-drag-actions')).to.have.lengthOf(2)
      const requiredSubtask = wrapper.find('.subtaskpopup-element-that-ignores-drag-actions').first()
      expect(requiredSubtask.prop('border')).to.be.false()
      expect(requiredSubtask.find('strong')).to.have.lengthOf(0)
    })

    it('should render confirm modal on save with incomplete required subtask', function () {
      wrapper.find(SaveButton).simulate('click')

      expect(wrapper.find(ConfirmModal)).to.have.lengthOf(1)
    })

    it('should emphasize required subtask after clicking "Keep working" from confirm modal', function () {
      wrapper.find(SaveButton).simulate('click')
      wrapper.find(ConfirmModal).dive().find(StyledPrimaryButton).simulate('click')

      expect(wrapper.find('.subtaskpopup-element-that-ignores-drag-actions')).to.have.lengthOf(2)
      const requiredSubtask = wrapper.find('.subtaskpopup-element-that-ignores-drag-actions').first()
      expect(requiredSubtask.prop('border').size).to.equal('small')
      expect(requiredSubtask.prop('border').color).to.equal('tomato')
      expect(requiredSubtask.find('strong').text()).to.equal('This task is required.')
    })
  })

  it('should call onCloseConfirm on confirm modal "Keep working"', function () {
    const onCloseConfirmSpy = sinon.spy()
    const wrapper = shallow(<ConfirmModal onClose={onCloseConfirmSpy} />)
    wrapper.find(Button).simulate('click')
    expect(onCloseConfirmSpy).to.have.been.calledOnce()
  })

  it('should call deleteMark on confirm modal "Close without saving"', function () {
    const deleteMarkSpy = sinon.spy()
    const wrapper = shallow(<ConfirmModal onDelete={deleteMarkSpy} />)
    wrapper.find(StyledPrimaryButton).simulate('click')
    expect(deleteMarkSpy).to.have.been.calledOnce()
  })

  describe('on deleteMark', function () {
    let wrapper
    let deleteMarkSpy
    let setSubTaskVisibilitySpy
    let onDeleteSpy

    before(function () {
      const pointTool = Tools.PointTool.create({
        color: 'cyan',
        type: 'point',
        details: [
          SingleChoiceTaskFactory.build({
            taskKey: 'T0',
            required: 'true' // default of factory, but defining for clarity/emphasis
          }),
          SingleChoiceTaskFactory.build({
            taskKey: 'T1',
            required: false
          })
        ]
      })
      deleteMarkSpy = sinon.spy(pointTool, 'deleteMark')

      const pointMark = pointTool.createMark({
        id: cuid(),
        toolType: pointTool.type
      })
      pointMark.setSubTaskVisibility(true)
      setSubTaskVisibilitySpy = sinon.spy(pointMark, 'setSubTaskVisibility')

      onDeleteSpy = sinon.spy()
      wrapper = shallow(
        <SubTaskPopup
          activeMark={pointMark}
          onDelete={onDeleteSpy}
        />
      )
      wrapper.find(SaveButton).simulate('click')
      wrapper.find(ConfirmModal).dive().find(StyledPrimaryButton).simulate('click')
    })

    it('should call setSubTaskVisibility', function () {
      expect(setSubTaskVisibilitySpy).to.have.been.calledOnce()
    })

    it('should call tool deleteMark', function () {
      expect(deleteMarkSpy).to.have.been.calledOnce()
    })

    it('should call onDelete', function () {
      expect(onDeleteSpy).to.have.been.calledOnce()
    })
  })

  describe('title bar', function () {
    let modal
    before(function () {
      const activeMark = { subTaskVisibility: true }
      modal = shallow(<SubTaskPopup activeMark={activeMark} />).find(MovableModal)
    })

    it('should have a transparent background', function () {
      expect(modal.prop('headingBackground')).to.equal('transparent')
    })

    it('should use the default text colour', function () {
      expect(modal.prop('titleColor')).to.equal('')
    })
  })

  Object.keys(Tools).forEach((toolKey) => {
    // We don't need to test the generic Tool model since the others are a composite with it.
    if (toolKey !== 'Tool') {
      const type = toolKey.split('Tool')[0]
      const camelCaseType = type.charAt(0).toLowerCase() + type.slice(1)
      const tool = Tools[toolKey].create({
        color: 'red',
        type: camelCaseType,
        details: [
          {
            instruction: 'Name your favourite fruit.',
            taskKey: 'T0.0',
            type: 'text'
          },
          {
            instruction: 'Name your favourite colour.',
            taskKey: 'T0.1',
            type: 'text'
          },
          {
            instruction: 'Name your favourite animal.',
            taskKey: 'T0.2',
            type: 'text'
          }
        ]
      })
      const mark = tool.createMark({
        id: cuid(),
        toolType: tool.type
      })

      describe(`with ${tool.type} drawing mark`, function () {
        let setSubTaskVisibilitySpy
        before(function () {
          setSubTaskVisibilitySpy = sinon.spy(mark, 'setSubTaskVisibility')
        })

        afterEach(function () {
          setSubTaskVisibilitySpy.resetHistory()
        })

        it('should render a container when given an active drawing mark and subtask visibility is true', function () {
          mark.setSubTaskVisibility(true)
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
            />
          )
          expect(wrapper.find(Box).first()).to.have.lengthOf(1)
        })

        it('should render nothing when subtask visibility isn\'t true', function () {
          mark.setSubTaskVisibility(false)
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
            />
          )
          expect(wrapper.html()).to.be.null()
        })

        it('should render the correct number of subtasks, according to the active drawing mark provided', function () {
          mark.setSubTaskVisibility(true)
          const wrapper = shallow(
            <SubTaskPopup
              activeMark={mark}
            />
          )
          expect(wrapper.find('.subtaskpopup-element-that-ignores-drag-actions')).to.have.lengthOf(3)
        })

        describe('on close', function () {
          it('should call setSubTaskVisibility on clicking the save button', function () {
            mark.setSubTaskVisibility(true)
            setSubTaskVisibilitySpy.resetHistory()
            const wrapper = shallow(
              <SubTaskPopup
                activeMark={mark}
              />
            )
            wrapper.find(SaveButton).simulate('click')
            expect(setSubTaskVisibilitySpy).to.have.been.calledOnce()
          })

          xit('should call setSubTaskVisibility on clicking the close button', function () {
            // had to switch to mount to do this integration test
            // Make this test not pending anymore once we can upgrade jsdom to >16.2.2
            // see: https://github.com/jsdom/jsdom/issues/2586
            // test passes, but throws jsdom error
            // TypeError: activeElement.detachEvent is not a function
            // which clutters the test running output
            // new release should be soon
            mark.setSubTaskVisibility(true)
            setSubTaskVisibilitySpy.resetHistory()
            const wrapper = mount(
              <SubTaskPopup
                activeMark={mark}
              />
            )
            wrapper.find(CloseButton).simulate('click')
            expect(setSubTaskVisibilitySpy).to.have.been.calledOnce()
          })
        })
      })
    }
  })
})
